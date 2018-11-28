import { auth } from '../auth/auth';
import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import { JsonPropertyError } from './validators/FieldError';
import { PasswordUpdateDto } from '../../client/query/user/PasswordUpdateDto';
import * as express from 'express';
import { LoginInputValidator } from './validators/LoginInputValidator';
import { LocalAuthentication } from '../auth/LocalAuthentication';
import { LocalUserRegistration } from '../auth/LocalUserRegistration';
import { FacebookUserRegistration } from '../auth/FacebookUserRegistration';
import passport = require('passport');

const send400 = (message: string, res: express.Response) => res.status(400).send(message);

export class UserController {
    private userDao: UserDao;
    private localAuthentication: LocalAuthentication;
    private localUserRegistration: LocalUserRegistration;
    private facebookUserRegistration: FacebookUserRegistration;

    constructor(
        userDao: UserDao,
        localAuthentication: LocalAuthentication,
        facebookUserRegistration: FacebookUserRegistration,
        localUserRegistration: LocalUserRegistration
    ) {
        this.userDao = userDao;
        this.localAuthentication = localAuthentication;
        this.localUserRegistration = localUserRegistration;
        this.facebookUserRegistration = facebookUserRegistration;
    }

    public register(router: express.Router) {
        this.registerSignin(router);
        this.registerSignup(router);
        this.registerGetUser(router);
        this.registerUpdateUser(router);
        this.registerUpdatePassword(router);
        this.registerSignInFacebook(router);
    }

    private registerSignInFacebook(router: express.Router) {
        router.post('/signin/facebook', auth.optional, async (req, res) => {
            try {
                const userModel = await this.facebookUserRegistration.register(req.body.accessToke);

                res.set('Authorization', userModel.jwtToken);
                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });
    }

    private registerUpdatePassword(router: express.Router) {
        router.put('/users/password', auth.required, async (req, res, next) => {

            try {
                const userModel = await this.userDao.updatePassword(<PasswordUpdateDto> req.body);

                if (!userModel) {
                    return send400('User not found', res);
                }

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });
    }

    private registerUpdateUser(router: express.Router) {
        router.put('/users', auth.required, async (req, res, next) => {
            let userModel = new UserModel();
            userModel.email = req.body.user.email;
            userModel.id = req.body.user.id;

            try {
                userModel = await this.userDao.update(userModel);

                if (!userModel) {
                    return send400('User not found', res);
                }

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });
    }

    private registerGetUser(router: express.Router) {
        router.get('/user', auth.required, async (req, res, next) => {
            const { payload: { id } } = req as any;

            try {
                const userModel = await this.userDao.findById(id);
                if (!userModel) {
                    return send400('User not found', res);
                }

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });
    }

    private registerSignin(router: express.Router) {
        router.post('/login', auth.optional, async (req, res: express.Response, next) => {
            const { body: { user } } = req;

            try {
                const loginInputValidator = new LoginInputValidator();
                loginInputValidator.validate(user);

                const userModel = await this.localAuthentication.authenticate(req, res);

                res.set('Authorization', userModel.generateJWT());

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });
    }

    private registerSignup(router: express.Router) {
        router.post('/signup', auth.optional, async (req, res, next) => {
            const { body: { user: userJson } } = req;

            try {
                const loginInputValidator = new LoginInputValidator();
                loginInputValidator.validate(userJson);

                const userModel = await this.localUserRegistration.register(userJson.email, userJson.password);

                res.set('Authorization', userModel.jwtToken);

                res.json({ user: userModel.toJSON() });
            } catch (e) {
                let errors: any;

                if (e instanceof JsonPropertyError) {
                    errors = [{
                        property: e.property,
                        message: e.message
                    }];
                } else {
                    errors = e.message;
                }

                return res.status(400).json({
                    errors: errors,
                });
            }
        });
    }
}

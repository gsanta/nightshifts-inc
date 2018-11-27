import { auth } from '../auth/auth';
const passport = require('passport');
import * as request from 'request';
import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import { UserAuthenticator } from '../auth/UserAuthenticator';
import { JsonPropertyError } from './validators/FieldError';
import { PasswordUpdateDto } from '../../client/query/user/PasswordUpdateDto';
import * as express from 'express';
import { LoginInputValidator } from './validators/LoginInputValidator';
import { LocalAuthentication } from '../auth/LocalAuthentication';

const send400 = (message: string, res: express.Response) => res.status(400).send(message);

export class UserController {
    private localAuthentication: LocalAuthentication;

    constructor(localAuthentication: LocalAuthentication) {
        this.localAuthentication = localAuthentication;
    }

    public register(router: express.Router) {
        this.registerSignin(router);

        router.get('/user', auth.required, async (req, res, next) => {
            const { payload: { id } } = req;
            const userDao = new UserDao();

            try {
                const userModel = await userDao.findById(id);
                if (!userModel) {
                    return send400('User not found', res);
                }

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });

        router.put('/users', auth.required, async (req, res, next) => {
            const userDao = new UserDao();

            let userModel = new UserModel();
            userModel.email = req.body.user.email;
            userModel.id = req.body.user.id;

            try {
                userModel = await userDao.update(userModel);

                if (!userModel) {
                    return send400('User not found', res);
                }

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });

        router.put('/users/password', auth.required, async (req, res, next) => {
            const userDao = new UserDao();

            try {
                const userModel = await userDao.updatePassword(<PasswordUpdateDto> req.body);

                if (!userModel) {
                    return send400('User not found', res);
                }

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });

        router.post('/signin/facebook', auth.optional, (req, res) => {
            request(`https://graph.facebook.com/me?fields=email&access_token=${req.body.accessToken}`, (err, response, body) => {
                const profileData = JSON.parse(body);

                const userAuthenticator = new UserAuthenticator(new UserDao());
                userAuthenticator
                    .signupFacebook(profileData.email, req.body.accessToken)
                    .then((user: UserModel) => {
                        res.set('Authorization', user.jwtToken);
                        return res.json({ user: user.toJSON() });
                    });
            });
        });
    }

    private registerSignin(router: express.Router) {
        router.post('/login', auth.optional, async (req, res: express.Response, next) => {
            const { body: { user } } = req;

            try {
                const loginInputValidator = new LoginInputValidator();
                loginInputValidator.validate(user);

                const userModel = await this.localAuthentication.authenticate();

                return res.json({ user: userModel.toJSON() });
            } catch (e) {
                return send400(e.message, res);
            }
        });
    }

    private registerSignup(router: express.Router) {
        router.post('/signup', auth.optional, (req, res, next) => {
            const { body: { user: userJson } } = req;

            try {
                const loginInputValidator = new LoginInputValidator();
                loginInputValidator.validate(userJson);
            }


            const userAuthenticator = new UserAuthenticator(new UserDao());
            userAuthenticator.signup(userJson.email, userJson.password)
                .then(user => {

                    res.set('Authorization', user.jwtToken);

                    res.json({ user: user.toJSON() });
                })
                .catch(e => {
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
                });
        });
    }
}

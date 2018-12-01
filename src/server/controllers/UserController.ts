import { auth, JwtTokenExtracter } from '../security/JwtTokenExtracter';
import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import { PasswordUpdateDto } from '../../client/query/user/PasswordUpdateDto';
import * as express from 'express';
import { LoginInputValidator } from './validators/LoginInputValidator';
import { LocalAuthentication } from '../security/LocalAuthentication';
import { LocalUserRegistration } from '../security/LocalUserRegistration';
import { FacebookUserRegistration } from '../security/FacebookUserRegistration';
import { FieldError } from './validators/FieldError';

const send400 = (message: string, res: express.Response) => res.status(400).json(new FieldError(message).toJson());

const send400Error = (error: {toJson(): void}, res: express.Response) => res.status(400).json(error.toJson());

export class UserController {
    private userDao: UserDao;
    private localAuthentication: LocalAuthentication;
    private localUserRegistration: LocalUserRegistration;
    private facebookUserRegistration: FacebookUserRegistration;
    private jwtTokenExtracter: JwtTokenExtracter;

    constructor(
        userDao: UserDao,
        localAuthentication: LocalAuthentication,
        facebookUserRegistration: FacebookUserRegistration,
        localUserRegistration: LocalUserRegistration,
        jwtTokenExtracter: JwtTokenExtracter
    ) {
        this.userDao = userDao;
        this.localAuthentication = localAuthentication;
        this.localUserRegistration = localUserRegistration;
        this.facebookUserRegistration = facebookUserRegistration;
        this.jwtTokenExtracter = jwtTokenExtracter;
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
        router.post('/signin/facebook', this.jwtTokenExtracter.withOptionalToken(), async (req, res) => {
            this.addErrorHandling(
                async () => {
                    const userModel = await this.facebookUserRegistration.register(req.body.accessToken);

                    res.set('Authorization', userModel.jwtToken);
                    res.json({ user: userModel.toJSON() });
                },
                res
            );
        });
    }

    private registerUpdatePassword(router: express.Router) {
        router.put('/users/password', this.jwtTokenExtracter.withRequiredToken(), async (req, res, next) => {

            this.addErrorHandling(
                async () => {
                    const userModel = await this.userDao.updatePassword(<PasswordUpdateDto> req.body);
                    if (!userModel) {
                        throw new Error('User not found');
                    }

                    res.json({ user: userModel.toJSON() });
                },
                res
            );
        });
    }

    private registerUpdateUser(router: express.Router) {
        router.put('/users', this.jwtTokenExtracter.withRequiredToken(), async (req, res, next) => {
            let userModel = new UserModel();
            userModel.email = req.body.user.email;
            userModel.id = req.body.user.id;

            this.addErrorHandling(
                async () => {
                    userModel = await this.userDao.update(userModel);

                    if (!userModel) {
                        throw new Error('User not found');
                    }

                    res.json({ user: userModel.toJSON() });
                },
                res
            );
        });
    }

    private registerGetUser(router: express.Router) {
        router.get('/user', this.jwtTokenExtracter.withRequiredToken(), async (req, res, next) => {
            const { payload: { id } } = req as any;

            this.addErrorHandling(
                async () => {
                    const userModel = await this.userDao.findById(id);
                    if (!userModel) {
                        throw new Error('User not found');
                    }

                    res.json({ user: userModel.toJSON() });
                },
                res
            );
        });
    }

    private registerSignin(router: express.Router) {
        router.post('/login', this.jwtTokenExtracter.withOptionalToken(), async (req, res: express.Response, next) => {
            const { body: { user } } = req;

            this.addErrorHandling(
                async () => {
                    const loginInputValidator = new LoginInputValidator();
                    loginInputValidator.validate(user);

                    const userModel = await this.localAuthentication.authenticate(req, res);

                    res.set('Authorization', userModel.generateJWT());

                    res.json({ user: userModel.toJSON() });
                },
                res
            );
        });
    }

    private registerSignup(router: express.Router) {
        router.post('/signup', this.jwtTokenExtracter.withOptionalToken(), async (req, res, next) => {
            const { body: { user: userJson } } = req;

            this.addErrorHandling(
                async () => {
                    const loginInputValidator = new LoginInputValidator();
                    loginInputValidator.validate(userJson);

                    const userModel = await this.localUserRegistration.register(userJson.email, userJson.password);

                    res.set('Authorization', userModel.jwtToken);

                    res.json({ user: userModel.toJSON() });
                    },
                res
            );
        });
    }

    private async addErrorHandling(action: () => Promise<void>, res: express.Response) {
        try {
            await action();
        } catch (e) {
            if (e instanceof FieldError) {
                return send400Error(e, res);
            } else {
                return send400(e.message, res);
            }
        }
    }
}

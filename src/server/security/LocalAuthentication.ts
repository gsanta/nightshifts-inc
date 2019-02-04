import * as passport from 'passport';
import { UserModel } from '../model/user/UserModel';
import { UserDao } from '../model/user/UserDao';
import {Strategy} from 'passport-local';
import * as express from 'express';
import { FieldError } from '../model/FieldError';

export class LocalAuthentication {
    private pass: passport.PassportStatic;
    private userDao: UserDao;

    constructor(pass: passport.PassportStatic, userDao: UserDao) {
        this.pass = pass;
        this.userDao = userDao;
        this.pass.use(this.getLocalStrategy());
    }

    public authenticate(req: express.Request, res: express.Response): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            this.pass.authenticate(
                'local',
                { session: false },
                (err, userModel: UserModel, info) => {
                    if (err) {
                        reject(err);
                    } else {
                        userModel.accessToken = userModel.generateJWT();
                        resolve(userModel);
                    }
                }
            )(req, res);
        });
    }

    private getLocalStrategy() {
        return new Strategy(
            {
                usernameField: 'user[email]',
                passwordField: 'user[password]',
            },
            (email, password, done) => {
                this.runAuthentication(email, password)
                .then(user => {
                    done(null, user);
                })
                .catch(done);
            }
        );
    }

    private runAuthentication(email: string, password: string) {
        return this.userDao.findByEmail(email)
            .then((user) => {
                if (!user || !user.validatePassword(password)) {
                    throw new FieldError('Email or password is invalid.', ['email', 'password']);
                }

                if (user.jwtToken === null) {
                    user.jwtToken = user.generateJWT();
                }

                return user;
            });
    }
}

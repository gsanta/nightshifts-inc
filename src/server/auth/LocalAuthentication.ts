import * as passport from 'passport';
import { UserModel } from '../model/UserModel';
import { UserDao } from '../model/UserDao';
import { GenericError } from '../routes/validators/GenericError';
const LocalStrategy = require('passport-local');

export class LocalAuthentication {
    private pass: passport.PassportStatic;
    private userDao: UserDao;

    constructor(pass: passport.PassportStatic, userDao: UserDao) {
        this.pass = pass;
        this.userDao = userDao;
        this.pass.use(this.getLocalStrategy());
    }

    public authenticate(): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            this.pass.authenticate(
                'local',
                { session: false },
                (err, userModel: UserModel, info) => {
                    if (err) {
                        reject(err);
                    }

                    userModel.accessToken = userModel.generateJWT();

                    resolve(userModel);
                }
            );
        });
    }

    private getLocalStrategy() {
        return new LocalStrategy(
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
                    throw new GenericError('Email or password is invalid.');
                }

                if (user.jwtToken === null) {
                    user.jwtToken = user.generateJWT();
                }

                return user;
            });
    }
}

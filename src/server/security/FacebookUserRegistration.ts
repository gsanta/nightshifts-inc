import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import * as request from 'request';

export class FacebookUserRegistration {
    private userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    public register(accessToken: string): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            request(`https://graph.facebook.com/me?fields=email&access_token=${accessToken}`, (err, response, body) => {
                const profileData = JSON.parse(body);

                this.saveOrGetUserIfAlreadyRegistered(accessToken, profileData.email)
                    .then(user => {
                        resolve(user);
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        });

    }

    private saveOrGetUserIfAlreadyRegistered(accessToken: string, email: string): Promise<UserModel> {
        return this.userDao.findByEmail(email)
            .then((result) => {
                if (result === null) {
                    const newUser = new UserModel();
                    newUser.email = email;
                    newUser.authStrategy = 'facebook';
                    newUser.accessToken = accessToken;

                    return this.userDao.save(newUser);
                } else {
                    return result;
                }
            })
            .then(user => {
                user.jwtToken = user.generateJWT();
                return user;
            });
    }
}

import { UserModel } from '../model/UserModel';
import { UserDao } from '../model/UserDao';
import { JsonPropertyError } from '../model/FieldError';

export class UserAuthenticator {
    private userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    public signup(email: string, password: string): Promise<UserModel> {
        const userModel = UserModel.fromJSON({
            email,
            password
        });

        userModel.jwtToken = userModel.generateJWT();
        const userDao = new UserDao();

        return userDao.findByEmail(email)
            .then(u => {
                if (u !== null) {
                    throw new JsonPropertyError('This email address is already used.', 'email');
                }

                return userDao.save(userModel);
            });
    }

    public signupFacebook(email: string, accessToken: string) {
        return this.userDao.findByEmail(email)
            .then((result) => {
                console.log(result)
                if (result === null) {
                    const newUser = new UserModel();
                    newUser.email = email;
                    newUser.authStrategy = 'facebook';
                    newUser.accessToken = accessToken;
                    newUser.jwtToken = newUser.generateJWT();
                    return this.userDao.save(newUser);
                } else {
                    result.jwtToken = result.generateJWT();
                    return result;
                }
            });
    }

    public login(email: string, password: string): Promise<UserModel> {
        const userDao = new UserDao();
        return userDao.findByEmail(email)
            .then((user) => {
                if (!user || !user.validatePassword(password)) {
                    throw new Error('Email or password is invalid.');
                }

                if (user.jwtToken === null) {
                    user.jwtToken = user.generateJWT();
                }

                return userDao.save(user);
            })
    }
}

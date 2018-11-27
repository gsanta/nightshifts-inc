import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';

export class LocalUserRegistration {
    private userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    private register(email: string, password: string): Promise<UserModel> {
        const userModel = UserModel.fromJSON({
            email,
            password
        });

        // userModel.jwtToken = userModel.generateJWT();
        const userDao = new UserDao();

        return userDao.findByEmail(email)
            .then(u => {
                if (u !== null) {
                    throw new JsonPropertyError('This email address is already used.', 'email');
                }

                return userDao.save(userModel);
            })
            .then(user => {
                user.jwtToken = user.generateJWT();

                return user;
            });
    }
}
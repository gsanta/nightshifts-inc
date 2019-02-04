import { UserDao } from '../model/user/UserDao';
import { UserModel } from '../model/user/UserModel';
import { FieldError } from '../model/FieldError';

export class LocalUserRegistration {
    private userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    public register(email: string, password: string): Promise<UserModel> {
        const userModel = UserModel.fromJSON({
            email,
            password
        });

        return this.userDao.findByEmail(email)
            .then(u => {
                if (u !== null) {
                    throw new FieldError('This email address is already used.', ['email']);
                }

                return this.userDao.save(userModel);
            })
            .then(user => {
                user.jwtToken = user.generateJWT();

                return user;
            });
    }
}

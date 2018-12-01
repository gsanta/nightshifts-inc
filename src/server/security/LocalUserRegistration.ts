import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import { FieldError } from '../controllers/validators/FieldError';

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
import axios from 'axios';
import { UserLoginDto } from './UserLoginDto';
import { UserModel } from '../../stores/UserModel';
import { Promise } from 'es6-promise';
import { UserDto } from './UserDto';

export class UserQuery {

    public login(userLoginDto: UserLoginDto): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', {
                user: {
                    email: userLoginDto.email,
                    password: userLoginDto.password
                }
            })
            .then((response: { data: { user: UserDto }}) => {
                const userModel = new UserModel();
                userModel.setEmail(response.data.user.email);
                resolve(userModel);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }
}

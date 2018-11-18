import axios from 'axios';
import { UserLoginDto } from './UserLoginDto';
import { UserModel } from '../../stores/UserModel';
import { Promise } from 'es6-promise';
import { UserDto } from './UserDto';
import { TokenHandler } from '../TokenHandler';

export class UserQuery {
    private tokenHandler: TokenHandler;

    constructor(tokenHandler: TokenHandler = new TokenHandler()) {
        this.tokenHandler = tokenHandler;
    }

    public login(userLoginDto: UserLoginDto): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', {
                user: {
                    email: userLoginDto.email,
                    password: userLoginDto.password
                }
            })
            .then((response: { data: { user: UserDto }}) => {
                this.tokenHandler.saveToken(response.data.user.token);
                const userModel = new UserModel();
                userModel.setEmail(response.data.user.email);
                resolve(userModel);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public fetchUser(): Promise<UserModel> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();
            axios.get(
                '/api/user',
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
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

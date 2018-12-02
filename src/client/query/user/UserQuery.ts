import axios from 'axios';
import { UserLoginDto } from './UserLoginDto';
import { User } from '../../stores/User';
import { Promise } from 'es6-promise';
import { UserDto } from './UserDto';
import { TokenHandler } from '../TokenHandler';
import { PasswordUpdateDto } from './PasswordUpdateDto';

export class UserQuery {
    private tokenHandler: TokenHandler;

    constructor(tokenHandler: TokenHandler = new TokenHandler()) {
        this.tokenHandler = tokenHandler;
    }

    public login(userLoginDto: UserLoginDto): Promise<User> {
        return new Promise((resolve, reject) => {
            axios.post('/api/login', {
                user: {
                    email: userLoginDto.email,
                    password: userLoginDto.password
                }
            })
            .then((response: { data: { user: UserDto }, headers: any}) => {
                this.tokenHandler.saveToken(response.headers.authorization);
                const userModel = User.fromDto(response.data.user);
                resolve(userModel);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public signup(userLoginDto: UserLoginDto): Promise<User> {
        return new Promise((resolve, reject) => {
            axios.post('/api/signup', {
                user: {
                    email: userLoginDto.email,
                    password: userLoginDto.password
                }
            })
            .then((response: { data: { user: UserDto }, headers: any}) => {
                this.tokenHandler.saveToken(response.headers.authorization);
                const userModel = User.fromDto(response.data.user);
                resolve(userModel);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public loginFacebook(accessToken): Promise<User> {
        return new Promise((resolve, reject) => {
            axios.post('/api/signin/facebook', {
                accessToken: accessToken
            })
            .then((response: { data: { user: UserDto }, headers: any}) => {
                this.tokenHandler.saveToken(response.headers.authorization);
                const userModel = new User();
                userModel.setEmail(response.data.user.email);
                resolve(userModel);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public fetchUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();
            axios.get(
                '/api/user',
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then((response: { data: { user: UserDto }}) => {
                const user = new User();
                user.setEmail(response.data.user.email);
                user.id = response.data.user.id;
                user.authStrategy = response.data.user.authStrategy;
                resolve(user);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public updateUser(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();

            axios.put(
                '/api/users',
                {
                    user
                },
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then((response: { data: { user: UserDto }}) => {
                const userModel = new User();
                userModel.setEmail(response.data.user.email);
                resolve(userModel);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public updatePassword(passwordDto: PasswordUpdateDto): Promise<User> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();

            axios.put(
                '/api/users/password',
                passwordDto,
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then((response: { data: { user: UserDto }}) => {
                resolve();
            })
            .catch((e) => {
                reject(e);
            });
        });
    }
}

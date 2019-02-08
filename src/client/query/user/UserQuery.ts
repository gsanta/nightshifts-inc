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
        this.fetchUser = this.fetchUser.bind(this);
        this.loginFacebook = this.loginFacebook.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.signout = this.signout.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
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
                const user = User.fromDto(response.data.user);
                resolve(user);
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
                const user = User.fromDto(response.data.user);
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
                const updatedUser = User.fromDto(response.data.user);
                resolve(updatedUser);
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

    public signout() {
        this.tokenHandler.deleteToken();
    }
}

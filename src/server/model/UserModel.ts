import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'GSANTA';

export class UserModel {
    public email: string;
    public authStrategy: 'local' | 'facebook';
    public accessToken: string;
    public hash: string;
    public salt: string;


    public generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today.getTime());
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign(
            {
                email: this.email,
                exp: expirationDate.getTime() / 1000
            },
            JWT_SECRET
        );
    }

    public toJSON() {
        return {
            email: this.email,
            jwtToken: this.generateJWT(),
        };
    }

    public static fromJSON(json: {
        email: string;
        password: string;
    }): UserModel {
        const userModel = new UserModel();
        userModel.email = json.email;
        userModel.setPassword(json.password);
        userModel.authStrategy = 'local';

        return userModel;
    }

    public validatePassword(password: string) {
        const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
        return this.hash === hash;
    }

    public setPassword(password: string) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    }
}

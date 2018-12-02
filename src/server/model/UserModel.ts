import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export const JWT_SECRET = 'GSANTA';

export class UserModel {
    public id: string;
    public email: string;
    public authStrategy: 'local' | 'facebook';
    public accessToken: string;
    public hash: string;
    public salt: string;
    public jwtToken: string;


    public generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today.getTime());
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign(
            {
                id: this.id,
                exp: expirationDate.getTime() / 1000
            },
            JWT_SECRET
        );
    }

    public toJSON() {
        return {
            id: this.id,
            email: this.email,
            jwtToken: this.jwtToken,
            authStrategy: this.authStrategy
        };
    }

    public static fromJSON(json: {
        id?: string;
        email: string;
        password: string;
    }): UserModel {
        const userModel = new UserModel();
        userModel.id = json.id;
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

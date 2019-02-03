import { JWT_SECRET } from '../model/UserModel';
const jwt = require('express-jwt');

const getTokenFromHeaders = (req) => {
    const { headers: { authorization } } = req;

    if (authorization && authorization.split(' ')[0] === 'Token') {
        return authorization.split(' ')[1];
    }
    return null;
};

export class JwtTokenExtracter {

    public withOptionalToken() {
        return jwt({
            secret: JWT_SECRET,
            userProperty: 'payload',
            getToken: getTokenFromHeaders,
            credentialsRequired: false,
        });
    }

    public withRequiredToken() {
        return jwt({
            secret: JWT_SECRET,
            userProperty: 'payload',
            getToken: getTokenFromHeaders,
        });
    }
}

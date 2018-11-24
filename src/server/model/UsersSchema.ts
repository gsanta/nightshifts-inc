import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
    email: String,
    jwtToken: String,
    authStrategy: String,
    accessToken: String,
    hash: String,
    salt: String,
});

UsersSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

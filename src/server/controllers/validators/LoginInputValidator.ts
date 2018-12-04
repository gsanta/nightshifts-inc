import { FieldError } from './FieldError';
import * as EmailValidator from 'email-validator';

export interface LoginDto {
    email: string;
    password: string;
}

export class LoginInputValidator {
    public validate(loginDto: LoginDto) {
        validateEmail(loginDto.email);
        validatePassword(loginDto.password);
    }
}

export const validateEmail = (email: string): void => {
    if (!email) {
        throw new FieldError('Email is required.', ['email']);
    }

    if (!EmailValidator.validate(email)) {
        throw new FieldError('Not a valid email.', ['email']);
    }
};

export const validatePassword = (password: string): void => {
    if (!password) {
        throw new FieldError('Password is required.', ['password']);
    }

    if (password.length < 4) {
        throw new FieldError('Password length should be at least four characters.', ['password']);
    }
};

export const validateNewPassword = (password: string): void => {
    if (!password) {
        throw new FieldError('New password is required.', ['newPassword']);
    }

    if (password.length < 4) {
        throw new FieldError('Password length should be at least four characters.', ['newPassword']);
    }
};

export const validateLoginStrategySupportsEmailChange = (strategy: 'local' | 'facebook'): void => {
    if (strategy === 'facebook') {
        throw new FieldError('Can\'t change email, when logged in with Facebook.', ['email']);
    }
};

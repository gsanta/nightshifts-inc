import { FieldError } from './FieldError';


export interface LoginDto {
    email: string;
    password: string;
}

export class LoginInputValidator {

    public validate(loginDto: LoginDto) {
        if (!loginDto.email) {
            throw new FieldError('Email is required.', ['email']);
        }

        validatePassword(loginDto.password);
    }
}

export const validatePassword = (password: string): void => {
    if (!password) {
        throw new FieldError('Password is required.', ['password']);
    }

    if (password.length < 4) {
        throw new FieldError('Password length should be at least four characters.', ['password']);
    }
};

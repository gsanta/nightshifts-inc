import { FieldError } from './FieldError';


export interface LoginDto {
    email: string;
    password: string;
}

export class LoginInputValidator {

    public validate(loginDto: LoginDto) {
        if (!loginDto.email) {
            throw new FieldError('Email is required.', 'email');
        }

        if (!loginDto.password) {
            throw new FieldError('Password is required.', 'password');
        }
    }
}

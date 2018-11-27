import { JsonPropertyError } from './FieldError';


export interface LoginDto {
    email: string;
    password: string;
}

export class LoginInputValidator {

    public validate(loginDto: LoginDto) {
        if (!loginDto.email) {
            throw new JsonPropertyError('Email is required.', 'email');
        }

        if (!loginDto.password) {
            throw new JsonPropertyError('Password is required.', 'password');
        }
    }
}

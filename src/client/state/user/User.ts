import { UserDto } from '../../query/user/UserDto';

export class User {
    public email: string;
    public id: string;
    public authStrategy: 'facebook' | 'local';

    public setEmail(email: string) {
        this.email = email;
    }

    public getEmail() {
        return this.email;
    }

    clone(): User {
        const clone = new User();
        clone.email = this.email;
        clone.id = this.id;
        clone.authStrategy = this.authStrategy;
        return clone;
    }

    public static fromDto(userDto: UserDto): User {
        const user = new User();
        user.email = userDto.email;
        user.id = userDto.id;
        user.authStrategy = userDto.authStrategy;

        return user;
    }
}

import { UserDto } from './UserDto';

export class User {
    public email: string;
    public id: string;
    public authStrategy: 'facebook' | 'local' | 'unauthenticated';

    public static fromDto(userDto: UserDto): User {
        const user = new User();
        user.email = userDto.email;
        user.id = userDto.id;
        user.authStrategy = userDto.authStrategy;

        return user;
    }
}

import * as mongoose from 'mongoose';
import { UserDto } from './UserDto';
const Users = mongoose.model('Users');

export class UserDao {
    public save(userDto: UserDto): Promise<any> {
        return new Users(userDto).save();
    }

    public findByEmail(email: string): Promise<UserDto> {
        const query = Users.find({ email });

        return query.exec()
            .then((result: any) => {
                if (result.length > 0) {
                    return {
                        email: result[0].email
                    };
                }

                return null;
            });
    }
}

import * as mongoose from 'mongoose';
import { UserModel } from './UserModel';
const Users = mongoose.model('Users');

export class UserDao {
    public save(userModel: UserModel): Promise<UserModel> {
        return new Users(userModel).save().then(() => userModel);
    }

    public findByEmail(email: string): Promise<UserModel> {
        const query = Users.find({ email });

        return query.exec()
            .then((result: any) => {
                if (result.length > 0) {
                    return this.schemaToModel(result[0]);
                }

                return null;
            });
    }

    private schemaToModel(schema: any): UserModel {
        const userModel = new UserModel();
        userModel.email = schema.email;
        userModel.accessToken = schema.accessToken;
        userModel.authStrategy = schema.authStrategy;
        userModel.hash = schema.hash;
        userModel.salt = schema.salt;
        userModel.jwtToken = schema.jwtToken;

        return userModel;
    }
}

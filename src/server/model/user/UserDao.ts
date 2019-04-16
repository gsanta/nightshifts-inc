import * as mongoose from 'mongoose';
import { UserModel } from './UserModel';
import { PasswordUpdateDto } from '../../../client/state/user/dto/PasswordUpdateDto';

export interface MongooseUserModel extends mongoose.Document {
    email: string;
    jwtToken: string;
    authStrategy: string;
    accessToken: string;
    hash: string;
    salt: string;
}

export class UserDao {
    private modelConstr: mongoose.Model<MongooseUserModel, {}>;

    constructor(modelConstr: mongoose.Model<MongooseUserModel, {}>) {
        this.modelConstr = modelConstr;
    }

    public save(userModel: UserModel): Promise<UserModel> {
        return new this.modelConstr(userModel).save()
            .then(schema => {
                return this.schemaToModel(schema);
            });
    }

    public update(userModel: UserModel) {
        return this.modelConstr.findById(userModel.id)
            .then(user => {
                user.email = userModel.email;

                return user.save();
            })
            .then(user => {
                return this.schemaToModel(user);
            });
    }

    public updatePassword(passwordUpdateDto: PasswordUpdateDto) {
        return this.modelConstr.findOne({_id: passwordUpdateDto.id})
            .then(user => {
                const userModel = this.schemaToModel(user);
                userModel.setPassword(passwordUpdateDto.newPassword);

                user.salt = userModel.salt;
                user.hash = userModel.hash;

                return user.save();
            })
            .then(user => {
                return this.schemaToModel(user);
            });
    }

    public findByEmail(email: string): Promise<UserModel> {
        const query = this.modelConstr.find({ email });

        return query.exec()
            .then((result: any) => {
                if (result.length > 0) {
                    return this.schemaToModel(result[0]);
                }

                return null;
            });
    }

    public findById(id: string): Promise<UserModel> {
        const query = this.modelConstr.findById(id);

        return query.exec()
            .then((result: any) => {
                if (result) {
                    return this.schemaToModel(result);
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
        userModel.id = schema.id;

        return userModel;
    }
}



import * as mongoose from 'mongoose';
import { GameModel } from './GameModel';

export interface MongooseGameModel extends mongoose.Document {
    world: string;
}

export class GameDao {
    private modelConstr: mongoose.Model<MongooseGameModel, {}>;

    constructor(modelConstr: mongoose.Model<MongooseGameModel, {}>) {
        this.modelConstr = modelConstr;
    }

    public async save(gameModel: Partial<GameModel>): Promise<Partial<GameModel>> {
        const result = await new this.modelConstr(gameModel).save();
        return this.schemaToModel(result);
    }

    public async load(userId: string): Promise<Partial<GameModel>> {
        const query = this.modelConstr.find({ userId });

        const result = await query.exec();

        return result.length > 0 ? this.schemaToModel(result[0]) : null;
    }

    private schemaToModel(schema: MongooseGameModel): Partial<GameModel> {
        const gameModel: Partial<GameModel> = {
            world: schema.world
        };

        return gameModel;
    }
}

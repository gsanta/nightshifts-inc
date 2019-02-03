

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

    public async save(gameModel: GameModel): Promise<GameModel> {
        const result = await new this.modelConstr(gameModel).save();
        return this.schemaToModel(result);
    }

    public async load(userId: string): Promise<GameModel> {
        const query = this.modelConstr.find({ userId });

        const result = await query.exec();

        return result.length > 0 ? this.schemaToModel(result[0]) : null;
    }

    private schemaToModel(schema: MongooseGameModel): GameModel {
        const gameModel = new GameModel();

        gameModel.world = schema.world;

        return gameModel;
    }
}

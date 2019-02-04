

import * as mongoose from 'mongoose';
import { GameModel } from './GameModel';
import { Model } from 'mongoose';

export interface MongooseGameModel extends mongoose.Document {
    world: string;
}

export class GameDao {
    private modelConstr: Model<GameModel>;

    constructor(modelConstr: Model<GameModel>) {
        this.modelConstr = modelConstr;
    }

    public async save(gameModel: Partial<GameModel>): Promise<Partial<GameModel>> {
        const result = await new this.modelConstr(gameModel).save();
        return this.schemaToModel(result);
    }

    public async update(inputGameModel: Partial<GameModel>): Promise<Partial<GameModel>> {
        const gameModel = await this.modelConstr.findById(inputGameModel.id);
        gameModel.world = inputGameModel.world;

        await gameModel.save();

        return gameModel;
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

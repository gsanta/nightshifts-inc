import * as mongoose from 'mongoose';
import { GameModel } from './GameModel';
import { Model } from 'mongoose';

const GamesSchema = new mongoose.Schema({
    world: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    }
});

export const GameDatabaseModel: Model<GameModel> = mongoose.model<GameModel>('Games', GamesSchema);

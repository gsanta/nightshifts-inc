import * as mongoose from 'mongoose';

export const GamesSchema = new mongoose.Schema({
    world: String,
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}
});

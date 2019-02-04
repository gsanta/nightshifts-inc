import {Document} from 'mongoose';

export interface GameModel extends Document {
    world: string;
    userId: string;
}


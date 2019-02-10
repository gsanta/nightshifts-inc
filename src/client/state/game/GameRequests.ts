import { TokenHandler } from '../../query/TokenHandler';
import { Promise } from 'es6-promise';
import axios from 'axios';
import { User } from '../../stores/User';
import { World } from '../../../game/model/World';
import {JsonWorldExporter} from '../../../game/io/json_world_io/export/JsonWorldExporter';

export class GameRequests {
    private jsonWorldExporter: JsonWorldExporter;
    private tokenHandler: TokenHandler;

    constructor(tokenHandler = new TokenHandler(), jsonWorldExporter: JsonWorldExporter = new JsonWorldExporter()) {
        this.jsonWorldExporter = jsonWorldExporter;
        this.tokenHandler = tokenHandler;
    }

    public update(user: User, world: World): Promise<any> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();
            axios.post(
                '/api/game/update',
                {
                    user: {
                        userId: user.id,
                        world: this.jsonWorldExporter.export(world)
                    }
                },
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then(() => resolve())
            .catch((e) => reject(e));
        });
    }
}

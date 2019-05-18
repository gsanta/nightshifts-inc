import { TokenHandler } from '../TokenHandler';
import { Promise } from 'es6-promise';
import axios, { AxiosResponse } from 'axios';
import { User } from '../settings_state/model/User';
import { World } from '../../../game/world/World';

export class WorldRequests {
    private jsonWorldExporter: any;
    private tokenHandler: TokenHandler;

    constructor(tokenHandler = new TokenHandler(), jsonWorldExporter: any) {
        this.jsonWorldExporter = jsonWorldExporter;
        this.tokenHandler = tokenHandler;
    }

    public update(user: User, world: World): Promise<any> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();
            axios.post(
                '/api/game/update',
                {
                    id: null,
                    userId: user.id,
                    world: null//this.jsonWorldExporter.export(world)
                },
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then(() => resolve())
            .catch((e) => reject(e));
        });
    }

    public getWorldByUserId(user: User): Promise<World> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();

            axios.get(
                `/api/game/load/${user.id}`,
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then((resp: AxiosResponse<World>) => resolve(resp.data))
            .catch((e) => reject(e));
        });
    }
}

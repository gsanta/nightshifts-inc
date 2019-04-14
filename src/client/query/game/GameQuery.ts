import { JsonWorldSchema } from '../../../game/io/json_world_io/import/JsonWorldSchema';
import axios from 'axios';
import { Promise } from 'es6-promise';
import { TokenHandler } from '../TokenHandler';
import { User } from '../../state/user/User';
import { UserDto } from '../user/UserDto';

export class GameQuery {
    private tokenHandler: TokenHandler;

    constructor(tokenHandler: TokenHandler = new TokenHandler()) {
        this.tokenHandler = tokenHandler;
    }

    public getWorld(): Promise<JsonWorldSchema> {
        return new Promise((resolve, reject) => {
            const token = this.tokenHandler.loadToken();
            axios.get(
                '/game/load/',
                {
                    headers: {Authorization: `Token ${token}`}
                }
            )
            .then((response: { data: { user: UserDto }}) => {
                const user = User.fromDto(response.data.user);
                resolve(<any> user);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }
}

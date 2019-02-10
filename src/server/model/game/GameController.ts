import { BaseController } from '../../BaseController';
import * as express from 'express';
import { GameDao } from './GameDao';
import { JwtTokenExtracter } from '../../security/JwtTokenExtracter';
import { GameModel } from './GameModel';
import { UserDao } from '../user/UserDao';


export class GameController extends BaseController {
    private gameDao: GameDao;
    private userDao: UserDao;
    private jwtTokenExtracter: JwtTokenExtracter;

    constructor(
        gameDao: GameDao,
        userDao: UserDao,
        jwtTokenExtracter: JwtTokenExtracter
    ) {
        super();
        this.gameDao = gameDao;
        this.userDao = userDao;
        this.jwtTokenExtracter = jwtTokenExtracter;
    }

    public register(router: express.Router) {
        this.registerSave(router);
        this.registerUpdate(router);
        this.registerLoad(router);
    }

    private registerSave(router: express.Router) {
        router.post('/game/save', this.jwtTokenExtracter.withRequiredToken(), async (req, res) => {
            this.addErrorHandling(
                async () => {
                    const user = await this.userDao.findById(req.params.userId);

                    if (!user) {
                        throw new Error('User not found');
                    }

                    let gameModel: Partial<GameModel> = {
                        world: JSON.stringify(req.body.world),
                        userId: req.body.userId
                    };

                    gameModel = await this.gameDao.save(gameModel);
                    if (!gameModel) {
                        throw new Error('Game not found');
                    }

                    res.status(200).send(null);
                },
                res
            );
        });
    }

    private registerUpdate(router: express.Router) {
        router.post('/game/update', this.jwtTokenExtracter.withRequiredToken(), async (req, res) => {
            debugger;
            this.addErrorHandling(
                async () => {

                    let gameModel: Partial<GameModel> = {
                        id: req.body.id,
                        world: JSON.stringify(req.body.world),
                        userId: req.body.userId
                    };

                    gameModel = await this.gameDao.update(gameModel);
                    if (!gameModel) {
                        throw new Error('Game not found');
                    }

                    res.status(200).send(null);
                },
                res
            );
        });
    }

    private registerLoad(router: express.Router) {
        router.get('/game/load/:userId', this.jwtTokenExtracter.withRequiredToken(), async (req, res) => {
            this.addErrorHandling(
                async () => {

                    const user = await this.userDao.findById(req.params.userId);

                    if (!user) {
                        throw new Error('User not found');
                    }

                    const gameModel = await this.gameDao.load(req.params.userId);
                    if (!gameModel) {
                        throw new Error('Game not found');
                    }

                    res.status(200).json(gameModel);
                },
                res
            );
        });
    }
}

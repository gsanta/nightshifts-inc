import { FieldError } from './validators/FieldError';
import { BaseController } from './BaseController';
import * as express from 'express';
import { GameDao } from '../model/GameDao';
import { JwtTokenExtracter } from '../security/JwtTokenExtracter';



export class GameController extends BaseController {
    private gameDao: GameDao;
    private jwtTokenExtracter: JwtTokenExtracter;

    constructor(
        gameDao: GameDao,
        jwtTokenExtracter: JwtTokenExtracter
    ) {
        super();
        this.gameDao = gameDao;
        this.jwtTokenExtracter = jwtTokenExtracter;
    }

    public register(router: express.Router) {
        this.registerSave(router);
        this.registerLoad(router);
    }

    private registerSave(router: express.Router) {
        router.post('/game/save', this.jwtTokenExtracter.withRequiredToken(), async (req, res) => {
            this.addErrorHandling(
                async () => {

                    let gameModel = {
                        world: JSON.stringify(req.body.world),
                        userId: req.body.userId
                    };

                    gameModel = await this.gameDao.save(gameModel);
                    if (!gameModel) {
                        throw new Error('Game not found');
                    }

                    res.status(200);
                },
                res
            );
        });
    }

    private registerLoad(router: express.Router) {
        router.get('/game/load/:userId', this.jwtTokenExtracter.withRequiredToken(), async (req, res) => {
            this.addErrorHandling(
                async () => {

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

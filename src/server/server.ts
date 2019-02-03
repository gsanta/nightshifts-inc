import * as mongoose from 'mongoose';
import { UsersSchema } from './model/UsersSchema';
import { GamesSchema } from './model/GamesSchema';
import { MongooseUserModel, UserDao } from './model/UserDao';
import { GameDao, MongooseGameModel } from './model/GameDao';
import { UserController } from './controllers/UserController';
import { FacebookUserRegistration } from './security/FacebookUserRegistration';
import { LocalUserRegistration } from './security/LocalUserRegistration';
import { LocalAuthentication } from './security/LocalAuthentication';
import * as passport from 'passport';
import { JwtTokenExtracter } from './security/JwtTokenExtracter';
import express = require('express');
import { GameController } from './controllers/GameController';
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/thegame');
mongoose.set('debug', true);
mongoose.model<MongooseUserModel>('Users', UsersSchema);
mongoose.model<MongooseGameModel>('Games', GamesSchema);
const Users = mongoose.model<MongooseUserModel>('Users');
const Games = mongoose.model<MongooseGameModel>('Games');

export const router = require('express').Router();

const userDao = new UserDao(Users);
const userController = new UserController(
    userDao,
    new LocalAuthentication(passport, userDao),
    new FacebookUserRegistration(userDao),
    new LocalUserRegistration(userDao),
    new JwtTokenExtracter()
);
userController.register(router);

const gameDao = new GameDao(Games);
const gameController = new GameController(
    gameDao,
    new JwtTokenExtracter()
);
gameController.register(router);

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hi');
});

app.use('/api', router);

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
});

export default server;

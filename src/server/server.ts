import * as mongoose from 'mongoose';
import { UsersSchema } from './model/user/UsersSchema';
import { MongooseUserModel, UserDao } from './model/user/UserDao';
import { GameDao } from './model/game/GameDao';
import { UserController } from './model/user/UserController';
import { FacebookUserRegistration } from './security/FacebookUserRegistration';
import { LocalUserRegistration } from './security/LocalUserRegistration';
import { LocalAuthentication } from './security/LocalAuthentication';
import * as passport from 'passport';
import { JwtTokenExtracter } from './security/JwtTokenExtracter';
import express = require('express');
import { GameController } from './model/game/GameController';
import { GameDatabaseModel } from './model/game/GameDatabaseModel';
const bodyParser = require('body-parser');

const mongodbURI = process.env.MONGODB_URI || 'localhost';
mongoose.connect(`mongodb://${mongodbURI}/thegame`);
mongoose.set('debug', true);
mongoose.model<MongooseUserModel>('Users', UsersSchema);
const Users = mongoose.model<MongooseUserModel>('Users');

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

const gameDao = new GameDao(GameDatabaseModel);
const gameController = new GameController(
    gameDao,
    userDao,
    new JwtTokenExtracter()
);
gameController.register(router);

const app = express();
app.set('port', process.env.PORT || 3001);
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

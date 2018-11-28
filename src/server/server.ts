import app from './app';
import * as mongoose from 'mongoose';
import { UsersSchema } from './model/UsersSchema';
import { MongooseUserModel, UserDao } from './model/UserDao';
import { UserController } from './routes/UserController';
import { FacebookUserRegistration } from './auth/FacebookUserRegistration';
import { LocalUserRegistration } from './auth/LocalUserRegistration';
import { LocalAuthentication } from './auth/LocalAuthentication';
import * as passport from 'passport';

mongoose.connect('mongodb://localhost/thegame');
mongoose.set('debug', true);
mongoose.model<MongooseUserModel>('Users', UsersSchema);
const Users = mongoose.model<MongooseUserModel>('Users');

export const router = require('express').Router();

const userDao = new UserDao(Users);
const userController = new UserController(
    userDao,
    new LocalAuthentication(passport, userDao),
    new FacebookUserRegistration(userDao),
    new LocalUserRegistration(userDao)
);
userController.register(router);


// require('./auth/passport');

app.use('/api', router);

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
    );
});

export default server;

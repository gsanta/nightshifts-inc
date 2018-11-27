import * as passport from 'passport';
import { UserDao } from '../model/UserDao';
import { UserAuthenticator } from './UserAuthenticator';
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');

passport.use(new LocalStrategy(
    {
        usernameField: 'user[email]',
        passwordField: 'user[password]',
    },
    (email, password, done) => {
        const userAuthenticator = new UserAuthenticator(new UserDao());

        userAuthenticator.login(email, password)
            .then(user => {
                done(null, user);
            })
            .catch(done);
    }
));

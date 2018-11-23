import * as passport from 'passport';
import { UserDao } from '../model/UserDao';
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
    {
        usernameField: 'user[email]',
        passwordField: 'user[password]',
    },
    (email, password, done) => {
        const userDao = new UserDao();
        userDao.findByEmail(email)
            .then((user) => {
                if (!user || !user.validatePassword(password)) {
                    return done(null, false, { errors: { 'email or password': 'is invalid' } });
                }

                return done(null, user);
            })
            .catch(done);
    }
));
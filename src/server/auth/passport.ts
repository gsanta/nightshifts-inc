import * as mongoose from 'mongoose';
import * as passport from 'passport';
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');

const Users = <any> mongoose.model('Users');

passport.use(new LocalStrategy(
    {
    usernameField: 'user[email]',
    passwordField: 'user[password]',
    },
    (email, password, done) => {
    Users.findOne({ email })
        .then((user) => {
        if(!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
        }

        return done(null, user);
        }).catch(done);
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: '1908610379223081',
        clientSecret: '86f6088e1b2e52a8e8895485829e166b',
        callbackURL: 'http://localhost:8080/api/login/facebook/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        cb({
            name: 'abcd'
        });
    }
));

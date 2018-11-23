import * as passport from 'passport';
import { UserDao } from '../model/UserDao';
import { UserAuthenticator } from './UserAuthenticator';
import { JWT_SECRET } from '../model/UserModel';
const LocalStrategy = require('passport-local');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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

// passport.use(new JWTStrategy(
//     {
//         jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//         secretOrKey   : JWT_SECRET
//     },
//     function (jwtPayload, cb) {

//         //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
//         return UserModel.findOneById(jwtPayload.id)
//             .then(user => {
//                 return cb(null, user);
//             })
//             .catch(err => {
//                 return cb(err);
//             });
//     }
// ));

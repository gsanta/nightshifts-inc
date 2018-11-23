import { auth } from '../auth/auth';
const mongoose = require('mongoose');
const passport = require('passport');
export const router = require('express').Router();
const Users = mongoose.model('Users');
import * as request from 'request';
import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import { UserAuthenticator } from '../auth/UserAuthenticator';

router.post('/signup', auth.optional, (req, res, next) => {
    const { body: { user: userJson } } = req;

    if (!userJson.email) {
        return res.status(400).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!userJson.password) {
        return res.status(400).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const userAuthenticator = new UserAuthenticator(new UserDao());
    userAuthenticator.signup(userJson.email, userJson.password)
        .then(user => {
            res.json({ user: user.toJSON() });
        })
        .catch(e => console.log(e));
});

router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(400).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(400).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, user: UserModel, info) => {
        if (err) {
            return next(err);
        }

        if (user) {
            user.accessToken = user.generateJWT();

            return res.json({ user: user.toJSON() });
        }

        return res.status(400).info;
    })(req, res, next);
});

router.get('/user', auth.required, (req, res, next) => {
    const { payload: { email } } = req;


    const userDao = new UserDao();

    userDao.findByEmail(email)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toJSON() });
    });
});

router.post('/signin/facebook', auth.optional, (req, res) => {
    request(`https://graph.facebook.com/me?fields=email&access_token=${req.body.accessToken}`, (err, response, body) => {
        const profileData = JSON.parse(body);

        const userAuthenticator = new UserAuthenticator(new UserDao());
        userAuthenticator
            .signupFacebook(profileData.email, req.body.accessToken)
            .then((user: UserModel) => {
                return res.json({ user: user.toJSON() });
            });
    });
});

router.get(
    '/login/facebook/callback',
    passport.authenticate(
        'facebook',
        {
            failureRedirect: '/login',
            successRedirect: '/'
        }
    ),
    function(req, res) {
        console.log(req.body)
        // Successful authentication, redirect home.
        return res.json({});
    }
);

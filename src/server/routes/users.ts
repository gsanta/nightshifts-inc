import { auth } from '../auth/auth';
const mongoose = require('mongoose');
const passport = require('passport');
export const router = require('express').Router();
import * as request from 'request';
import { UserDao } from '../model/UserDao';
import { UserModel } from '../model/UserModel';
import { UserAuthenticator } from '../auth/UserAuthenticator';
import { JsonPropertyError } from '../model/FieldError';
import { PasswordUpdateDto } from '../../client/query/user/PasswordUpdateDto';
import * as express from 'express';

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
        .catch(e => {
            let errors: any;

            if (e instanceof JsonPropertyError) {
                errors = [{
                    property: e.property,
                    message: e.message
                }];
            } else {
                errors = e.message;
            }

            return res.status(400).json({
                errors: errors,
            });
        });
});

router.post('/login', auth.optional, (req, res: express.Response, next) => {
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

    return passport.authenticate('local', { session: false }, (err, userModel: UserModel, info) => {
        if (err) {
            return next(err);
        }

        res.set('Authorization', userModel.jwtToken);

        if (userModel) {
            userModel.accessToken = userModel.generateJWT();

            return res.json({ user: userModel.toJSON() });
        }

        return res.status(400);
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

router.put('/users', auth.required, (req, res, next) => {
    console.log('runs');
    const userDao = new UserDao();

    const userModel = new UserModel();
    userModel.email = req.body.user.email;
    userModel.id = req.body.user.id;

    userDao.update(userModel)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toJSON() });
        })
        .catch(e => {
            console.log(e);
        });
});

router.put('/users/password', auth.required, (req, res, next) => {
    const userDao = new UserDao();

    userDao.updatePassword(<PasswordUpdateDto> req.body)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toJSON() });
        })
        .catch(e => {
            console.log(e);
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

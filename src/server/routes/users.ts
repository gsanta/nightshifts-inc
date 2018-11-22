import { auth } from '../auth/auth';
const mongoose = require('mongoose');
const passport = require('passport');
export const router = require('express').Router();
const Users = mongoose.model('Users');
import * as request from 'request';

router.post('/signup', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if (!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).info;
    })(req, res, next);
});

router.get('/user', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
    });
});

router.post('/signin/facebook', auth.optional, req => {
    console.log(req.body.accessToken)
    request(`https://graph.facebook.com/me?fields=email&access_token=${req.body.accessToken}`, (err, response, body) => {
        const profileData = JSON.parse(body);
        console.log(profileData)
        const query = Users.find({ email: profileData.email });
        query.exec()
            .then((result) => {
                console.log('resulttt');
                console.log(result);
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

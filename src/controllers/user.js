const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const validation = require('../validation/validate-input');

const ctrl = {};

ctrl.signup = async (req, res) => {

    try {
        res.json({
            message: 'Signup successful',
            user: req.user
        });

    } catch (err) {
        console.log(err);
        res.status(404).json(err);
    };

};

ctrl.signin = async (req, res, next) => {

    passport.authenticate('login', async (err, user, info) => {
        const {
            errors,
            isValid
        } = validation.validateSigninInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }
        try {
            if (err || !user) {
                //const error = new Error('An Error occured')
                //res.status(404).json(errors);
                errors.notFound = 'User or password incorrect';
                return next(res.json(errors));
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return next(error)
                //Don't store sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = {
                    id: user.id,
                    email: user.email
                };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({
                        user: body,
                    },
                    config.secret, {
                        expiresIn: 60 * 60
                    },
                );
                //Send back the token to the user
                return res.json({
                    token
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};


ctrl.get_User_Profile = async (req, res, next) => {
    const errors = {};
    try {
        //Ssend back the user details and the token
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            token: req.query.secret_token
        });
    } catch (err) {
        console.log(err);
        errors.notFound = 'User not found.';
        return res.status(404).json(errors);
    };
};

ctrl.get_test = (req, res) => {
    res.json('Berear token works!');
};

module.exports = ctrl;
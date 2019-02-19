const passport = require('passport');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/Users');
const validation = require('../validation/validate-input');
const config = require('../config/config');

//Create a passport middleware to handle user registration
passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const {
        errors,
        isValid
    } = validation.validateSignupInput(req.body);
    if (!isValid) {
        return done(JSON.stringify(errors));
    }
    try {
        const {
            name
        } = req.body;
        //Save the information provided by the user to the the database
        bcrypt.genSalt(10, async (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) throw err;
                password = hash;
                const user = await User.create({
                    name,
                    email,
                    password
                });
                //Send the user information to the next middleware
                return done(null, user);
            });
        })

    } catch (error) {
        console.log(error)
        done(error);
    }
}));

//Create a passport middleware to handle User login
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        //Find the user associated with the email provided by the user
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            //If the user isn't found in the database, return a message
            return done(null, false, {
                message: 'User not found'
            });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) {
            return done(null, false, {
                message: 'Wrong Password'
            });
        }
        //Send the user information to the next middleware
        return done(null, user, {
            message: 'Logged in Successfully'
        });
    } catch (error) {
        return done(error);
    }
}));

//Verifies the token sent by the user
passport.use(new JWTstrategy({
    //secret used to sign the JWT
    secretOrKey: config.secret,
    //Expect the user to send the token as a query paramater or a body field with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromExtractors([ExtractJWT.fromUrlQueryParameter('secret_token'), ExtractJWT.fromBodyField('secret_token')])
}, async (token, done) => {
    try {
        //Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));
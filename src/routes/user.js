const express = require('express');
const passport = require('passport');

const User = require('../controllers/user');

const router = express.Router();

//sends a post request with passport authentication based on middleware
//http://localost:5000/api/user/signup
router.post('/signup', passport.authenticate('signup', {
    session: false
}), User.signup);

router.post('/login', User.signin);

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), User.get_User_Profile);

router.get('/', passport.authenticate('jwt', {
    session: false
}), User.get_test);

module.exports = router;
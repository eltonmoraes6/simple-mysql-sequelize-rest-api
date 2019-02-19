const express = require('express');
const router = express.Router();
const passport = require('passport');

const Task = require('../controllers/tasks');

router.post('/', passport.authenticate('jwt', {
    session: false
}), Task.create_Task);

router.get('/', passport.authenticate('jwt', {
    session: false
}), Task.find_All_Tasks);

router.get('/:id', passport.authenticate('jwt', {
    session: false
}), Task.find_Task_By_Id);

router.delete('/:id', passport.authenticate('jwt', {
    session: false
}), Task.delete_Task);

router.patch('/:id', passport.authenticate('jwt', {
    session: false
}), Task.update_Task);

module.exports = router;
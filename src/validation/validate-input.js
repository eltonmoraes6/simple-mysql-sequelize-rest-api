const validator = require('validator');
const isEmpty = require('./is-empty');

const ctrl = {};

ctrl.validateSignupInput = (data) => {

    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if (!validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }
    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (!validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required';
    }
    if (!validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
};

ctrl.validateSigninInput = (data) => {

    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

ctrl.validateTaskInput = (data) => {

    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if (!validator.isLength(data.title, {
            min: 2,
            max: 30
        })) {
        errors.title = 'Title must be between 2 and 30 characters';
    }

    if (validator.isEmpty(data.title)) {
        errors.title = 'Title field is required';
    }

    if (validator.isEmpty(data.description)) {
        errors.description = 'description field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = ctrl;
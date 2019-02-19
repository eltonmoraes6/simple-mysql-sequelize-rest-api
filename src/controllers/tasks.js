const Task = require('../models/Tasks');
var titleCase = require('title-case');
const {
    format
} = require('timeago.js');

const validation = require('../validation/validate-input');
const config = require('../config/config');

const ctrl = {};

ctrl.create_Task = async (req, res) => {
    const {
        errors,
        isValid
    } = validation.validateTaskInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const user_id = req.user.id;

        const {
            title,
            description
        } = req.body;

        const newTask = ({
            user_id,
            title: titleCase(title),
            description,
        });
        const result = await Task.create(newTask);
        if (result) {
            res.send(result);
        }
    } catch (err) {
        res.status(500).json('error: ' + err);
    }
};

ctrl.find_All_Tasks = async (req, res) => {

    const errors = {};

    try {

        const tasks = await Task.findAll();

        if (tasks) {
            res.status(200).json({
                count: tasks.length,
                data: tasks.map(doc => {
                    return {
                        id: doc.id,
                        title: doc.title,
                        description: doc.description,
                        createdAt: format(doc.createdAt),
                        updatedAt: format(doc.updatedAt),
                        request: {
                            type: 'GET',
                            url: config.webApi + 'task/' + doc.id
                        }
                    }
                })
            });
        }
    } catch (err) {
        console.log('error: ', err);
        errors.notFound = 'There are no tasks yet. Please create one.';
        res.status(404).json(errors);
    };
};

ctrl.find_Task_By_Id = async (req, res) => {
    const errors = {};

    try {
        const {
            id
        } = req.params;

        const task = await Task.findByPk(id, {
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        });

        if (!task) {
            errors.notFound = 'Task not found';
            return res.status(404).json(errors);
        }
        return res.status(200).json({
            task,
            request: {
                type: 'GET',
                url: config.webApi + 'task/' + task.id
            }
        });

    } catch (err) {
        console.log('error: ', err);
        errors.notFound = 'Task not found';
        res.status(404).json(errors);
    };
};

ctrl.delete_Task = async (req, res) => {
    const errors = {};

    try {
        const {
            id
        } = req.params;
        const task = await Task.findByPk(id);
        if (!task) {
            errors.notFound = 'Task not found';
            return res.status(404).json(errors);
        } else {
            const delTask = await task.destroy();
            if (delTask) {
                return res.json({
                    message: "Destroy successfully!"
                });
            }
        };
    } catch (err) {
        console.log(err)
        errors.notFound = 'Task not found';
        res.status(404).send(errors)
    };
};

ctrl.update_Task = async (req, res) => {

    const {
        errors,
        isValid
    } = validation.validateTaskInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const {
            id
        } = req.params;

        const {
            title,
            description
        } = req.body;

        const task = await Task.findByPk(id);

        if (!task) {
            errors.notFound = 'Task not found';
            return res.status(404).json(errors);
        }

        const updatedTask = await task.update({
            title: titleCase(title),
            description
        });

        if (updatedTask) {
            return res.json({
                success: true,
                message: 'Task apdated successfully',
                task
            });
        }
    } catch (err) {
        console.log(err);
        errors.notFound = 'Something went wrong';
        return res.status(500).json(errors);
    };
};

module.exports = ctrl;
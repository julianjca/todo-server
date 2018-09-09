const router = require('express').Router();
const { addTask,deleteTask,updateTask,finishTask } = require('../controller/todoController');

// To-do
router.post('/',addTask);
router.delete('/:id',deleteTask);
router.put('/:id',updateTask);
router.patch('/:id',finishTask);


module.exports = router;
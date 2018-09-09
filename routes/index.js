const router = require('express').Router();
const { addUser,displayUser,fbLogin,findUser } = require('../controller/userController');


//User
router.post('/register',addUser);
router.post('/login',displayUser);
router.post('/fb-login',fbLogin);
router.post('/findUser',findUser);


module.exports = router;
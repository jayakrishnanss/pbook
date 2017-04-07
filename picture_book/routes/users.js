var express = require('express'),
    router = express.Router(),
    userController = require('../controller/UserController');;

router.post('/signup', function(req, res, next) {
    userController.signUp(req.body, function(data) {
        res.json(data);
    })
});
router.post('/login', function(req, res, next) {
    userController.login(req.body, function(data) {
        res.json(data);
    })
});
router.post('/logout', function(req, res, next) {
    res.send('Logout user');
});
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;

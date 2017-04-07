var express = require('express'),
    router = express.Router(),
    users = require('../routes/users');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Invalid  API request');
});

router.get('/picture_book', function(req, res, next) {
    res.send('thanks for calling me :). But you are entered into a wrong place');
});

router.use('/picture_book/users', users);

module.exports = router;

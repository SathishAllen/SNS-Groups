var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users.controller');

router.post('/login', UsersController.login);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

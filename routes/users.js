var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const config = require('./../config');


/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {

    var options = { keepAlive: 1, useNewUrlParser: true };
    var connection = mongoose.createConnection(`${config.db}/user_10`, options);

    const UserModel = connection.model('User');
    var users = await UserModel.getUsersByDb();
    res.json(users);
  }catch (e) {
    console.error(e)
  }
});


router.get('/:userId/posts', async function (req, res, next) {

  try {

    var options = { keepAlive: 1, useNewUrlParser: true };
    var connection = mongoose.createConnection(`${config.db}/user_${req.params.userId}`, options);

    const UserModel = connection.model('Post');
    var users = await UserModel.find();
    res.json(users);
  }catch (e) {
    console.error(e)
  }
});


router.put('/:userId', async function (req, res, next) {

  try {
    var options = { keepAlive: 1, useNewUrlParser: true };

    var connection = mongoose.createConnection(`${config.db}/user_${req.params.userId}`, options);

    const UserModel = connection.model('User');
    var user = await UserModel.findOne();
    user.avatar = req.body.avatar;
    await user.save()
    res.json(user);
  }catch (e) {
    console.error(e)
  }
});
module.exports = router;

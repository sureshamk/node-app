var express = require('express');
var router = express.Router();
const { getUser } = require('../lib/loadDataToDb');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    await getUser();
    res.send('Data Processed successfully');
  } catch (e) {
    res.send(e).status(500);
  }

});

module.exports = router;

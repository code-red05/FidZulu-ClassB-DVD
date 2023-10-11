var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const dvd = require('../dao/dvd');
const team = require('../dao/team');

router.get('/team', function(req, res, next) {
  console.log('got into /team');

  const result = team.list();
  if (result) {
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(result));
  } else {
    next(createError(404));
  }
});

router.get('/all/:location',async function(req, res, next) {
  const param = req.params.location;
  console.log('Routed to dvd/all/' + param);

  const result = await dvd.get_dvds_dynamo(param);
  if (result != null) {
    res.setHeader('content-type', 'application/json');
    res.json(result);
  } else {
    console.log("Error fetching from DynamoDB");
    next(createError(404));
  }
});


module.exports = router;
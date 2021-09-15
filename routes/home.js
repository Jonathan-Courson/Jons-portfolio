const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.render('home', {
      title: 'Portfolio',
      isNotLoggedIn: true,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

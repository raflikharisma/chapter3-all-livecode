const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const adminData = require('./admin')

router.get('/', (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const products = adminData.products;
  res.render('shop', {title: "Haloo rafli", products:products})
});

module.exports = router;

const express = require('express');

const router = express.Router();

const { purchaseList } = require('../../controllers/purchase');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/backoffice', (req, res) => {
  res.render('backoffice', {
    purchaseList,
  });
});

router.get('/checkout', (req, res) => {
  res.render('checkout');
});

module.exports = router;

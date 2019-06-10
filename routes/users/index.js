const express = require('express');

const router = express.Router();
const userController = require('../../controllers/users');

// router.get('/', (req, res) => {
//   User.find((err, data) => {
//     res.json(data);
//   });
// });

router.post('/register', (req, res) => {
  const output = userController.createUser(req.body);
  res.json(output);
});

module.exports = router;

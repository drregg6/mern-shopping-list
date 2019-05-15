const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route  POST api/auth
// @desc   Authorize a user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      res.status(401).json({ msg: 'Oopsie daisy!' });
    }

    // check for user
    User.findOne({email})
      .then(user => {
        if (!user) res.status(400).json({ msg: 'Oopsie daisy!' });

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) res.status(401).json({ msg: 'Unauthorized' });
          })
      }) // findOne.then()
});

module.exports = router;
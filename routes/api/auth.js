const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

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

            jwt.sign(
              { id: user.id }, // payload
              config.get("jwtSecret"),
              { expiresIn: 3600 }, // expires in an hour
              (err, token) => {
                if (err) throw err;
                res.json({ // when signed in and token created, send the user back
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                })
              }
            )
          })
      }) // findOne.then()
});

// @route  GET api/auth/user
// @desc   Get user data
// @access Private
router.get('/', auth, (req, res) => {
  User.findById(req.user.id) // return everything but the password
    .select('-password')
    .then(user => {
      res.json(user);
    });
})

module.exports = router;
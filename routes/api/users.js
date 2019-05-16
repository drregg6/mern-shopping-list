const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      res.status(401).json({ msg: 'Enter all fields!' });
    }

    // check for user
    User.findOne({email})
      .then(user => {
        if (user) res.status(401).json({ msg: 'Oopsie daisy!' });

        const newUser = new User({ name, email, password });

        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) throw err;

            newUser.password = hash;
            newUser.save()
              .then(user => {
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
          })
        }) // bcrypt
      }) // findOne.then()
});

module.exports = router;
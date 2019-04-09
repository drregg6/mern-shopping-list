const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// bodyParser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.error(error));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
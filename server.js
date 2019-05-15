const express = require('express');
const app = express();
const items = require('./routes/api/items');
const path = require('path');
const mongoose = require('mongoose');
const config = require('config');

// express middleware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.error(error));

// Use Routes
app.use('/api/items', items);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening to port ${port}`));
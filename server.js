const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');
const mongoose = require('mongoose');

// bodyParser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(`mongodb+srv://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@cluster0-4ndmy.mongodb.net/test?retryWrites=true&authSource=admin`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.error(error));

// Use Routes
app.use('/api/items', items);

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
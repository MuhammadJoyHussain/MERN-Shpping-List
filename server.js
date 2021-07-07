const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const items = require('./routes/api/items');

const app = express();


app.use(express.json());

//DB Config
const db = require('./Config/keys').mongoURI;

//Connect to mongo
mongoose.
    connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch(err => console.log(err))
//Use Routes
app.use('/api/items', items);

// Serve Static assests if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`server started on port ${port}`))
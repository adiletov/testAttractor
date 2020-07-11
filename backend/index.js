const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./router/users');
const categories = require('./router/categories');
const images = require('./router/images');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const run  = async () => {
    await mongoose.connect(config.database, config.options);

    app.use('/users', users);
    app.use('/categories', categories);
    app.use('/images', images);

    app.listen(port, () => {
        console.log(`Server start in PORT:${port}`)
    })
};

run().catch(e => console.log(e));
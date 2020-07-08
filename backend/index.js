const express = require('express');
const app = express();
const port = 8080;

const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const users = require('./router/users');

app.use(cors());
app.use(express.json());


const run  = async () => {
    await mongoose.connect(config.database, config.options);

    app.use('/users', users);

    app.listen(port, () => {
        console.log(`Server start in PORT:${port}`)
    })
};

run().catch(e => console.log(e));
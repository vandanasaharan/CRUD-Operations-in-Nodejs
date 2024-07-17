const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongodb');
const userRouter = require('./router');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

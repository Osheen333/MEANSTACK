const  express = require('express');
const instituteRouter = require('./routes/instituteRoutes');

const cors = require('cors');

const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());

// ROUTES

app.use('/api/institutes', instituteRouter);

module.exports = app;
require('dotenv').config();
const express = require('express');
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const cors = require('cors');
const server = express();
const port = 5000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));


server.use(cors());
const authRouter = require('./routes/Auth');
const blogRouter = require('./routes/Blogs')
server.use('/api', authRouter, blogRouter);

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
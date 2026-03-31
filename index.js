const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const db = require('./models');
const {Op, where} = require('sequelize');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


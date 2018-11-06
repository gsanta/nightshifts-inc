const express = require('express');

export const router = express.Router().use('/users', require('./users'));

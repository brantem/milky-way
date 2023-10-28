const path = require('node:path');
const express = require('express');

const server = express();
server.use(express.static(path.resolve(__dirname, '../public')));
server.use(express.static(path.resolve(__dirname, '../dist')));
server.listen(7001, () => console.log(':7001'));

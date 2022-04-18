const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');

app.use(bodyParser.json())

const router = require('./router/fornecedores')
app.use('/api/fornecedores', router)

app.listen(config.get('api.porta'), () => console.log('API rodando na porta 3000'));
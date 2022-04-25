const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');

app.use(bodyParser.json())

const router = require('./router/fornecedores')
app.use('/api/fornecedores', router)

app.use((erro, requisicao, resposta, proximo) => {
    if (erro instanceof NaoEncontrado) {
        resposta.status(404)
    }
    else {
        resposta.status(400)
    }
    resposta.send(
        JSON.stringify({
            mensagem: error.message,
            id: error.idErro
        })
    )
})

app.listen(config.get('api.porta'), () => console.log('API rodando na porta 3000'));
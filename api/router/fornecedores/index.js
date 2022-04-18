const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');

router.use('/', async (requisicao, resposta) => {
    const resultado = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultado)
    )
})

module.exports = router
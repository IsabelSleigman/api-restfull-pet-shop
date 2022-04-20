const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor')

router.get('/', async (requisicao, resposta) => {
    const resultado = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultado)
    )
})

router.post('/', async (requisicao, resposta) => {
    const dadosRecebidos = requisicao.body;
    const fornecedor = new Fornecedor(dadosRecebidos)
    await fornecedor.criar();
    resposta.send(JSON.stringify(fornecedor))
})

module.exports = router
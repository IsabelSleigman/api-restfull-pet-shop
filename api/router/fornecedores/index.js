const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor')

router.get('/', async (requisicao, resposta) => {
    const resultado = await TabelaFornecedor.listar()
    resposta.status(200)
    resposta.send(
        JSON.stringify(resultado)
    )
})

router.get('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.status(200)
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        proximo(error)
    }
})

router.post('/', async (requisicao, resposta, proximo) => {
    try {
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar();
        resposta.status(201)
        resposta.send(JSON.stringify(fornecedor))

    } catch (error) {
        proximo(error)
    }
})

router.put('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.status(204)
        resposta.end()

    } catch (error) {
        proximo(error)
    }
})

router.delete('/:idFornecedor', async (requisicao, resposta, proximo) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.status(204)
        resposta.end()

    } catch (error) {
        proximo(error)
    }
})

module.exports = router
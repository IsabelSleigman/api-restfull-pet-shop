const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor')

router.get('/', async (requisicao, resposta) => {
    const resultado = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resultado)
    )
})
router.get('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (error) {
        resposta.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

router.post('/', async (requisicao, resposta) => {
    try {
        const dadosRecebidos = requisicao.body;
        const fornecedor = new Fornecedor(dadosRecebidos)
        await fornecedor.criar();
        resposta.send(JSON.stringify(fornecedor))

    } catch (error) {
        resposta.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

router.put('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const dadosRecebidos = requisicao.body
        const dados = Object.assign({}, dadosRecebidos, { id: id })
        const fornecedor = new Fornecedor(dados)
        await fornecedor.atualizar()
        resposta.end()

    } catch (error) {
        resposta.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

router.delete('/:idFornecedor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecedor
        const fornecedor = new Fornecedor({ id: id })
        await fornecedor.carregar()
        await fornecedor.remover()
        resposta.end()

    } catch (error) {
        resposta.send(
            JSON.stringify({
                mensagem: error.message
            })
        )
    }
})

module.exports = router
const router = require('express').Router();

router.use('/', (requisicao, resposta) => {

    resposta.send('Ok')
})

module.exports = router
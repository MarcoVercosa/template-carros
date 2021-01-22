const AlteraDadosBD = require("../infraBD/alteraDados")

module.exports = (app) => {

    console.log("MÓDULO DE ROTAS CAREGADO")


    app.post("/cadastraveiculo", (req, res) => {

        const atendimento = req.body
        const resultado = AlteraDadosBD.Cadastra(atendimento, res)
        console.log("Solicitado post de CURIOSIDADES")
        res.json(resultado)

    })

}
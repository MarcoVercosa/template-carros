const express = require("express")
const AlteraDadosBD = require("../infraBD/alteraDados")
const path = require('path')
const multer = require("multer")

//conf MULTER
const storage = multer.diskStorage({
    destination: "./uploads/images",
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Math.floor(Math.random() * 9999999999) + path.extname(file.originalname)
        )
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
}).array("files", 12)


module.exports = (app) => {

    console.log("MÓDULO DE ROTAS CAREGADO")

    //upload de imagens
    app.post("/cadastraimagem", upload, (req, res) => {
        console.log("Solicitado post de IMAGENS")
        // console.log(req.files)
        //PRECISSA TRATAR ERROS
        console.log("IMAGENS RECEBIDAS")
        console.log(req.files)
        res.json(req.files)
    })

    //cadastra anuncio no BD

    app.post("/cadastraveiculo", (req, res) => {
        console.log("Solicitado post de DADOS")
        // console.log(req.body)
        const atendimento = req.body
        const resultado = AlteraDadosBD.Cadastra(atendimento, res)

        // res.json(req.body)
    })


    app.get("/buscacarro/:id", (req, res) => {
        console.log("Busca dados para editar")
        // console.log(req.params)
        const resultado = AlteraDadosBD.BuscaParaAlterar(req.params.id, res)
    })

    app.post("/atualizacarro", (req, res) => {

        console.log("UPDATE de dados no BD solicitado.")
        const resultado = AlteraDadosBD.AtualizaBDDados(req.body.dados, req.body.idDaBusca, res)
        // console.log(req.body)
    })


    //deixa a pasta upload das imagens online
    app.use("/static", express.static("./uploads/images"))



}

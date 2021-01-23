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
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 },
}).array("files", 12)


module.exports = (app) => {

    // const storage = multer.diskStorage({
    //     destination: "./public/uploads/",
    //     filename: function (req, file, cb) {
    //         cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    //     }
    // });



    console.log("MÓDULO DE ROTAS CAREGADO")


    app.post("/cadastraimagem", upload, (req, res) => {
        console.log("Solicitado post de IMAGENS")
        // console.log(req.files)
        //PRECISSA TRATAR ERROS
        res.json(req.files)

    })

    app.post("/cadastraveiculo", (req, res) => {

        console.log(req.body)
        const atendimento = req.body
        const resultado = AlteraDadosBD.Cadastra(atendimento, res)
        console.log("Solicitado post de DADOS")
        res.json(req.body)
    })

    app.use("/static", express.static("./uploads/images"))
    //deixa a pasta upload online



    // app.post("/teste", (req, res) => {
    //     console.log("Teste")
    //     console.log(req.body)
    //     // const atendimento = req.body
    //     // const resultado = AlteraDadosBD.Cadastra(atendimento, res)
    //     // console.log("Solicitado post de CURIOSIDADES")
    //     res.json(req.body)

    // })

}
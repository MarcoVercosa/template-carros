const express = require("express")
const AlteraDadosBD = require("../infraBD/alteraDados") //importa class para alteração no BD
const path = require('path') //lib que gerencia extenções de arquivos. Usado no Multer
const multer = require("multer") // upload de imagens
const fs = require("fs") //gerenciamento de arquivos no disco


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
        //PRECISA TRATAR ERROS
        console.log("IMAGENS RECEBIDAS")
        console.log(req.files)
        res.json(req.files)
    })

    app.post("/deletaimagens", (req, res) => {
        //deleta imagens do storage
        console.log("Solicitado remocao de imagem" + req.body)
        console.log(req.body.dados)
        for (var i = 0; i < req.body.dados.length; i++) {
            var erro = false
            var sucesso = false

            fs.unlink(`./uploads/images/${req.body.dados[i]}`, function (err) {
                if (err) {
                    erro = err
                } else {
                    sucesso = "Imagens deletadas com sucesso."
                }
            })
        }

        if (erro) {
            res.json(erro)
        } else {
            res.json(sucesso)
        }
    })


    //cadastra anuncio no BD

    app.post("/cadastraveiculo", (req, res) => {

        console.log("Solicitado post de DADOS")
        // console.log(req.body)
        const atendimento = req.body
        const resultado = AlteraDadosBD.Cadastra(atendimento, res)

        // res.json(req.body)
    })

    //Busca anuncio com o número do ID do BD
    app.get("/buscacarro/:id", (req, res) => {

        console.log("Busca dados para editar")
        // console.log(req.params)
        const resultado = AlteraDadosBD.BuscaParaAlterar(req.params.id, res)
    })

    //atualiza as info do carro
    app.post("/atualizacarro", (req, res) => {

        console.log("UPDATE de dados no BD solicitado.")
        const resultado = AlteraDadosBD.AtualizaBDDados(req.body.dados, req.body.idDaBusca, res)
        // console.log(req.body.dados)
    })

    //deleta anuncio
    app.get("/deletaanunciobd/:id", (req, res) => {
        console.log("Solicitado apagar anuncio BD")
        const resultado = (AlteraDadosBD.DeletaAnuncioBD(req.params.id, res))
    })

    app.get("/listaranuncios", (req, res) => {

        console.log("Solicitado listar todos anuncios")
        const resultado = (AlteraDadosBD.ListarAnuncios(res))
    })


    //deixa a pasta upload das imagens online
    app.use("/static", express.static("./uploads/images"))

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                                                          //
    //                 PAINEL CONFIGURACAO SITE                 //
    //                                                          //
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    app.get("/buscainfosite", (req, res) => {

        console.log("Solicitado informaçoes do site")
        const resultado = (AlteraDadosBD.GetInfoSite(req.params.id, res))

    })

    app.post("/gravainfosite", (req, res) => {

        console.log("Solicitado GRAVAÇÃO de informaçoes do site")
        // console.log(req.body.dados)
        const resultado = AlteraDadosBD.GravaInfoSite(req.body.dados, res)

    })


    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                                                          //
    //                 FORNECE INFORMAÇÕES AO SITE              //
    //                                                          //
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    app.get("/contato", (req, res) => {
        console.log("CONTATO para HOME")
        const resultado = AlteraDadosBD.Contato(res)
    })

    app.get("/imagensslideprincipal", (req, res) => {
        console.log("SOLICITADO IMAGENS SLIDE PRINCIPAL")
        const resultado = AlteraDadosBD.ImagensSlidePrincipal(res)
    })

    app.get("/destaqueshome", (req, res) => {
        console.log("SOLICITADO DESTAQUES HOME")
        const resultado = AlteraDadosBD.DestaquesHome(res)
    })

    app.get("/footer", (req, res) => {
        console.log("FOOTER para HOME")
        const resultado = AlteraDadosBD.Footer(res)
    })
    app.get("/estoque", (req, res) => {
        console.log("Solicitado ESTOQUE")
        const resultado = AlteraDadosBD.Estoque(res)
    })

    app.get("/filtroestoque", (req, res) => {
        console.log("Solicitado dados para FILTRO ESTOQUE")
        const resultado = AlteraDadosBD.FiltroEstoque(res)
    })
    app.post("/buscaestoquecomfilter", (req, res) => {
        console.log("Solicitado dados ESTOQUE com filtro de pesquisa")
        console.log(req.body)
        const formater = new Intl.NumberFormat("pt-BR")
        var anoAtual = new Date().getFullYear()
        const dados = {
            marca: req.body.dados.marca === "false" || !req.body.dados.marca ? "" : String(req.body.dados.marca),
            valor: req.body.dados.valor === "false" || !req.body.dados.valor ? 0 : formater.format(parseFloat(req.body.dados.valor)),
            ano: req.body.dados.ano === "false" || !req.body.dados.ano ? anoAtual : Number(req.body.dados.ano),
            cambio: req.body.dados.cambio === "false" || !req.body.dados.cambio ? "" : String(req.body.dados.cambio),
            combustivel: req.body.dados.combustivel === "false" || !req.body.dados.combustivel ? "" : String(req.body.dados.combustivel),
            blindado: Blindado(req.body.dados.blindado)
        }

        function Blindado(dados) {
            if (dados === "todos") { return "" }
            if (dados === "true") { return true }
            else { return false }
        }

        console.log(dados)
        const resultado = AlteraDadosBD.FiltroEstoqueComFiltro(dados, res)
    })

}

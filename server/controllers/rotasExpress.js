const express = require("express")
const AlteraDadosBD = require("../infraBD/alteraDados") //importa class para alteração no BD
const path = require('path') //lib que gerencia extenções de arquivos. Usado no Multer
const multer = require("multer") // upload de imagens
const nodemailer = require("nodemailer")
const fs = require("fs") //gerenciamento de arquivos no disco
const jwt = require("jsonwebtoken") //sistema de autenticação

const SECRET = "deusepoder"


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

    //////////////////////////////////////////////////////////////
    //                 AUTENTICAÇÃO PAINEL ADMINISTRATIVO       //
    //////////////////////////////////////////////////////////////


    // Function Midlleware para acesso a API. Verifica se o pedido ja está autenticado (se ja há token)
    function VerifyAutenticationMidlleware(req, res, next) {
        const token = req.headers["x-accsess-token"]

        jwt.verify(token, SECRET, (err, decoded) => {//compara o token com o SECRET, err = erro, decoded = token decodificado
            if (err) {
                console.log("TOKEN EXPIRADO")
                return res.json({ token: "expired" }) //se a comparação der erro, finalize com o erro
            }
            // console.log(decoded.userId)
            req.userId = decoded.userId // se sucesso, decodifique o userid e armazene no cabeçalho
            next() //fim do middleware, prossiga com a função
        })
    }

    // LOGIN PAINEL
    app.post("/login", (req, res) => {
        console.log("Solicitado TOKEN para logar no painel")
        console.log(req.body)


        const GeraToken = async (user, pass) => {

            try {
                console.log("iniciado func express")
                const resultado = await AlteraDadosBD.LoginPainel(user, pass)
                if (resultado.length > 0) {
                    const token = jwt.sign({ userId: resultado[0].id }, SECRET, { expiresIn: 1800 })
                    res.json({ auth: true, token, primeiroNome: resultado[0].primeiroNome, ultimoNome: resultado[0].ultimoNome })
                } else {
                    // res.status(401).end()
                    res.json({ auth: false, mensagem: "Usuário ou senha incorretos" })
                }

            }
            catch (e) { console.log("Ocorreu um erro:" + e) }
        }

        GeraToken(req.body.user, req.body.password)
    })

    //verifica se o token ainda é valido para abertura de página FRONTEND. OBS: o TOKEN para front e API é o mesmo
    app.get("/validatokenpainel", (req, res) => {
        console.log("SOLICITADO VALIDAÇÃO DE TOKEN")
        const token = req.headers["x-accsess-token"]
        jwt.verify(token, SECRET, (err, decoded) => {//compara o token com o SECRET, err = erro, decoded = token decodificado
            if (err) {
                console.log("TOKEN EXPIRADO")
                return res.json(false)
            } else //se a comparação der erro, finalize com o erro
                // console.log(decoded.userId)
                res.json(true)

        })
    })

    //////////////////////////////////////////////////////////////
    //             FIM =>  AUTENTICAÇÃO PAINEL ADMINISTRATIVO     
    //////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                                                          //
    //                 PAINEL ADMINISTRATIVO                    //
    //                                                          //
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////


    //upload de imagens
    app.post("/cadastraimagem", VerifyAutenticationMidlleware, upload, (req, res) => {
        console.log("Solicitado post de IMAGENS")
        // console.log(req.files)
        //PRECISA TRATAR ERROS
        console.log("IMAGENS RECEBIDAS")
        console.log(req.files)
        res.json(req.files)
    })

    app.post("/deletaimagens", VerifyAutenticationMidlleware, (req, res) => {
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


    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                                                          //
    //                 PAINEL ADMINISTRATIVO                    //
    //                                                          //
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    //cadastra anuncio no BD
    app.post("/cadastraveiculo", VerifyAutenticationMidlleware, (req, res) => {

        console.log("Solicitado post de DADOS")
        // console.log(req.body)
        const atendimento = req.body
        const resultado = AlteraDadosBD.Cadastra(atendimento, res)

        // res.json(req.body)
    })

    //Busca anuncio com o número do ID do BD
    app.get("/buscacarro/:id", VerifyAutenticationMidlleware, (req, res) => {

        console.log("Busca dados para editar")
        // console.log(req.params)
        const resultado = AlteraDadosBD.BuscaParaAlterar(req.params.id, res)
    })

    //atualiza as info do carro
    app.post("/atualizacarro", VerifyAutenticationMidlleware, (req, res) => {

        console.log("UPDATE de dados no BD solicitado.")
        const resultado = AlteraDadosBD.AtualizaBDDados(req.body.dados, req.body.idDaBusca, res)
        // console.log(req.body.dados)
    })

    //deleta anuncio
    app.get("/deletaanunciobd/:id", VerifyAutenticationMidlleware, (req, res) => {
        console.log("Solicitado apagar anuncio BD")
        const resultado = (AlteraDadosBD.DeletaAnuncioBD(req.params.id, res))
    })

    app.get("/listaranuncios", VerifyAutenticationMidlleware, (req, res) => {

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

    app.get("/buscainfosite", VerifyAutenticationMidlleware, (req, res) => {//BUSCA AS CONF DO SITE PARA O PAINEL
        console.log("Solicitado informaçoes do site")
        const resultado = (AlteraDadosBD.GetInfoSite(req.params.id, res))
    })

    app.post("/gravainfosite", VerifyAutenticationMidlleware, (req, res) => {//GRAVA AS INFO CAS CONF DO SITE NO PAINEL
        console.log("Solicitado GRAVAÇÃO de informaçoes do site")
        // console.log(req.body.dados)
        const resultado = AlteraDadosBD.GravaInfoSite(req.body.dados, res)
    })

    /////////////////////////////////////////////////////////////////

    //               FIM PAINEL ADMINISTRATIVO

    /////////////////////////////////////////////////////////////////



    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                                                          //
    //                 FORNECE INFORMAÇÕES AO SITE              //
    //                                                          //
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////

    app.get("/contato", (req, res) => { //INFOS PARA O COMPONENTE MENU
        console.log("CONTATO para HOME")
        const resultado = AlteraDadosBD.Contato(res)
    })

    app.get("/imagensslideprincipal", (req, res) => {//IMAGENS DO CARROSEL PRINCIPAL
        console.log("SOLICITADO IMAGENS SLIDE PRINCIPAL")
        const resultado = AlteraDadosBD.ImagensSlidePrincipal(res)
    })
    app.get("/footer", (req, res) => {//INFORMAÇÕES RODAPÉ
        console.log("FOOTER para HOME")
        const resultado = AlteraDadosBD.Footer(res)
    })

    app.get("/destaqueshome", (req, res) => { //TODOS OS CARROS CADASTRADOS COMO DESTAQUES
        console.log("SOLICITADO DESTAQUES HOME")
        const resultado = AlteraDadosBD.DestaquesHome(res)
    })


    app.get("/estoque", (req, res) => {//TODOS CARROS
        console.log("Solicitado ESTOQUE")
        const resultado = AlteraDadosBD.Estoque(res)
    })

    app.get("/filtroestoque", (req, res) => {// FORNECE OS DADOS PARA MONSTAGEM DOS CAMPOS FILTRO ESTOQUE
        console.log("Solicitado dados para FILTRO ESTOQUE")
        const resultado = AlteraDadosBD.FiltroEstoque(res)
    })
    app.post("/buscaestoquecomfilter", (req, res) => {//BUSCA DADOS CONFORME FILTRO
        console.log("Solicitado dados ESTOQUE com filtro de pesquisa")
        console.log(req.body)
        const formater = new Intl.NumberFormat("pt-BR")
        var anoAtual = new Date().getFullYear()
        const dados = {
            marca: !req.body.dados.marca || req.body.dados.marca === "false" ? "" : String(req.body.dados.marca),
            valor: !req.body.dados.valor || req.body.dados.valor === "false" ? 0 : parseFloat(req.body.dados.valor),
            ano: !req.body.dados.ano || req.body.dados.ano === "false" ? anoAtual : Number(req.body.dados.ano),
            cambio: !req.body.dados.cambio || req.body.dados.cambio === "false" ? "" : String(req.body.dados.cambio),
            combustivel: !req.body.dados.combustivel || req.body.dados.combustivel === "false" ? "" : String(req.body.dados.combustivel),
            blindado: Blindado(req.body.dados.blindado)
        }
        function Blindado(dados) {
            if (dados === "todos") { return "" }
            if (dados === "true") { return 1 }
            else { return 0 }
        }
        console.log(dados)
        const resultado = AlteraDadosBD.FiltroEstoqueComFiltro(dados, res)
    })

    app.get("/estoque:idanuncio", (req, res) => {//DIRECIONADO PELOS ANUNCIOS, ONDE RECEBE O ID PARA TRAZER DETALHES
        console.log("Solicitado Detalhes de anuncio")
        AlteraDadosBD.BuscaDetalhesAnuncio(req.params.idanuncio, res)
        // res.json(req.params.idanuncio)
    })
    app.get("/campopesquisaestoque:key", (req, res) => { //RECEBE  NA URL O NOME/MODELO PARA PESQUISA VIA OS CAMPOS PESQUISA NO MENU E DESTAQUE
        console.log("Solicitado busca anúncio por nome")
        AlteraDadosBD.BuscaPesquisaPorNome(req.params.key, res)
        // res.json(req.params.idanuncio)
    })

    //############################################################################################
    // #                                    ENVIO E-MAIL                  # 
    // ##########################################################################################
    app.post("/sendemail", (req, res) => { //ENVIO DE EMAIL SOLICITADO NAS PÁGINAS
        console.log("Envio de e-mail TENHO INTERESSE BackEnd")
        console.log(req.body.dados)
        const user = "marco2007sky@hotmail.com"
        const pass = "MOdeld4166"

        async function SendEmail() {
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user,
                    pass
                }
            })

            let enviaEmail = await transporter.sendMail({
                from: user,
                to: "marco2011sky@gmail.com",
                subject: `${req.body.dados.assunto}`,
                text: `NOME: ${req.body.dados.nome} \n E-MAIL: ${req.body.dados.email} \n 
                DDD: ${req.body.dados.ddd} \n TELEFONE: ${req.body.dados.telefone} \n
                DDD: ${req.body.dados.dddCel} \n CELULAR: ${req.body.dados.telefoneCel} \n
                
                RETORNO: \n
                WhatsApp: ${req.body.dados.whatsappRetorno ? "SIM" : "NÃO"} \n
                E-Mail: ${req.body.dados.emailRetorno ? "SIM" : "NÃO"} \n
                Telefone: ${req.body.dados.telefoneRetorno ? "SIM" : "NÃO"} \n
                \n MENSAGEM: ${req.body.dados.mensagem} \n 
                ID ANÚNCIO: ${req.body.dados.idAnuncio}`

            })
            console.log("Message ID sent: %s", enviaEmail.messageId);
        }
        SendEmail().catch(console.log)
    })
    app.post("/sendemailvender", (req, res) => {//envio de emai solicitado ao cliente querer vender carro
        console.log("Envio de e-mail VENDER BackEnd")
        console.log(req.body.dados)
        const user = "marco2007sky@hotmail.com"
        const pass = "MOdeld4166"

        async function SendEmail() {
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user,
                    pass
                }
            })

            let enviaEmail = await transporter.sendMail({
                from: user,
                to: "marco2011sky@gmail.com",
                subject: `${req.body.dados.assunto}`,
                text:
                    `
                    NOME: ${req.body.dados.nome} \n E-MAIL: ${req.body.dados.email} \n 
                    DDD: ${req.body.dados.ddd} \n TELEFONE: ${req.body.dados.telefone} \n
                    DDD: ${req.body.dados.dddCel} \n CELULAR: ${req.body.dados.telefoneCel} \n
                    
                    RETORNO: \n
                    WhatsApp: ${req.body.dados.whatsappRetorno ? "SIM" : "NÃO"} \n
                    E-Mail: ${req.body.dados.emailRetorno ? "SIM" : "NÃO"} \n
                    Telefone: ${req.body.dados.telefoneRetorno ? "SIM" : "NÃO"} \n
                    \n \n
                    Marca: ${req.body.dados.marca} \n
                    Modelo: ${req.body.dados.modelo} \n
                    Ano Modelo: ${req.body.dados.anoModelo} \n
                    cor: ${req.body.dados.cor} \n
                    Kilômetros: ${req.body.dados.kilometro} \n
                    Primeiro proprietário: ${req.body.dados.primeiroProprietario ? "SIM" : "NÃO"} \n
                    Possui seguro: ${req.body.dados.seguro ? "SIM" : "NÃO"} \n
                    Sinistro: ${req.body.dados.sinistro ? "SIM" : "NÃO"} \n
                    Valor Aproximado: ${req.body.dados.valorAproximado} \n
                    OBSERVAÇÃO: ${req.body.dados.observacao} \n 
                `
            })
            console.log("Message ID sent: %s", enviaEmail.messageId);
        }
        SendEmail().catch(console.log)
    })

    //envio de email esqueceu senha página login
    app.get("/sendemailforgetpassword:email", (req, res) => {
        console.log("Envio de e-mail RESET SENHA PAINEL")
        var Busca = async () => {
            try {
                const resultado = await AlteraDadosBD.ForgetPasswordPainel(req.params.email, res)
                if (resultado.length < 1) {
                    res.json("Email não encontrado. Contate seu administrador")
                } else {
                    console.log("email encontrado : " + resultado[0].email)
                    SendEmail(resultado[0].email).catch(console.log)
                    res.json("Senha alterada com sucesso. Check seu email em alguns minutos")
                }
            }
            catch (e) {
                console.log("ERRO: " + e)
            }
        }
        Busca()

        async function SendEmail(email) {
            const user = "marco2007sky@hotmail.com"
            const pass = "MOdeld4166"
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user,
                    pass
                }
            })

            let enviaEmail = await transporter.sendMail({
                from: user,
                to: email,
                subject: "SOLICITAÇÃO DE TROCA DE SENHA",
                text: `SENHA ALTERADA COM SUCESO PARA O USUÁRIO ${req.params.email} \n
                NOVA SENHA: lojacarro@123 \n
                \n
                É FORTEMENTE RECOMENDÁVEL A TROCA SENHA PARA UMA OUTRA PESSOAL. \n
                UTILIZE SENHAS FORTES, POSUINDO LETRAS MAIÚSCULAS, MINÚSCULAS,\n
                NÚMEROS E CARACTERES ESPECIAIS ! \n 
                `

            })
            console.log("Message ID sent: %s", enviaEmail.messageId);
        }
    })

    //############################################################################################
    // #                      F I M              ENVIO E-MAIL                  # 
    // ##########################################################################################


    app.get("/blindados", (req, res) => {
        console.log("Solicitado estoque BLINDADOS")
        AlteraDadosBD.BuscaEstoqueBlindados(res)
    })
    app.get("/novos", (req, res) => {
        console.log("Solicitado estoque NOVOS")
        AlteraDadosBD.BuscaEstoqueNovos(res)
    })

}

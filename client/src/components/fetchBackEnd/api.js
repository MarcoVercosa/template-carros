import axios from "axios"
// const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
// const token = temp.tk



export default class BuscaBD {


    //##########################################
    //              LOGIN - PAINEL
    //##########################################


    //login painel
    async LoginPainel(dados) {
        const resultado = await axios.post("http://192.168.0.150:9000/login",
            dados
        )
        console.log(resultado)
        return resultado
    }

    //verifica se o token ainda é valido para abertura página
    async ValidaTokenPainel() {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        const resultado = await axios.get(`http://192.168.0.150:9000/validatokenpainel`,
            {
                headers: { 'x-accsess-token': token }
            }
        )
        console.log(resultado)
        return resultado
    }

    //Esqueceu senha. Página Login
    async ForgetPassword(dados) {
        const resultado = await axios.get(`http://192.168.0.150:9000/sendemailforgetpassword${dados}`)
        console.log("Solicitado Forget Password")
        return resultado
    }


    //busca infos sobre profile para confs do user
    async InfoProfile(codigo) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        const resultado = await axios.get(`http://192.168.0.150:9000/infoprofile${codigo}`,
            {
                headers: { 'x-accsess-token': token }
            }
        )
        return resultado
    }

    //troca a senha ou nome/sobrenome via conf do profile
    async ChangeDataOrPassordProfile(tipo, dados) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        if (tipo === "nomeSobrenome") {
            const resultado = await axios.post(`http://192.168.0.150:9000/changedataprofile`,
                {
                    dados
                },
                {
                    headers: { 'x-accsess-token': token }
                }
            )
            return resultado
        } else {
            const resultado = await axios.post(`http://192.168.0.150:9000/changepasswordprofile`,
                {
                    dados
                },
                {
                    headers: { 'x-accsess-token': token }
                }
            )
            return resultado
        }

    }


    //##########################################
    //              ADM PAINEL ADMINISTRATIVO
    //##########################################

    //upload de imagens 
    async CadastraImagemMulter(imagens) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        const resultado = await axios.post("http://192.168.0.150:9000/cadastraimagem",
            imagens,
            {
                headers: { 'x-accsess-token': token }
            }

        )
        console.log(resultado)
        return resultado
    }
    //cadastra dados no BD
    async CadastraDadosBD(dados) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        const resultado = await axios.post("http://192.168.0.150:9000/cadastraveiculo",
            dados,
            {
                headers: { 'x-accsess-token': token }
            }

        )
        console.log(resultado)
        return resultado
    }
    //busca infos para alteração do anuncio
    async BuscaBDGetDados(dados) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk

        const resultado = await axios.get(`http://192.168.0.150:9000/buscacarro/${dados}`,
            {
                headers: { 'x-accsess-token': token }
            }
        )
        console.log(resultado)
        return resultado
    }

    //envia os dados para atualização de anuncio ja criado
    async AtualizaBDDados(dados, idDaBusca) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk

        const resultado = await axios.post("http://192.168.0.150:9000/atualizacarro", {
            dados, //array dos dados
            idDaBusca
        },//id no bd da linha que será alterada
            {
                headers: { 'x-accsess-token': token }
            }
        )
        console.log(resultado)
        return resultado
    }

    async DeletaImagem(dados) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        console.log("API solicitada para remoção de imagem")
        const resultado = await axios.post("http://192.168.0.150:9000/deletaimagens",
            {
                dados
            },
            {
                headers: { 'x-accsess-token': token }
            }
        )
        console.log(resultado)
        return resultado
    }

    async DeletaAnuncioBD(idPesquisa) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk

        console.log("API solicitada para remoção de anuncio no BD")
        const resultado = await axios.get(`http://192.168.0.150:9000/deletaanunciobd/${idPesquisa}`,
            {
                headers: { 'x-accsess-token': token }
            }
        )
        return resultado
    }
    async ListarAnuncios(idPesquisa) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk

        console.log("API solicitada para listar os anuncios no BD")
        const resultado = await axios.get("http://192.168.0.150:9000/listaranuncios",
            {
                headers: { 'x-accsess-token': token }
            }
        )
        return resultado
    }

    //////////////////////////////////////////////////////////////
    //                  PAINEL CONFIGURACAO SITE                //
    //////////////////////////////////////////////////////////////

    async GravaInfoSite(dados) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        console.log("API solicitada para gravação de informações do site no BD")
        const resultado = await axios.post(`http://192.168.0.150:9000/gravainfosite`, {
            dados
        },
            {
                headers: { 'x-accsess-token': token }
            }
        )
        console.log(resultado)
        return resultado
    }

    async GetInfoSite(idPesquisa) {
        const temp = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        const token = temp.tk
        console.log("API solicitada para requisição de informações do site")
        const resultado = await axios.get(`http://192.168.0.150:9000/buscainfosite`,
            {
                headers: { 'x-accsess-token': token }
            }
        )
        // console.log(resultado)
        return resultado
    }


    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                 FORNECE INFORMAÇÕES AO SITE              //
    //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    async Contato() {//get contatos home
        console.log("API solicitada CONTATO")
        const resultado = await axios.get("http://192.168.0.150:9000/contato")
        return resultado
    }

    async ImagensSlidePrincipal() {//get imagens slide principal HOME
        console.log("API solicitada busca imagens slide principal")
        const resultado = await axios.get("http://192.168.0.150:9000/imagensslideprincipal")
        return resultado
    }

    async BuscaDestaque() {//get destaques home
        console.log("API solicitada busca DESTAQUES HOME")
        const resultado = await axios.get("http://192.168.0.150:9000/destaqueshome")
        return resultado
    }

    async Footer() {//get rodapé home
        console.log("API solicitada FOOTER")
        const resultado = await axios.get("http://192.168.0.150:9000/footer")
        return resultado
    }

    async Estoque() {
        console.log("API solicitada ESTOQUE")
        const resultado = await axios.get("http://192.168.0.150:9000/estoque")
        return resultado
    }
    async CampoPesquisa(dados) {
        console.log("API solicitada Campo Pesquisa")
        const resultado = await axios.get(`http://192.168.0.150:9000/campopesquisaestoque${dados}`)
        return resultado
    }

    async FiltroEstoque() {
        console.log("API solicitada Filtro estoque")
        const resultado = await axios.get("http://192.168.0.150:9000/filtroestoque")
        return resultado
    }
    async FiltroEstoqueComFilter(dados) {
        console.log("API solicitada pesquisa de estoque com Filtro")
        const resultado = await axios.post("http://192.168.0.150:9000/buscaestoquecomfilter", {
            dados
        })
        return resultado
    }

    async BuscaDetalheAnuncio(id) {
        console.log("API solicitada para buscar detalhes de anuncio")
        const resultado = await axios.get(`http://192.168.0.150:9000/estoque${id}`)
        return resultado
    }
    async SendEmail(dados) {
        console.log("API solicitada para envio de email")
        const resultado = await axios.post("http://192.168.0.150:9000/sendemail", {
            dados
        })
        return resultado
    }
    async BuscaEstoqueBlindados(id) {
        console.log("API solicitada para buscar Blindados")
        const resultado = await axios.get(`http://192.168.0.150:9000/blindados`)
        return resultado
    }
    async BuscaEstoqueNovos(id) {
        console.log("API solicitada para buscar Novos")
        const resultado = await axios.get(`http://192.168.0.150:9000/novos`)
        return resultado
    }
    async SendEmailVender(dados) {
        console.log("API solicitada para envio de email VENDER")
        const resultado = await axios.post("http://192.168.0.150:9000/sendemailvender", {
            dados
        })
        return resultado
    }



}


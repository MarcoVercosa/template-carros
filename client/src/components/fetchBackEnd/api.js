import axios from "axios"

export default class BuscaBD {

    //upload de imagens 
    async CadastraImagemMulter(imagens) {
        const resultado = await axios.post("http://192.168.0.150:9000/cadastraimagem",
            imagens
        )
        console.log(resultado)
        return resultado
    }
    //cadastra dados no BD
    async CadastraDadosBD(dados) {
        const resultado = await axios.post("http://192.168.0.150:9000/cadastraveiculo",
            dados
        )
        console.log(resultado)
        return resultado
    }
    //busca infos para alteração do anuncio
    async BuscaBDGetDados(dados) {
        const resultado = await axios.get(`http://192.168.0.150:9000/buscacarro/${dados}`,
        )
        console.log(resultado)
        return resultado
    }

    //envia os dados para atualização de anuncio ja criado
    async AtualizaBDDados(dados, idDaBusca) {

        const resultado = await axios.post("http://192.168.0.150:9000/atualizacarro", {
            dados, //array dos dados
            idDaBusca //id no bd da linha que será alterada
        })
        console.log(resultado)
        return resultado
    }

    async DeletaImagem(dados) {
        console.log("API solicitada para remoção de imagem")
        const resultado = await axios.post("http://192.168.0.150:9000/deletaimagens",
            {
                dados
            })
        console.log(resultado)
        return resultado
    }

    async DeletaAnuncioBD(idPesquisa) {

        console.log("API solicitada para remoção de anuncio no BD")
        const resultado = await axios.get(`http://192.168.0.150:9000/deletaanunciobd/${idPesquisa}`)
        return resultado
    }
    async ListarAnuncios(idPesquisa) {

        console.log("API solicitada para remoção de anuncio no BD")
        const resultado = await axios.get("http://192.168.0.150:9000/listaranuncios")
        return resultado
    }

    //////////////////////////////////////////////////////////////
    //                  PAINEL CONFIGURACAO SITE                //
    //////////////////////////////////////////////////////////////

    async GravaInfoSite(dados) {
        console.log("API solicitada para gravação de informações do site no BD")
        const resultado = await axios.post(`http://192.168.0.150:9000/gravainfosite`, {
            dados
        })
        console.log(resultado)
        return resultado
    }

    async GetInfoSite(idPesquisa) {
        console.log("API solicitada para requisição de informações do site")
        const resultado = await axios.get(`http://192.168.0.150:9000/buscainfosite`)
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


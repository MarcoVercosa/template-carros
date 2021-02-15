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

    async GetInfoSite(idPesquisa) {
        console.log("API solicitada para requisição de informações do site")
        const resultado = await axios.get(`http://192.168.0.150:9000/buscainfosite`)
        // console.log(resultado)
        return resultado
    }
    async GravaInfoSite(dados) {
        console.log("API solicitada para gravação de informações do site no BD")
        const resultado = await axios.post(`http://192.168.0.150:9000/gravainfosite`, {
            dados
        })
        console.log(resultado)
        return resultado
    }

    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                 FORNECE INFORMAÇÕES AO SITE              //
    //////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    async ImagensSlidePrincipal() {
        console.log("API solicitada busca imagens slide principal")
        const resultado = await axios.get("http://192.168.0.150:9000/imagensslideprincipal")
        return resultado
    }

}


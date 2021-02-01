import axios from "axios"

export default class BuscaBD {

    //upload de imagens 
    async CadastraImagemMulter(imagens) {
        const resultado = await axios.post("http://localhost:9000/cadastraimagem",
            imagens
        )
        console.log(resultado)
        return resultado
    }
    //cadastra dados no BD
    async CadastraDadosBD(dados) {
        const resultado = await axios.post("http://localhost:9000/cadastraveiculo",
            dados
        )
        console.log(resultado)
        return resultado
    }
    //busca infos para alteração do anuncio
    async BuscaBDGetDados(dados) {
        const resultado = await axios.get(`http://localhost:9000/buscacarro/${dados}`,
        )
        console.log(resultado)
        return resultado
    }

    //envia os dados para atualização de anuncio ja criado
    async AtualizaBDDados(dados, idDaBusca) {

        const resultado = await axios.post("http://localhost:9000/atualizacarro", {
            dados, //array dos dados
            idDaBusca //id no bd da linha que será alterada
        })
        console.log(resultado)
        return resultado
    }

    async DeletaImagem(dados) {
        console.log("API solicitada para remoção de imagem")
        const resultado = await axios.post("http://localhost:9000/deletaimagens",
            {
                dados
            })
        console.log(resultado)
        return resultado
    }

}


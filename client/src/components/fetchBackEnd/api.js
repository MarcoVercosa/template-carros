import axios from "axios"

export default class BuscaBD {

    //upload de imagens 
    async BuscaBDPostImagem(imagens) {
        const resultado = await axios.post("http://localhost:9000/cadastraimagem",
            imagens
        )
        return resultado
    }
    //cadastra dados no BD
    async BuscaBDPostDados(dados) {
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

    async AtualizaBDDados(dados, idDaBusca) {
        console.log(dados)
        const resultado = await axios.post("http://localhost:9000/atualizacarro", {
            dados,
            idDaBusca
        }
        )
        return resultado
    }


}


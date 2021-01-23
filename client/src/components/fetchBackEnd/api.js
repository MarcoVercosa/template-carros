import axios from "axios"

export default class BuscaBD {

    async BuscaBDPostImagem(imagens) {
        const resultado = await axios.post("http://localhost:9000/cadastraimagem",
            imagens
        )
        return resultado
    }

    async BuscaBDPostDados(dados) {
        const resultado = await axios.post("http://localhost:9000/cadastraveiculo",
            dados
        )
        return resultado
    }


}


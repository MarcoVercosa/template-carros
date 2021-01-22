import axios from "axios"

export default class BuscaBD {

    async BuscaBDPostAnuncio(dados) {
        const resultado = await axios.post("http://localhost:9000/cadastraveiculo", {
            dados
        }
        )
        console.log(resultado)
        return resultado
    }


}


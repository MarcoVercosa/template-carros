const conectaBD = require("./conexao")

class AlteraDadosBD {

    //Cadastra novo anuncio
    Cadastra(atendimento, res) {
        console.log(atendimento)
        const sql = `INSERT INTO carros SET ?`
        conectaBD.query(sql, atendimento, (erro, resultado) => {

            if (erro) {
                console.log(erro)
            } else {
                return resultado
            }
        })
    }

    //Busca dados para alterar anúncio
    BuscaParaAlterar(atendimento, res) {
        const sql = `SELECT * FROM vendaCarro.carros WHERE id=${atendimento}`
        conectaBD.query(sql, (erro, resultado) => {
            if (erro) {
                res.json("OCORREU UM ERRO AO BUSCAR DADOS PARA EDITAR ANÚNCIO: " + erro)
            } else {
                // console.log(resultado)
                res.json(resultado)
            }
        })
    }

}
module.exports = new AlteraDadosBD
const conectaBD = require("./conexao")

class AlteraDadosBD {

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

}
module.exports = new AlteraDadosBD
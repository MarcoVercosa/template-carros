const conectaBD = require("./conexao")

class AlteraDadosBD {

    //Cadastra novo anuncio
    Cadastra(atendimento, res) {
        console.log(atendimento)
        const sql = `INSERT INTO carros SET ?`
        conectaBD.query(sql, atendimento, (erro, resultado) => {

            if (erro) {
                // console.log("Ocorreu o seguinte erro ao cadastrar o anúncio" + erro)
                res.json("Ocorreu o seguinte erro ao cadastrar o anúncio" + erro)
            } else {
                let mensagem = "Cadastro executado com sucesso."
                res.json({ mensagem, resultado })
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

    //Atualizada o anúncio no BD
    AtualizaBDDados(atendimento, idDaBusca, res) {

        const sql = `UPDATE carros SET ? WHERE id=${idDaBusca}`
        conectaBD.query(sql, atendimento, (erro, resultado) => {

            if (erro) {
                res.json("OCORREU UM ERRO AO ATUALIZAR ANÚNCIO: " + erro)
            } else {
                res.json("DADOS ALTERADOS COM SUCESSO. ")
            }
        })
    }

    //deleta anuncio no BD
    DeletaAnuncioBD(idPesquisa, res) {

        const sql = `DELETE FROM vendaCarro.carros WHERE id=${idPesquisa}`
        conectaBD.query(sql, (erro, resultado) => {

            if (erro) {
                res.json("OCORREU UM ERRO AO DELETAR ANÚNCIO: " + erro)
            } else {
                console.log(resultado)
                res.json(resultado)
                // res.json("DADOS REMOVIDOS COM SUCESSO." + resultado)
            }
        })
    }

    ListarAnuncios(res) {

        const sql = `SELECT * FROM vendaCarro.carros`
        conectaBD.query(sql, (erro, resultado) => {

            if (erro) {
                res.json("Ocorreu o seguinte erro ao listar as tabelas: " + erro)
            } else {
                res.json(resultado)
            }
        })

    }

}
module.exports = new AlteraDadosBD
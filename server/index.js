const customExpress = require("./configExpress/customExpress")
const conectaBD = require("./infraBD/conexao")
const tabelas = require("./infraBD/tabelas")


conectaBD.connect((erro) => {


    if (erro) {
        console.log("Houve um erro para carregar o banco de dados => " + erro)
    } else {
        console.log("Conectado no banco de dados HinoHarpa com sucesso")
        tabelas.CriaCheckTabela(conectaBD)

        const app = customExpress()
        app.listen(9000, () => { (console.log("Servidor rodando na porta 9000")) })
    }

})


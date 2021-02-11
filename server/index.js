const customExpress = require("./configExpress/customExpress")
const conectaBDCarroAndInformacoes = require("./infraBD/conexaoCarro")



const tabelas = require("./infraBD/tabelas")


conectaBDCarroAndInformacoes.connect((erro) => {
    if (erro) {
        console.log("Houve um erro para carregar o banco de dados => " + erro)

    }
    else {
        tabelas.CriaCheckTabela(conectaBDCarroAndInformacoes)
        console.log("Conectado no banco de dados ===> CARROS e INFORMACOES <=== com sucesso")
        const app = customExpress()
        app.listen(9000, () => { (console.log("Servidor rodando na porta 9000")) })



    }

})




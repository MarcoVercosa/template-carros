const customExpress = require("./configExpress/customExpress")
const conectaBDCarro = require("./infraBD/conexaoCarro")
const conectaBDInformacoes = require("./infraBD/conexaoinformacoes")


const tabelas = require("./infraBD/tabelas")


conectaBDCarro.connect((erro) => {
    if (erro) {
        console.log("Houve um erro para carregar o banco de dados => " + erro)
        BDInformacaoes()
    }
    else {
        tabelas.CriaCheckTabela(conectaBDCarro)
        console.log("Conectado no banco de dados ===> CARROS <=== com sucesso")
        BDInformacoes()
    }

})

async function BDInformacoes() {
    conectaBDInformacoes.connect(erro => {
        if (erro) {
            console.log("Houve um erro para carregar o banco de dados => " + erro)
        } else {
            console.log("Conectado no banco de dados ===> INFORMACOES <=== com sucesso")
            tabelas.CkeckTabelaCarros(conectaBDInformacoes)
            const app = customExpress()
            app.listen(9000, () => { (console.log("Servidor rodando na porta 9000")) })
        }
    })
}


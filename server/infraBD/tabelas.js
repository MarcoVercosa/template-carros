class Tabelas {

    CriaCheckTabela(conexao) {//recebe o obj das confs do BD
        console.log("Solicitado checkagem de tabelas")
        this.conexao = conexao
        this.CkeckTabelaCarros()
    }

    CkeckTabelaCarros() {
        console.log("INICIADO CHECKAGEM DAS TABELAS")
        const queryTabelaCarros = "CREATE TABLE IF NOT EXISTS carros(id int NOT NULL AUTO_INCREMENT, valor varchar(20), marca varchar(20) NOT NULL, ano int(4) NOT NULL, modelo varchar(20) NOT NULL, motor varchar(30) NOT NULL, kilometro varchar(10) NOT NULL, combustivel varchar(20) NOT NULL, porta int(2) NOT NULL, cambio varchar(30) NOT NULL, carroceria varchar(40) NOT NULL, finalPlaca int(2) NOT NULL, sobre varchar(5000) NOT NULL, aceitaTroca tinyint(1) NOT NULL, IPVA tinyint(1) NOT NULL, licenciado tinyint(1) NOT NULL, airbag tinyint(1) NOT NULL, alarme tinyint(1) NOT NULL, cdplayer tinyint(1)  NOT NULL, dvdplayer tinyint(1) NOT NULL, gps tinyint(1)  NOT NULL, radio tinyint(1) NOT NULL, radioTocaFita tinyint(1) NOT NULL, computadorBordo tinyint(1) NOT NULL, controleTracao tinyint(1) NOT NULL, controleVelocidade tinyint(1) NOT NULL, desembacadorTraseiro tinyint(1)  NOT NULL, limpadorTraseiro tinyint(1) NOT NULL, arCondicionado tinyint(1) NOT NULL, arQuente tinyint(1) NOT NULL, freioAbs tinyint(1) NOT NULL, retrovisoresEletricos tinyint(1) NOT NULL, travasEletricas tinyint(1) NOT NULL, vidrosEletricos tinyint(1) NOT NULL, retrovisoresFotocromicos tinyint(1)  NOT NULL, rodaLigaLeve tinyint(1) NOT NULL, sensorChuva tinyint(1) NOT NULL, sensorEstacionamento tinyint(1) NOT NULL, tetoSolar tinyint(1) NOT NULL, direcaoHidraulica tinyint(1) NOT NULL, volanteAltura tinyint(1) NOT NULL, bancoCouro tinyint(1) NOT NULL, encostoCabecaTraseiro tinyint(1) NOT NULL, bancosFrenteAquecimento tinyint(1) NOT NULL, tracaoQuatroRodas tinyint(1) NOT NULL, protetorCacamba tinyint(1) NOT NULL, blindado tinyint(1) NOT NULL, farolXenonio tinyint(1) NOT NULL, imagensPath varchar(5000) NOT NULL, ativado tinyint(1) NOT NULL, destaque tinyint(1) NOT NULL, PRIMARY KEY(ID) )"
        const queryTabelainformacoes = "CREATE TABLE IF NOT EXISTS  informacoes(id int NOT NULL AUTO_INCREMENT, whatsapp varchar(100), facebook varchar(100), youtube varchar(100), instagram varchar(100), email varchar(100), lojaUm varchar(100), horarioFuncionamentoUm varchar(100), localUm varchar(100), cepUm varchar(100), telefoneUm varchar(100), lojaDois varchar(100), horarioFuncionamentoDois varchar(100), localDois varchar(100), cepDois varchar(100), telefoneDois varchar(100), lojaTres varchar(100), horarioFuncionamentoTres varchar(100), localTres varchar(100),cepTres varchar(100), telefoneTres varchar(100), lojaQuatro varchar(100), horarioFuncionamentoQuatro varchar(100), localQuatro varchar(100), cepQuatro varchar(100), telefoneQuatro varchar(100), sobreNos varchar(500), ImagensSlide varchar(800), PRIMARY KEY(ID) )"

        this.conexao.query(queryTabelaCarros, (erro) => {

            if (erro) {
                console.log(erro)
            } else {
                console.log("Tabela  ===> CARROS <=== criada/ja existe com sucesso.")
            }
        })

        this.conexao.query(queryTabelainformacoes, (erro) => {

            if (erro) {
                console.log(erro)
            } else {
                console.log("Tabela ===> INFORMACOES <===  criada/ja existe com sucesso.")
            }

        })
    }
}
module.exports = new Tabelas
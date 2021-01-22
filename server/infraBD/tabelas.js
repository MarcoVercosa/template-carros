class Tabelas {

    CriaCheckTabela(conexao) {//recebe o obj das confs do BD
        console.log("Solicitado checkagem de tabelas")
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        console.log("INICIADO CHECKAGEM DAS TABELAS")
        const sql = "CREATE TABLE IF NOT EXISTS carros(id int NOT NULL AUTO_INCREMENT, marca varchar(20) NOT NULL, ano int(4) NOT NULL, modelo varchar(20) NOT NULL, motor varchar(20) NOT NULL, kilometro int(10) NOT NULL, combustivel varchar(20) NOT NULL, porta int(2) NOT NULL, carroceria varchar(20) NOT NULL, aceitaTroca varchar(20) NOT NULL, IPVA varchar(20) NOT NULL, licenciado varchar(20) NOT NULL, airbag varchar(20) NOT NULL, alarme varchar(20) NOT NULL, cdplayer varchar(20) NOT NULL, dvdplayer varchar(20) NOT NULL, gps varchar(20) NOT NULL, radio varchar(20) NOT NULL, radioTocaFita varchar(20) NOT NULL, computadorBordo varchar(20) NOT NULL, controleTracao varchar(20) NOT NULL, controleVelocidade varchar(20) NOT NULL, desembacadorTraseiro varchar(20) NOT NULL, limpadorTraseiro varchar(20) NOT NULL, arCondicionado varchar(20) NOT NULL, arQuente varchar(20) NOT NULL, freioAbs varchar(20) NOT NULL, retrovisoresEletricos varchar(20) NOT NULL, retrovisoresFotocromicos varchar(20) NOT NULL, rodaLigaLeve varchar(20) NOT NULL, sensorChuva varchar(20) NOT NULL, sensorEstacionamento varchar(20) NOT NULL, tetoSolar varchar(20) NOT NULL, travasEletricas varchar(20) NOT NULL, vidrosEletricos varchar(20) NOT NULL, direcaoHidraulica varchar(20) NOT NULL, volanteAltura varchar(20) NOT NULL, bancoCouro varchar(20) NOT NULL, encostoCabecaTraseiro varchar(20) NOT NULL, bancosFrenteAquecimento varchar(20) NOT NULL, tracaoQuatroRodas varchar(20) NOT NULL, protetorCacamba varchar(20) NOT NULL, farolXenonio varchar(20) NOT NULL, PRIMARY KEY(ID) )"

        this.conexao.query(sql, (erro) => {

            if (erro) {
                console.log(erro)
            } else {
                console.log("Tabela Atendimentos criada/ja existe com sucesso.")
            }
        })
    }
}
module.exports = new Tabelas
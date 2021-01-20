class Tabelas {

    init(conexao) {//recebe o obj das confs do BD
        console.log("Solicitado checkagem de tabelas")
        this.conexao = conexao
        this.criarAtendimentos()
    }

    criarAtendimentos() {
        console.log("INICIADO CHECKAGEM DAS TABELAS")
        const sql = "CREATE TABLE IF NOT EXISTS louvores(id int NOT NULL AUTO_INCREMENT, numero int(50) NOT NULL, titulo varchar(100), letra varchar(5000) NOT NULL, PRIMARY KEY(ID) )"

    }


}
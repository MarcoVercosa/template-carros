const mysql = require("mysql")


const conectaBDInformacoes = mysql.createConnection({

    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "deusepoder",
    database: "vendaCarro"

})

module.exports = conectaBDInformacoes

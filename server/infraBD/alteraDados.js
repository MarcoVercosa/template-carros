const conectaBDCarro = require("./conexaoCarro")

class AlteraDadosBD {


    // #####################################################// #####################################################
    // #####################################################// #####################################################
    //                                      TABELA PAINEL DO CLIENTE
    // #####################################################// #####################################################
    // #####################################################// #####################################################


    //Cadastra novo anuncio
    Cadastra(atendimento, res) {
        console.log(atendimento)
        const sql = `INSERT INTO carros SET ?`
        conectaBDCarro.query(sql, atendimento, (erro, resultado) => {

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
        conectaBDCarro.query(sql, (erro, resultado) => {
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
        conectaBDCarro.query(sql, atendimento, (erro, resultado) => {

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
        conectaBDCarro.query(sql, (erro, resultado) => {

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
        conectaBDCarro.query(sql, (erro, resultado) => {

            if (erro) {
                res.json("Ocorreu o seguinte erro ao listar as tabelas: " + erro)
            } else {
                res.json(resultado)
            }
        })

    }

    // #####################################################// #####################################################
    // #####################################################// #####################################################
    //                                      TABELA INFORMAÇÕES DO SITE
    // #####################################################// #####################################################
    // #####################################################// #####################################################

    GetInfoSite(idPesquisa, res) {

        const sql = `SELECT * FROM vendaCarro.informacoes WHERE id=1`
        conectaBDCarro.query(sql, (erro, resultado) => {

            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações do site: " + erro)
            } else {
                // console.log(resultado)
                res.json(resultado)
            }
        })
    }

    GravaInfoSite(dados, res) {

        const sql = `UPDATE informacoes SET ? WHERE id=1`
        conectaBDCarro.query(sql, dados, (erro, resultado) => {
            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações do site: " + erro)
            } else {
                // console.log(resultado)
                res.json("Dados gravados no Banco de dados com sucesso !")
            }
        })
    }



    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////
    //                 FORNECE INFORMAÇÕES AO SITE              //
    //////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////


    Contato(res) {
        const sql = "SELECT * FROM vendaCarro.informacoes WHERE id=1"
        conectaBDCarro.query(sql, (erro, resultado) => {
            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações para a HOME: " + erro)
            } else {
                res.json(resultado)
            }
        })
    }

    ImagensSlidePrincipal(res) {
        const sql = "SELECT imagensSlide FROM vendaCarro.informacoes WHERE id=1"
        conectaBDCarro.query(sql, (erro, resultado) => {
            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações do site: " + erro)
            } else {

                res.json(resultado)
            }
        })
    }

    DestaquesHome(res) {//seleciona os destaques que são 1 (verdadeiro)
        const sql = "SELECT * FROM vendaCarro.carros WHERE destaque=1"
        conectaBDCarro.query(sql, (erro, resultado) => {
            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações do site: " + erro)
            } else {
                res.json(resultado)
            }
        })
    }

    Footer(res) {//sobre Nos - ROdapé
        const sql = "SELECT sobreNos FROM vendaCarro.informacoes WHERE id=1"
        conectaBDCarro.query(sql, (erro, resultado) => {
            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações para a HOME: " + erro)
            } else {
                res.json(resultado)
            }
        })
    }

    Estoque(res) {// todos os carros
        const sql = "SELECT marca, modelo, valor, motor, combustivel, cambio, ano, blindado, imagensPath FROM vendaCarro.carros"
        conectaBDCarro.query(sql, (erro, resultado) => {
            if (erro) {
                res.json("Ocorreu o seguinte erro ao buscar informações para a página ESTOQUE: " + erro)
            } else {
                res.json(resultado)
            }
        })
    }

    FiltroEstoque(res) {//dados para filtro estoque
        var armazenaFiltro = {
            marca: [],
            combustivel: false,
            cambio: false,
            ano: false,
            blindado: false
        }

        const sql = "SELECT marca, combustivel, cambio, ano, blindado FROM vendaCarro.carros"
        conectaBDCarro.query(sql, (erro, resultado) => {
            if (erro) {
                return "Ocorreu o seguinte erro ao buscar informações para a página ESTOQUE: " + erro
            } else {
                const dadosMarca = FiltraMarca(resultado)//traz as marcas sem repetidas
                armazenaFiltro = { ...armazenaFiltro, marca: dadosMarca }

                const dadosAno = FiltraAno(resultado) //traz todos os anos, do ano do carro mais antigo até o mais novo
                armazenaFiltro = { ...armazenaFiltro, ano: dadosAno }

                const dadosCombustivel = FiltraCombustivel(resultado) //traz tipos de combustiveis sem repetidas
                armazenaFiltro = { ...armazenaFiltro, combustivel: dadosCombustivel }

                const dadosBlindado = FiltraBlindado(resultado) //informa se há ou nao Blindados
                armazenaFiltro = { ...armazenaFiltro, blindado: dadosBlindado }
                console.log(armazenaFiltro)
                res.json(armazenaFiltro)
            }

        })

        function FiltraMarca(resultado) {
            const armazenaMarcas = []
            resultado.map((dados) => {
                armazenaMarcas.push(dados.marca.toUpperCase())
                //armazena todas as marcas em array
            })
            var armazenaMarcasSemDuplicado = armazenaMarcas.filter((dados, index, arrayCompleta) => {
                //retira as duplicadas da array com Marcas: dados(dado do vez), index (index do dado da vez) arrayCompleta (é a array completa)
                return index === arrayCompleta.indexOf(dados)
            })
            return armazenaMarcasSemDuplicado
        }
        function FiltraAno(resultado) {
            // console.log(resultado)
            var todosAnos = []
            var montaComponente = []
            resultado.map(dados => {//armazena somente os anos
                todosAnos.push(dados.ano)
            })
            const menorAno = Math.min(...todosAnos)// identifica o MENOR ano
            const maiorAno = Math.max(...todosAnos)// identifica o MAIOR ano

            for (var i = menorAno; i <= maiorAno; i++) {//FAZ UM LOOP e preenche do menor até o maior ano
                montaComponente.push(i)
            }
            return montaComponente
        }
        function FiltraCombustivel(resultado) {
            var armazenaCombustivel = []
            resultado.map(dados => {
                armazenaCombustivel.push(dados.combustivel)
            })
            var armazenaCombustívelSemDuplicado = armazenaCombustivel.filter((dados, index, arrayCompleta) => {
                //retira as duplicadas da array com Marcas: dados(dado do vez), index (index do dado da vez) arrayCompleta (é a array completa)
                return index === arrayCompleta.indexOf(dados)
            })
            return armazenaCombustívelSemDuplicado
        }
        function FiltraBlindado(resultado) {
            var armazenaBlindado = []
            var armazenaBlindadoFiltra = []
            resultado.map(dados => {
                armazenaBlindado.push(dados.blindado)
            })

            armazenaBlindadoFiltra = armazenaBlindado.filter((dados, index, ArrayTotal) => {
                return index === ArrayTotal.indexOf(dados)
            })
            return armazenaBlindadoFiltra

        }
    }

}
module.exports = new AlteraDadosBD

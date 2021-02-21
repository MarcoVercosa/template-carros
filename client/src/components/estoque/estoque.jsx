import { React, useState, useEffect } from 'react';
import Menu from "../../components/menu/menu"
import Footer from "../../components/footer/footer"
import "./estoque.css"


import BuscaBD from '../fetchBackEnd/api';

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';




export default function Estoque(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
            button: {
                margin: theme.spacing(1),

            },
        },
    }));
    const classes = useStyles();


    const [selectFiltro, setSelectFiltro] = useState({
        blindado: false,
        marca: false,
        filtraMarca: false,
        preco: false,
        ano: false,
        filtraAno: false,
        cambio: false,
        combustivel: false
    })

    const [carrosEstoque, setCarrosEstoque] = useState({
        todosDestaques: false,
        paginacao: 0,
        paginaAvanca: 9,
        paginaRetorna: 0,
        ativaBotaoEsquerdo: false,
        ativaBotaodireito: false
    })

    useEffect(async () => {
        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.Estoque()
        console.log(resultado)
        setCarrosEstoque(prevState => {
            return { ...prevState, todosDestaques: resultado.data, paginacao: resultado.data.slice(carrosEstoque.paginaRetorna, carrosEstoque.paginaAvanca) }
        })
        FiltraMarca(resultado)
        FiltraAno(resultado)

    }, [])

    function FiltraMarca(resultado) {
        const armazenaMarcas = []
        resultado.data.map((dados) => {
            armazenaMarcas.push(dados.marca)
            //armazena todas as marcas em array
        })
        var armazenaMarcasSemDuplicado = armazenaMarcas.filter((dados, index, arrayCompleta) => {
            //retira as duplicadas da array com Marcas: dados(dado do vez), index (index do dado da vez) arrayCompleta (é a array completa)
            return index === arrayCompleta.indexOf(dados)
        })
        setSelectFiltro(prevState => {
            return { ...prevState, filtraMarca: armazenaMarcasSemDuplicado }
        })
    }

    function FiltraAno(resultado) {
        var todosAnos = []
        var montaComponente = []
        resultado.data.map(dados => {//armazena somente os anos
            todosAnos.push(dados.ano)
        })
        const menorAno = Math.min(...todosAnos)// identifica o MENOR ano
        const maiorAno = Math.max(...todosAnos)// identifica o MAIOR ano

        for (var i = menorAno; i <= maiorAno; i++) {//FAZ UM LOOP e preenche do menor até o maior ano
            montaComponente.push(<option>{i}</option>)
        }
        setSelectFiltro(prevState => {
            return { ...prevState, filtraAno: montaComponente }
        })
    }
    function Paginacao(direcao) {
        if (direcao === "avancar") {
            // if (carrosEstoque.paginaAvanca >= carrosEstoque.todosDestaques.length) { return }
            setCarrosEstoque(prevState => {
                return { ...prevState, paginacao: carrosEstoque.todosDestaques.slice(carrosEstoque.paginaRetorna + 9, carrosEstoque.paginaAvanca + 9), paginaAvanca: carrosEstoque.paginaAvanca + 9, paginaRetorna: carrosEstoque.paginaRetorna + 9 }
            })
        } else {
            setCarrosEstoque(prevState => {
                return { ...prevState, paginacao: carrosEstoque.todosDestaques.slice(carrosEstoque.paginaRetorna - 9, carrosEstoque.paginaAvanca - 9), paginaAvanca: carrosEstoque.paginaAvanca - 9, paginaRetorna: carrosEstoque.paginaRetorna - 9 }
            })
        }
    }

    function MostrarTopoDestaque() {
        window.location.href = ("#inicio")
    }

    return (
        <>
            <Menu />

            <menu id="inicio" className="estoque-menu-left">
                <h3 className="titulo-estoque">VEÍCULOS EM ESTOQUE</h3>
                <div className="estoque-menu-left-div">
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Veículos Blindados</label>
                        <select id="blindado">
                            <option >TODOS</option>
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="marca">Marca</label>
                        <select id="marca">
                            <option >TODOS</option>
                            {selectFiltro.filtraMarca &&
                                selectFiltro.filtraMarca.map((dados) => {
                                    return (
                                        <option >{dados}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="preco">Preço</label>
                        <select id="preco">
                            <option >TODOS</option>
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="ano">Ano DE:</label>
                        <select id="ano">
                            <option >TODOS</option>
                            {selectFiltro.filtraAno}
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="ano">Ano ATÉ:</label>
                        <select id="ano">
                            <option >TODOS</option>
                            {selectFiltro.filtraAno}
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="cambio">Câmbio</label>
                        <select id="cambio">
                            <option >TODOS</option>
                            <option >SIM</option>
                            <option>NÃO</option>

                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="combustivel">Combustível</label>
                        <select id="combustivel">
                            <option >TODOS</option>
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-button">
                        <Button variant="contained" size="large" color="primary" >
                            BUSCAR
                        </Button>
                    </div>
                </div>
                <div className="estoque-article" >
                    <h1 className="titulo-estoque" >Anúncios</h1>
                    <div className="estoque-article-estoque">
                        {carrosEstoque.todosDestaques &&
                            carrosEstoque.paginacao.map((recebe, index) => {
                                const dados = { ...recebe, imagensPath: JSON.parse(recebe.imagensPath) }
                                return (
                                    <div className="estoque-article-estoque-div">
                                        <div className="estoque-article-estoque-div-imagem">
                                            <a href={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]} target="_blank">
                                                <img alt={dados.modelo} key={index} src={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]}></img>
                                            </a>
                                        </div>
                                        <div className="estoque-article-estoque-div-imagem-info">
                                            <span className="estoque-article-div-grid-div-p">{dados.modelo}</span>
                                            <hr />
                                            <span className="estoque-article-div-grid-div-p-p">R$ {dados.valor},00</span>
                                            <hr />
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.motor}</span>
                                            <span className="estoque-article-div-grid-div-p-p-p"> {dados.combustivel}</span>
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.porta}P {dados.cambio}</span>
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.ano}</span>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className="estoque-article-div-navegacao">
                    <Button
                        onClick={(click, direcao = "voltar") => {
                            MostrarTopoDestaque()
                            Paginacao(direcao)
                        }}
                        style={{ marginLeft: "20px" }}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ArrowBackIosIcon style={{ fontSize: 28, marginLeft: "20px" }} />}
                        disabled={carrosEstoque.paginaRetorna <= 0}
                    >

                    </Button>
                    <Button
                        onClick={(click, direcao = "avancar") => {
                            Paginacao(direcao)
                            MostrarTopoDestaque()
                        }}
                        style={{ marginLeft: "20px" }}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<ArrowForwardIosIcon style={{ fontSize: 28, marginLeft: "20px" }} />}
                        disabled={carrosEstoque.paginaAvanca >= carrosEstoque.todosDestaques.length}
                    >

                    </Button>
                </div>

            </menu >
            <Footer />
        </>

    )
}
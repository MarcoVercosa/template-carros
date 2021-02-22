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
        BDBlindado: false,
        selectBlindado: false,
        BDMarca: false,
        selectMarca: false,
        selectPreco: false,
        BDAno: false,
        selectAno: false,
        cambio: false,
        BDcombustivel: false,
        selectCombustivel: false
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
        const estoque = await classBuscaBD.Estoque()

        setCarrosEstoque(prevState => {
            return { ...prevState, todosDestaques: estoque.data, paginacao: estoque.data.slice(carrosEstoque.paginaRetorna, carrosEstoque.paginaAvanca) }
        })

        const filtro = await classBuscaBD.FiltroEstoque()
        var confBlindado = []
        if (filtro.data.blindado.length > 1) { confBlindado = ["TODOS", "SIM", "NÃO"] }
        if (filtro.data.blindado.length === 1) {
            if (filtro.data.blindado[0] === 0) { confBlindado = ["NAO"] } else { confBlindado = ["TODOS", "SIM", "NÃO"] }
        }

        setSelectFiltro(prevState => {
            return { ...prevState, BDMarca: filtro.data.marca, BDAno: filtro.data.ano, BDCombustivel: filtro.data.combustivel, BDBlindado: confBlindado }
        })

    }, [])


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
                            {selectFiltro.BDBlindado &&
                                selectFiltro.BDBlindado.map(dados => {
                                    return (
                                        <option>{dados}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="marca">Marca</label>
                        <select id="marca">
                            <option >TODAS</option>
                            {selectFiltro.BDMarca &&
                                selectFiltro.BDMarca.map((dados) => {
                                    return (
                                        <option >{dados}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="preco">Preço</label>
                        <select id="preco"
                            value={selectFiltro.preco}
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, preco: click.target.value }
                                })
                            }}
                        >
                            <option value={0} >TODAS</option>
                            <option value={20000} >Até R$ 20.000,00</option>
                            <option value={30000} >De R$ 20.000,00 a R$ 30.000,00</option>
                            <option value={40000}>De R$ 30.000,00 a R$ 40.000,00</option>
                            <option value={50000}>De R$ 40.000,00 a R$ 50.000,00</option>
                            <option value={50001}>Acima de R$ 50.000,00</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="ano">Ano:</label>
                        <select id="ano">
                            <option >TODAS</option>
                            {selectFiltro.BDAno &&
                                selectFiltro.BDAno.map(dados => {
                                    return (
                                        <option >Até {dados}</option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="cambio">Câmbio</label>
                        <select id="cambio">
                            <option>TODAS</option>
                            <option>MANUAL</option>
                            <option>AUTOMÁTICO</option>

                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="combustivel">Combustível</label>
                        <select id="combustivel">
                            <option >TODAS</option>
                            {selectFiltro.BDCombustivel &&
                                selectFiltro.BDCombustivel.map(dados => {
                                    return (
                                        <option>{dados}</option>
                                    )
                                })
                            }
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
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.porta} {dados.cambio}</span>
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
import { React, useState, useEffect } from 'react';
import Menu from "../../components/menu/menu"
import Footer from "../../components/footer/footer"
import "./estoque.css"


import BuscaBD from '../fetchBackEnd/api';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';





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
            '& > *': {
                margin: theme.spacing(1),
            },
        },
    }));
    const classes = useStyles();


    const [selectFiltro, setSelectFiltro] = useState({
        BDBlindado: false,
        BDMarca: false,
        BDAno: false,
        BDCombustivel: false,
        selectBlindado: "todos", //colocado como string, pq a opcao Não boolean ja possui esse valor
        selectMarca: false,
        selectValor: false,
        selectAno: false,
        selectCambio: false,
        selectCombustivel: false
    })

    const [carrosEstoque, setCarrosEstoque] = useState({
        todoEstoque: false,//todos anuncios do BD

        paginacao: false, //auncios da pagina atual
        paginaAvanca: 9,
        paginaRetorna: 0,

    })

    useEffect(async () => {
        const classBuscaBD = new BuscaBD
        const estoque = await classBuscaBD.Estoque()
        console.log(estoque)

        setCarrosEstoque(prevState => {
            return { ...prevState, todoEstoque: estoque.data, paginacao: estoque.data.slice(carrosEstoque.paginaRetorna, carrosEstoque.paginaAvanca) }
        })

        const filtro = await classBuscaBD.FiltroEstoque()
        var confBlindado = []

        if (filtro.data.blindado.length > 1 || filtro.data.blindado.length === 1) {
            confBlindado.push(<option value={"todos"} >TODOS</option>)
            confBlindado.push(<option value={true}>SIM</option>)
            confBlindado.push(<option value={false}>NÃO</option>)
        } else {
            confBlindado = [<option value={false}>NÃO</option>]
        }

        setSelectFiltro(prevState => {
            return { ...prevState, BDMarca: filtro.data.marca, BDAno: filtro.data.ano, BDCombustivel: filtro.data.combustivel, BDBlindado: confBlindado }
        })

    }, [])


    function Paginacao(direcao) {
        if (direcao === "avancar") {
            // if (carrosEstoque.paginaAvanca >= carrosEstoque.todoEstoque.length) { return }
            setCarrosEstoque(prevState => {
                return { ...prevState, paginacao: carrosEstoque.todoEstoque.slice(carrosEstoque.paginaRetorna + 9, carrosEstoque.paginaAvanca + 9), paginaAvanca: carrosEstoque.paginaAvanca + 9, paginaRetorna: carrosEstoque.paginaRetorna + 9 }
            })
        } else {
            setCarrosEstoque(prevState => {
                return { ...prevState, paginacao: carrosEstoque.todoEstoque.slice(carrosEstoque.paginaRetorna - 9, carrosEstoque.paginaAvanca - 9), paginaAvanca: carrosEstoque.paginaAvanca - 9, paginaRetorna: carrosEstoque.paginaRetorna - 9 }
            })
        }
    }

    function MostrarTopoDestaque() {
        window.location.href = ("#inicio")
    }

    async function FindAnuncioWithFilter() {
        var dadosFilter = {
            marca: selectFiltro.selectMarca,
            valor: selectFiltro.selectValor,
            ano: selectFiltro.selectAno,
            cambio: selectFiltro.selectCambio,
            combustivel: selectFiltro.selectCombustivel,
            blindado: selectFiltro.selectBlindado
        }
        console.log(selectFiltro)
        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.FiltroEstoqueComFilter(dadosFilter)
        setCarrosEstoque(prevState => {
            return { ...prevState, todoEstoque: resultado.data, paginaAvanca: 9, paginaRetorna: 0, paginacao: resultado.data.slice(0, 9) }
        })
        MostrarTopoDestaque()

    }

    return (
        <>
            <Menu />

            <menu id="inicio" className="estoque-menu-left">
                <h3 className="titulo-estoque">VEÍCULOS EM ESTOQUE {carrosEstoque.todoEstoque.length}</h3>

                <div className="estoque-menu-left-div">
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Veículos Blindados</label>
                        <select id="blindado"
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, selectBlindado: click.target.value }
                                })

                            }}
                        >
                            {selectFiltro.BDBlindado &&
                                selectFiltro.BDBlindado.map(dados => {
                                    return (
                                        dados
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="marca">Marca</label>
                        <select id="marca"
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, selectMarca: click.target.value }
                                })
                            }}
                        >
                            <option value={false} >TODAS</option>
                            {selectFiltro.BDMarca &&
                                selectFiltro.BDMarca.map((dados, index) => {
                                    return (
                                        <option key={index} >{dados}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="preco">Preço</label>
                        <select id="preco"
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, selectValor: click.target.value }
                                })
                            }}
                        >
                            <option value={false} >TODAS</option>
                            <option value={20000} >Até R$ 20.000</option>
                            <option value={30000} >De R$ 20.000 a R$ 30.000</option>
                            <option value={40000}>De R$ 30.000 a R$ 40.000</option>
                            <option value={50000}>De R$ 40.000 a R$ 50.000</option>
                            <option value={50001}>Acima de R$ 50.000</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="ano">Ano:</label>
                        <select id="ano"
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, selectAno: click.target.value }
                                })
                            }}
                        >
                            <option value={false} >TODAS</option>
                            {selectFiltro.BDAno &&
                                selectFiltro.BDAno.map((dados, index) => {
                                    return (
                                        <option key={index} value={dados} >Até {dados}</option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="cambio">Câmbio</label>
                        <select id="cambio"
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, selectCambio: click.target.value }
                                })
                            }}
                        >
                            <option value={false}>TODAS</option>
                            <option>MANUAL</option>
                            <option>AUTOMÁTICO</option>

                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="combustivel">Combustível</label>
                        <select id="combustivel"
                            onChange={(click) => {
                                setSelectFiltro(prevState => {
                                    return { ...prevState, selectCombustivel: click.target.value }
                                })
                            }}
                        >
                            <option value={false} >TODAS</option>
                            {selectFiltro.BDCombustivel &&
                                selectFiltro.BDCombustivel.map((dados, index) => {
                                    return (
                                        <option key={index}>{dados}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-button">
                        <Button variant="contained" size="large" color="primary"
                            onClick={(click) => { FindAnuncioWithFilter() }}
                        >
                            BUSCAR
                        </Button>
                    </div>
                </div>
                <div className="estoque-article" >
                    <h1 className="titulo-estoque" >Anúncios</h1>
                    <div className="estoque-article-estoque">
                        {carrosEstoque.todoEstoque &&
                            carrosEstoque.paginacao.map((recebe, index) => {
                                const dados = { ...recebe, imagensPath: JSON.parse(recebe.imagensPath) }
                                return (
                                    <div className="estoque-article-estoque-div">
                                        <div className="estoque-article-estoque-div-imagem">
                                            <a href={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]} target="_blank">
                                                <img alt={dados.modelo} key={index} src={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]}></img>
                                            </a>
                                        </div>
                                        <div key={index + 1} className="estoque-article-estoque-div-imagem-info">
                                            <span className="estoque-article-div-grid-div-p">{dados.modelo}</span>
                                            <hr className="estoque-article-div-grid-div-hr" />
                                            <span className="estoque-article-div-grid-div-p-p">R$ {dados.valor},00</span>
                                            <hr className="estoque-article-div-grid-div-hr" />
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.motor}</span>
                                            <span className="estoque-article-div-grid-div-p-p-p"> {dados.combustivel}</span>
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.porta} {dados.cambio}</span>
                                            <span className="estoque-article-div-grid-div-p-p-p">{dados.ano}</span>
                                            <div className="estoque-article-div-grid-div-button">
                                                <Button variant="contained" color="primary"

                                                >
                                                    DETAlHES
                                            </Button>
                                            </div>
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
                        disabled={carrosEstoque.paginaAvanca >= carrosEstoque.todoEstoque.length}
                    >

                    </Button>
                </div>

            </menu >
            <Footer />
        </>

    )
}
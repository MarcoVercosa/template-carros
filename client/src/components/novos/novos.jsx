import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//##################################################################
//O CÓDIGO ABAIXO É PRATICAMENTE O MESMO DO COMPONENTE ESTOQUE, 
//PORTANTO O CSS É O DO ESTOQUE
//##################################################################

import Menu from "../../components/menu/menu"
import Footer from "../../components/footer/footer"


import BuscaBD from '../fetchBackEnd/api';

import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';


export default function Novos(props) {
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


    const [carrosEstoque, setCarrosEstoque] = useState({
        todoEstoque: true,//todos anuncios do BD

        paginacao: false, //auncios da pagina atual
        paginaAvanca: 9,
        paginaRetorna: 0,

    })

    useEffect(async () => {
        const classBuscaBD = new BuscaBD
        const estoque = await classBuscaBD.BuscaEstoqueNovos()
        if (estoque.data.length < 1) {
            setCarrosEstoque(prevState => {
                return { ...prevState, todoEstoque: false }
            })
            return
        }
        console.log(estoque)

        setCarrosEstoque(prevState => {
            return { ...prevState, todoEstoque: estoque.data, paginacao: estoque.data.slice(carrosEstoque.paginaRetorna, carrosEstoque.paginaAvanca) }
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

    return (
        <>
            <Menu />
            {!carrosEstoque.todoEstoque &&

                <div style={{ width: "100%", height: "200px", display: "flex", justifyContent: "Center", marginTop: "50px" }}>
                    <i class="fas fa-exclamation-triangle fa-6x" style={{ color: "rgb(237, 253, 92)" }}></i>
                    <h2 style={{ color: "#777777" }}>No momento nossos veículos 0 KM foram todos vendidos. Em breve teremos novidades !!!</h2>
                </div>

            }
            {carrosEstoque.paginacao &&

                <menu id="inicio" className="estoque-menu-left">
                    <h3 className="titulo-estoque" style={{ marginLeft: "45x" }}>VEÍCULOS 0 KM:</h3>

                    <div className="estoque-article" style={{ marginLeft: "60px" }} >
                        <h1 className="titulo-estoque" >Anúncios:</h1>
                        <div className="estoque-article-estoque">
                            {carrosEstoque.todoEstoque &&
                                carrosEstoque.paginacao.map((recebe, index) => {
                                    const dados = { ...recebe, imagensPath: JSON.parse(recebe.imagensPath) }
                                    return (
                                        <div className="estoque-article-estoque-div">
                                            <div className="estoque-article-estoque-div-imagem">
                                                {/* <a href={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]} target="_blank"> */}
                                                <img alt={dados.modelo} key={index} src={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]}></img>
                                                {/* </a> */}
                                            </div>
                                            <div key={index + 1} className="estoque-article-estoque-div-imagem-info">
                                                <span className="estoque-article-div-grid-div-p">{dados.marca} {dados.modelo}</span>
                                                <hr className="estoque-article-div-grid-div-hr" />
                                                <span className="estoque-article-div-grid-div-p-p">R$ {dados.valor},00</span>
                                                <hr className="estoque-article-div-grid-div-hr" />
                                                <span className="estoque-article-div-grid-div-p-p-p">{dados.motor}</span>
                                                <span className="estoque-article-div-grid-div-p-p-p"> {dados.combustivel}</span>
                                                <span className="estoque-article-div-grid-div-p-p-p">{dados.porta} {dados.cambio}</span>
                                                <span className="estoque-article-div-grid-div-p-p-p">{dados.ano}</span>
                                                <span className="estoque-article-div-grid-div-p-p-p-p">OFERTA: #{dados.id}</span>
                                                <div className="estoque-article-div-grid-div-button">

                                                    <Link to={`/detalhesanuncio${dados.id}`} target="_blank">

                                                        <Button variant="contained" color="primary"
                                                        >
                                                            MAIS DETALHES
                                                    </Button>
                                                    </Link>
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
            }
            <Footer />
        </>
    )
}
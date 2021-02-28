import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./destaques.css"

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import BuscaBD from "../fetchBackEnd/api"



export default function Destaques(dados) {

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


    const [imagensDestaque, setImagensDestaque] = useState({

        todosDestaques: false,
        paginacao: 0,
        paginaAvanca: 8,
        paginaRetorna: 0,
        ativaBotaoEsquerdo: false,
        ativaBotaodireito: false


    })

    useEffect(async () => {
        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.BuscaDestaque()
        console.log(resultado)
        setImagensDestaque(prevState => {
            return { ...prevState, todosDestaques: resultado.data, paginacao: resultado.data.slice(imagensDestaque.paginaRetorna, imagensDestaque.paginaAvanca) }
        })

    }, [])

    function Paginacao(direcao) {
        if (direcao === "avancar") {
            if (imagensDestaque.paginaAvanca >= imagensDestaque.todosDestaques.length) { return }
            setImagensDestaque(prevState => {
                return { ...prevState, paginacao: imagensDestaque.todosDestaques.slice(imagensDestaque.paginaRetorna + 8, imagensDestaque.paginaAvanca + 8), paginaAvanca: imagensDestaque.paginaAvanca + 8, paginaRetorna: imagensDestaque.paginaRetorna + 8 }
            })
        } else {
            setImagensDestaque(prevState => {
                return { ...prevState, paginacao: imagensDestaque.todosDestaques.slice(imagensDestaque.paginaRetorna - 8, imagensDestaque.paginaAvanca - 8), paginaAvanca: imagensDestaque.paginaAvanca - 8, paginaRetorna: imagensDestaque.paginaRetorna - 8 }
            })
        }
    }

    function MostrarTopoDestaque() {
        window.location.href = ("#destaques")

    }

    return (
        <article className="destaques-article">

            <h3 className="destaques-h3">VEÍCULOS EM DESTAQUE</h3>
            <div className="destaques-article-div-inicio">
                <TextField
                    style={{ width: "30%" }}
                    id="outlined-secondary"
                    label="PESQUISAR"
                    variant="outlined"
                    color="primary"
                    size="small"
                />
                <Button
                    style={{ marginLeft: "20px" }}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SearchIcon style={{ fontSize: 28 }} />}
                >
                    BUSCAR
                </Button>
            </div>

            <div id="destaques" className="destaques-article-div-grid">
                {imagensDestaque.paginacao &&

                    imagensDestaque.paginacao.map((recebe, index) => {
                        const dados = { ...recebe, imagensPath: JSON.parse(recebe.imagensPath) }
                        return (
                            <div className="destaques-article-div-grid-div">
                                <div className="destaques-article-div-grid-imagem">
                                    <a href={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]} target="_blank">
                                        <img alt={dados.modelo} key={index} src={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]}></img>
                                    </a>
                                </div>
                                <div className="destaques-article-div-grid-imagem-info">
                                    <span className="destaques-article-div-grid-div-p">{dados.marca} {dados.modelo}</span>
                                    <hr />
                                    <span className="destaques-article-div-grid-div-p-p">R$ {dados.valor},00</span>
                                    <hr />
                                    <span className="destaques-article-div-grid-div-p-p-p">{dados.motor}</span>
                                    <span className="destaques-article-div-grid-div-p-p-p"> {dados.combustivel}</span>
                                    <span className="destaques-article-div-grid-div-p-p-p">{dados.porta}P {dados.cambio}</span>
                                    {/* <span className="destaques-article-div-grid-div-p-p-p">{dados.ano}</span> */}
                                    <span className="destaques-article-div-grid-div-anuncio">OFERTA: #{dados.id}</span>
                                    <div className="destaques-menu-left-div-button">

                                        <Link to={`/detalhesanuncio${dados.id}`} target="_blank">
                                            <Button variant="contained" size="large" color="primary"
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
            <div className="destaques-article-div-navegacao">
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
                    disabled={imagensDestaque.paginaRetorna <= 0}
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
                    disabled={imagensDestaque.paginaAvanca >= imagensDestaque.todosDestaques.length}
                >

                </Button>
            </div>

        </article>
    )
}
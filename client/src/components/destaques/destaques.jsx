import { React, useEffect, useState } from 'react';
import "./destaques.css"

import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';

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


    const [imagensDestaque, setImagensDestaque] = useState(false)

    useEffect(async () => {
        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.BuscaDestaque()
        console.log(resultado)
        setImagensDestaque(resultado)

    }, [])

    return (
        <article className="destaques-article">

            <h2 className="destaques-h2">VEÍCULOS EM DESTAQUE</h2>
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

            <div className="destaques-article-div-grid">
                {imagensDestaque &&

                    imagensDestaque.data.map((recebe, index) => {
                        const dados = { ...recebe, imagensPath: JSON.parse(recebe.imagensPath) }
                        return (
                            <div className="destaques-article-div-grid-div">
                                <div className="destaques-article-div-grid-imagem">
                                    <a href={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]} target="_blank">
                                        <img alt={dados.modelo} key={index} src={"http://192.168.0.150:9000/static/" + dados.imagensPath[0]}></img>
                                    </a>
                                </div>
                                <div className="destaques-article-div-grid-imagem-info">
                                    <span className="destaques-article-div-grid-div-p">{dados.modelo}</span>
                                    <hr></hr>
                                    <span className="destaques-article-div-grid-div-p-p">R$ {dados.valor},00</span>
                                    <hr />
                                    <span className="destaques-article-div-grid-div-p-p-p">{dados.motor}</span>
                                    <span className="destaques-article-div-grid-div-p-p-p"> {dados.combustivel}</span>
                                    <span className="destaques-article-div-grid-div-p-p-p">{dados.porta}P {dados.cambio}</span>
                                    <span className="destaques-article-div-grid-div-p-p-p">{dados.ano}</span>
                                </div>

                            </div>
                        )

                    })

                }
            </div>

        </article>
    )
}
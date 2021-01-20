import { React, useState } from 'react';
import { Link } from "react-router-dom";
import "./painelAdministrativo.css"

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Paineladministrativo() {

    const classes = useStyles();
    return (
        <>

            <div className="paineladministrativo-div">
                <h2>Bem vindo ao PAINEL ADMINISTRATIDO DE OFERTAS</h2>
            </div>


            <article className="paineladministrativo-article">

                <h4>SELECIONE A OPÇÃO DESEJADA:</h4>


                <div className="paineladministrativo-article-div-button">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SendIcon />}
                    >
                        CRIAR ANÚNCIO
                    </Button>

                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        ALTERAR ANÚNCIO
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                    >
                        DELETAR ANÚNCIO
                    </Button>
                </div>
            </article>

            <div className="paineladministrativo-div-formualario">

                <form className="paineladministrativo-div-formualario-form">


                </form>


            </div>

        </>

    )

}
import { React, useState } from 'react';
import "./destaques.css"


import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';



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

    return (
        <article className="destaques-article">

            <h2 className="destaques-h2">VEÍCULOS EM DESTAQUE</h2>
            <div className="destaques-article-div-inicio">
                <TextField
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

        </article>
    )
}
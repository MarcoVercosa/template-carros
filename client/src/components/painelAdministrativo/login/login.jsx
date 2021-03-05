import React from 'react';
import './login.css'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '97%',
        },
    },
}));


export default function Login() {
    const classes = useStyles();

    return (

        <article className="login-article">
            <div className="login-article-div-titulo">
                <p>PAINEL ADMINISTRATIVO</p>

            </div>


            <div className="login-article-form-div">
                <p className="login-article-form-div-login-p">Sign In</p>
                <form className="login-article-form">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField label="E-mail *" autocomplete="email" id="email" name="email" type="email" />
                        <TextField label="Senha *" autocomplete="current-password" id="password" name="password" type="password" />
                        <Button variant="contained" color="primary" style={{ marginTop: "30px" }}>
                            Sign In
                        </Button>
                        <hr></hr>
                    </form>
                    <p className="login-article-form-div-login-esqueceusenha">Esqueceu a senha ?</p>
                </form>
            </div>

        </article>
    )
}
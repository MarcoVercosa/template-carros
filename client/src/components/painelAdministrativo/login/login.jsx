import { React, useState } from 'react';
import ForgetPassword from "./modaForgetPassword"
import './login.css'

import BuscaBD from "../../fetchBackEnd/api"

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


export default function Login(e) {
    // e.preventDefault()
    const classes = useStyles();

    const [credentials, setCredentials] = useState({
        user: false,
        password: false
    })

    function Redirect() {
        window.location.href = ("http://192.168.0.150:3000/painelAdministrativo")
    }

    async function Login() {
        const classBuscaBD = new BuscaBD
        const { data } = await classBuscaBD.LoginPainel(credentials)
        console.log(data)
        if (!data.auth) { alert("Usuário ou senhas incorretos") } else {
            window.localStorage.setItem("auth", data.token)
            window.localStorage.setItem("primeiroNome", data.primeiroNome)
            window.localStorage.setItem("ultimoNome", data.ultimoNome)
            Redirect()

        }
    }

    return (

        <article className="login-article">
            <div className="login-article-div-titulo">
                <p>PAINEL ADMINISTRATIVO</p>
            </div>


            <div className="login-article-form-div">
                <p className="login-article-form-div-login-p">Sign In</p>
                <form className="login-article-form">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField label="E-mail *" autocomplete="email" id="email" name="email" type="email"
                            onBlur={(dados) => {
                                setCredentials(prevState => {
                                    return { ...prevState, user: dados.target.value }
                                })
                            }}
                        />
                        <TextField label="Senha *" autocomplete="current-password" id="password" name="password" type="password"
                            onBlur={(dados) => {
                                setCredentials(prevState => {
                                    return { ...prevState, password: dados.target.value }
                                })
                            }}
                        />
                        <Button variant="contained" color="primary" style={{ marginTop: "30px" }}
                            onClick={(e) => { Login(e) }}
                        >
                            Sign In
                        </Button>
                        <hr></hr>
                    </form>
                    {/* <p className="login-article-form-div-login-esqueceusenha">Esqueceu a senha ?</p> */}
                    <ForgetPassword />
                </form>
            </div>

        </article>
    )
}
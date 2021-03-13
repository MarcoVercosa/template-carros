import { React, useState, useEffect } from 'react';
import BuscaBD from "../../fetchBackEnd/api" //classe axios

import "./painelAdministrativo.css"
import Formulario from "../formulario/formulario" //FORMULARIO
import ListarAnuncios from "../listaAnuncios/listaAnuncios"
import DadosSite from "../dadosSite/dadosSite"
import ModalProfile from "./modalProfile"


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';



const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


export default function Paineladministrativo() {

    useEffect(async () => {
        const dadosLocalStorage = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        if (!dadosLocalStorage) {//se não houver dados no local storage
            alert("SESSÃO EXPIRADA. NECESÁRIO AUTENTICAÇÃO")
            return window.location.href = ("http://192.168.0.150:3000/login")
        }

        if (!dadosLocalStorage.tk) {
            // console.log("token não encontrado")
            alert("SESSÃO EXPIRADA. NECESÁRIO AUTENTICAÇÃO")
            return window.location.href = ("http://192.168.0.150:3000/login")
        }
        const classBuscaBD = new BuscaBD
        const { data } = await classBuscaBD.ValidaTokenPainel(dadosLocalStorage.tk)
        console.log(data)
        if (!data) {
            alert("SESSÃO EXPIRADA. NECESÁRIO AUTENTICAÇÃO")
            window.location.href = ("http://192.168.0.150:3000/login")
        }
    }, [])

    const [componentesAdministrativos, setComponentesAdministrativos] = useState({
        criarAnuncio: false,
        alterarAnuncio: false,
        deletarAnuncio: false,
        listaAnuncios: false,
        dadosSite: false,
        mensagemRetorno: false
    })

    const [mensagemDeRetorno, setMensagemDeRetorno] = useState(false)
    //recebe mensagem de sucesso ou não dos componentes

    const classes = useStyles();

    function SelecionaFormulario(dadosBotao, recebe) {
        if (recebe === "criarAnuncio") {

            setComponentesAdministrativos(prevState => {
                return {
                    ...prevState, criarAnuncio: true, alterarAnuncio: false,
                    deletarAnuncio: false, mensagemRetorno: false, listaAnuncios: false,
                    dadosSite: false
                }
            })
        }
        if (recebe === "alterarAnuncio") {
            setComponentesAdministrativos(prevState => {
                return {
                    ...prevState, criarAnuncio: false, alterarAnuncio: true,
                    deletarAnuncio: false, mensagemRetorno: false, listaAnuncios: false,
                    dadosSite: false
                }
            })


        }
        if (recebe === "deletarAnuncio") {
            setComponentesAdministrativos(prevState => {
                return {
                    ...prevState, criarAnuncio: false, alterarAnuncio: false,
                    deletarAnuncio: true, mensagemRetorno: false, listaAnuncios: false,
                    dadosSite: false
                }
            })
        }
        if (recebe === "listarAnuncios") {
            setComponentesAdministrativos(prevState => {
                return {
                    ...prevState, criarAnuncio: false, alterarAnuncio: false,
                    deletarAnuncio: false, mensagemRetorno: false, listaAnuncios: true,
                    dadosSite: false
                }
            })
        }
        if (recebe === "dadosSite") {
            setComponentesAdministrativos(prevState => {
                return {
                    ...prevState, criarAnuncio: false, alterarAnuncio: false,
                    deletarAnuncio: false, mensagemRetorno: false, listaAnuncios: false,
                    dadosSite: true
                }
            })
        }
    }

    function MensagemDeRetorno(mensagem) {

        //atribui a mensagem de retorno no state
        setComponentesAdministrativos(prevState => {
            return { ...prevState, mensagemRetorno: mensagem }
        })

        //após 15 segundos retira a mensagem da tela
        setTimeout(() => {
            console.log("Timeout ")
            setComponentesAdministrativos(prevState => {
                return { ...prevState, mensagemRetorno: false }
            })
        }, 15000)
    }


    return (
        <>
            <article className="paineladministrativo-article">

                <div className="paineladministrativo-div">
                    <h2>Bem vindo ao PAINEL ADMINISTRATIVO DE OFERTAS</h2>
                </div>
                <div className="paineladministrativo-div-mensagem" id="inicio" style={{ display: componentesAdministrativos.mensagemRetorno ? "flex" : "none" }}>{componentesAdministrativos.mensagemRetorno}</div>
                {/* Se mensagemDeRetorno houver dados flex, senão none */}

                <article className="paineladministrativo-article">

                    <div className="paineladministrativo-article-h4-profile" style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
                        <h4>SELECIONE A OPÇÃO DESEJADA:</h4>

                        <div>
                            <ModalProfile />
                        </div>
                    </div>


                    <div className="paineladministrativo-article-div-button">
                        <Button
                            onClick={(dadosBotao, envia = "criarAnuncio") => { SelecionaFormulario(dadosBotao, envia) }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SendIcon />}
                        >
                            CRIAR ANÚNCIO
                        </Button>

                        <Button
                            onClick={(dadosBotao, envia = "alterarAnuncio") => { SelecionaFormulario(dadosBotao, envia) }}
                            variant="contained"
                            color="default"
                            className={classes.button}
                            startIcon={<CloudUploadIcon />}
                        >
                            ALTERAR ANÚNCIO
                        </Button>

                        <Button
                            onClick={(dadosBotao, envia = "deletarAnuncio") => { SelecionaFormulario(dadosBotao, envia) }}
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            DELETAR ANÚNCIO
                        </Button>
                        <Button
                            style={{ backgroundColor: "rgb(241, 243, 103)" }}
                            onClick={(dadosBotao, envia = "listarAnuncios") => { SelecionaFormulario(dadosBotao, envia) }}
                            variant="contained"
                            className={classes.button}
                            startIcon={<FormatListNumberedIcon style={{ color: "black" }} />}
                        >
                            TODOS ANÚNCIOS
                        </Button>
                        <Button
                            style={{ backgroundColor: "ORANGE" }}
                            onClick={(dadosBotao, envia = "dadosSite") => { SelecionaFormulario(dadosBotao, envia) }}
                            variant="contained"
                            className={classes.button}
                            startIcon={<SettingsApplicationsIcon style={{ color: "black" }} />}
                        >
                            DADOS SITE
                        </Button>
                    </div>
                </article>

                <div className="seletorformulario">

                    {componentesAdministrativos.criarAnuncio &&
                        <>
                            <h2>PUBLICADOR DE ANÚNCIOS</h2>
                            <Formulario tipoFormulario="criarAnuncio" mensagemDeRetorno={MensagemDeRetorno} />
                        </>
                    }
                </div>
                <div className="seletorformulario">

                    {componentesAdministrativos.alterarAnuncio &&
                        <>
                            <h2>EDIÇÃO DE ANÚNCIOS</h2>

                            <Formulario tipoFormulario="alterarAnuncio" mensagemDeRetorno={MensagemDeRetorno} />
                        </>
                    }
                </div>
                <div className="seletorformulario">

                    {componentesAdministrativos.deletarAnuncio &&
                        <>
                            <h2>REMOVER ANÚNCIOS</h2>
                            <Formulario tipoFormulario="deletarAnuncio" mensagemDeRetorno={MensagemDeRetorno} />
                        </>
                    }
                </div>
                <div className="seletorformulario">

                    {componentesAdministrativos.listaAnuncios &&
                        <>
                            <h2>TODOS ANÚNCIOS</h2>
                            <ListarAnuncios />
                        </>
                    }
                </div>
                <div className="seletorformulario">

                    {componentesAdministrativos.dadosSite &&
                        <>
                            <h2>DADOS SITE</h2>
                            <DadosSite mensagemDeRetorno={MensagemDeRetorno} />
                        </>
                    }
                </div>

            </article>

        </>
    )
}
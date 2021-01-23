import { React, useState } from 'react';
import "./painelAdministrativo.css"
import Formulario from "./publicacao/publicacao"
import AlteracaoPublicacao from "./alteracao/alteracao"

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

    const [criarAnuncio, setCriarAnuncio] = useState(false)
    const [alterarAnuncio, setAlterarAnuncio] = useState(false)
    const [deletarAnuncio, setDeletarAnuncio] = useState(false)


    const classes = useStyles();

    function SelecionaFormulario(dadosBotao, recebe) {
        if (recebe === "criarAnuncio") {
            setCriarAnuncio(true)
            setAlterarAnuncio(false)
            setDeletarAnuncio(false)
        }
        if (recebe === "alterarAnuncio") {
            setCriarAnuncio(false)
            setAlterarAnuncio(true)
            setDeletarAnuncio(false)
        }
        if (recebe === "deletarAnuncio") {
            setCriarAnuncio(false)
            setAlterarAnuncio(false)
            setDeletarAnuncio(true)
        }
    }


    return (
        <>

            <div className="paineladministrativo-div">
                <h2>Bem vindo ao PAINEL ADMINISTRATIVO DE OFERTAS</h2>
            </div>


            <article className="paineladministrativo-article">

                <h4>SELECIONE A OPÇÃO DESEJADA:</h4>


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
                </div>
            </article>

            <div className="seletorformulario">

                {criarAnuncio &&
                    <>
                        <h2>PUBLICADOR DE ANÚNCIOS</h2>
                        <Formulario tipoFormulario="criarAnuncio" />
                    </>
                }

            </div>
            <div className="seletorformulario">

                {alterarAnuncio &&
                    <>
                        <h2>EDIÇÃO DE ANÚNCIOS</h2>

                        <Formulario tipoFormulario="alterarAnuncio" />
                    </>
                }

            </div>
            <div className="seletorformulario">

                {deletarAnuncio &&
                    <>
                        <h2>REMOVER ANÚNCIOS</h2>
                        <Formulario tipoFormulario="deletarAnuncio" />
                    </>
                }

            </div>

            {/* <div className="animacao">

                {alterarAnuncio && <AlteracaoPublicacao />}

            </div> */}
        </>

    )

}
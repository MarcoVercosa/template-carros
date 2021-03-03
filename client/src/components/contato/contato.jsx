import { React, useEffect, useState } from 'react';
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import Imagem from "./imagemContato.jpg"
import "./contato.css"
import BuscaBD from "../fetchBackEnd/api"
import ModalQueroContato from "./modalQueroContato"


import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    FormControlLabel, FormGroup, Checkbox, FormControl, FormLabel
} from '@material-ui/core/';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            // width: '95%',
        },
    },
}));


export default function Contato() {
    const classes = useStyles();

    const [contatos, setContatos] = useState({
        dadosLojaUm: false,
        dadosLojaDois: false,
        dadosLojaTres: false,
        dadosLojaQuatro: false,
        dadosLojaWhatsapp: false,
        dadosLojaFacebook: false,
        dadosLojaInstagram: false,
        dadosLojaYouTube: false,
        dadosEmail: false,
        dadosTotal: false
    })
    const [tenhoInteresse, setTenhoInteresse] = useState({
        nome: false,
        email: false,
        assunto: "CLIENTE FALE CONOSCO",
        ddd: false,
        telefone: false,
        dddCel: false,
        telefoneCel: false,
        whatsappRetorno: true,
        emailRetorno: true,
        telefoneRetorno: true,
        mensagem: "",
        idAnuncio: "não definido",
    })

    useEffect(async () => {

        const classBuscaBD = new BuscaBD()
        const resultado = await classBuscaBD.Contato()

        setContatos(prevState => {
            return {
                ...prevState,
                dadosLojaUm: resultado.data[0].lojaUm ? true : false,
                dadosLojaDois: resultado.data[0].lojaDois ? true : false,
                dadosLojaTres: resultado.data[0].lojaTres ? true : false,
                dadosLojaQuatro: resultado.data[0].lojaQuatro ? true : false,
                dadosLojaWhatsApp: resultado.data[0].whatsapp ? true : false,
                dadosLojaFacebook: resultado.data[0].facebook ? true : false,
                dadosLojaInstagram: resultado.data[0].instagram ? true : false,
                dadosLojaYouTube: resultado.data[0].youtube ? true : false,
                dadosEmail: resultado.data[0].email ? true : false,
                dadosTotal: resultado
            }
        })


    }, [])
    return (
        <>
            <Menu />
            <article className="contato-article">
                <div className="contato-article-div-imagem">
                    <img src={Imagem} />
                </div>
                <p className="contato-article-div-endereco-p">FALE CONOSCO</p>
                <hr></hr>
                <div className="contato-article-div-endereco">

                    {contatos.dadosLojaUm &&
                        <div>
                            <ul>
                                <li>
                                    <spam><i className="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaUm}
                                </li>
                                <li>
                                    <spam><i className="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].logradouroUm}
                                    <p>{contatos.dadosTotal.data[0].bairroCidadeUm}</p>
                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneUm}
                                </li>
                                <li>
                                    <spam><i class="far fa-clock"></i></spam> {contatos.dadosTotal.data[0].horarioFuncionamentoUm}
                                </li>
                            </ul>
                        </div>
                    }
                    {contatos.dadosLojaDois &&
                        <div className="menu-header-div-contato-tel-dois menu-header-div-contato-tel">
                            <ul>
                                <li>
                                    <spam><i className="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaDois}
                                </li>
                                <li>
                                    <spam><i className="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].logradouroDois}
                                    <p style={{}}>{contatos.dadosTotal.data[0].bairroCidadeDois}</p>

                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneDois}
                                </li>
                                <li>
                                    <spam><i class="far fa-clock"></i></spam> {contatos.dadosTotal.data[0].horarioFuncionamentoDois}
                                </li>
                            </ul>
                        </div>
                    }
                    {contatos.dadosLojaTres &&
                        <div className="menu-header-div-contato-tel-tres menu-header-div-contato-tel">
                            <ul>
                                <li>
                                    <spam><i className="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaTres}
                                </li>
                                <li>
                                    <spam><i className="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].logradouroTres}
                                    <p style={{}}>{contatos.dadosTotal.data[0].bairroCidadeTres}</p>

                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneTres}
                                </li>
                                <li>
                                    <spam><i class="far fa-clock"></i></spam> {contatos.dadosTotal.data[0].horarioFuncionamentoTres}
                                </li>
                            </ul>
                        </div>
                    }
                    {contatos.dadosLojaQuatro &&
                        <div className="menu-header-div-contato-tel-quatro menu-header-div-contato-tel">
                            <ul>
                                <li>
                                    <spam><i className="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaQuatro}
                                </li>
                                <li>
                                    <spam><i className="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].logradouroQuatro}
                                    <p style={{}}>{contatos.dadosTotal.data[0].bairroCidadeQuatro}</p>

                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneQuatro}
                                </li>
                                <li>
                                    <spam><i class="far fa-clock"></i></spam> {contatos.dadosTotal.data[0].horarioFuncionamentoQuatro}
                                </li>

                            </ul>
                        </div>
                    }
                    {contatos.dadosEmail &&
                        <a href={`mailto:${contatos.dadosTotal.data[0].email}`} className="contato-article-div-endereco-email"><i class="fas fa-envelope"></i>{contatos.dadosTotal.data[0].email}</a>
                    }
                </div>
                <div className="contato-article-div-endereco-outroscontatos">
                    <ul className="contato-article-div-endereco-outroscontatos-ul">
                        {contatos.dadosLojaWhatsApp &&
                            <li className="contato-article-div-endereco-outroscontatos-ul-whatsapp">
                                <a href={contatos.dadosTotal.data[0].whatsapp} target="_blank"><i className="fab fa-whatsapp fa-3x"></i></a>
                            </li>
                        }
                        {contatos.dadosLojaFacebook &&
                            <li className="contato-article-div-endereco-outroscontatos-ul-facebook">
                                <a href={contatos.dadosTotal.data[0].facebook} target="_blank"> <i className="fab fa-facebook fa-3x"></i></a>
                            </li>
                        }
                        {contatos.dadosLojaInstagram &&
                            <li className="contato-article-div-endereco-outroscontatos-ul-instagram">
                                <a href={contatos.dadosTotal.data[0].instagram} target="_blank" > <i className="fab fa-instagram fa-3x"></i></a>
                            </li>
                        }
                        {contatos.dadosLojaYouTube &&
                            <li className="contato-article-div-endereco-outroscontatos-ul-youtube">
                                <a href={contatos.dadosTotal.data[0].youtube} target="_blank"> <i className="fab fa-youtube fa-3x"></i></a>
                            </li>
                        }
                    </ul>
                </div>
                <div className="contato-article-div-mensagem">

                    <div className="contato-article-div-mensagem-div">
                        <form className="contato-article-div-mensagem-form">
                            {/* <p>TENHO INTERESSE</p> */}
                            {/* <hr style={{ color: "red" }} /> */}
                            <div>
                                <TextField label="Nome" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 40
                                    }}
                                    style={{ width: "100%" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, nome: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="E-mail" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 40
                                    }}
                                    style={{ width: "100%" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, email: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="DDD" id="standard-size-small" size="small" type="tel"
                                    style={{ width: "20%" }}
                                    inputProps={{
                                        maxlength: 2
                                    }}
                                    onBlur={(dados) => {

                                        if (!isNaN(dados.target.value)) {
                                            setTenhoInteresse(prevState => {
                                                return { ...prevState, ddd: dados.target.value }
                                            })
                                        } else {
                                            alert("Por favor, digite somente números")
                                            dados.target.value = ""
                                        }
                                    }}

                                />
                                <TextField label="Telefone" id="standard-size-small" size="small" type="tel"
                                    style={{ width: "70%", marginLeft: "10%" }}
                                    inputProps={{
                                        maxlength: 8
                                    }}
                                    onBlur={(dados) => {
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, telefone: dados.target.value }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="DDD" id="standard-size-small" size="small" type="tel"
                                    style={{ width: "20%" }}
                                    inputProps={{
                                        maxlength: 2
                                    }}
                                    onBlur={(dados) => {
                                        if (!isNaN(dados.target.value)) {
                                            setTenhoInteresse(prevState => {
                                                return { ...prevState, dddCel: dados.target.value }
                                            })
                                        } else {
                                            alert("Por favor, digite somente números")
                                            dados.target.value = ""
                                        }
                                    }}
                                />
                                <TextField label="Celular" id="standard-size-small" size="small" type="tel"
                                    style={{ width: "70%", marginLeft: "10%" }}
                                    inputProps={{
                                        maxlength: 9
                                    }}
                                    onBlur={(dados) => {
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, telefoneCel: dados.target.value }
                                        })
                                    }}
                                />

                            </div>

                            <div>
                                <TextField
                                    style={{ width: "100%", marginTop: "20px" }}
                                    inputProps={{
                                        maxlength: 500
                                    }}
                                    id="outlined-multiline-static"
                                    label="Mensagem"
                                    // value={tenhoInteresse.mensagem}
                                    value={tenhoInteresse.mensagem.toUpperCase()}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    onChange={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, mensagem: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: "25px" }}>
                                <FormControl component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Quero receber contato por:</FormLabel>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={tenhoInteresse.whatsappRetorno}
                                                onChange={(dados) => {
                                                    setTenhoInteresse(prevState => {
                                                        return { ...prevState, whatsappRetorno: dados.target.checked }
                                                    })
                                                }}
                                                name="whatsApp" color="primary" />}
                                            label="WhatsApp"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={tenhoInteresse.emailRetorno}
                                                onChange={(dados) => {
                                                    setTenhoInteresse(prevState => {
                                                        return { ...prevState, emailRetorno: dados.target.checked }
                                                    })
                                                }}
                                                name="e-mail" color="primary" />}
                                            label="E-mail"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox
                                                checked={tenhoInteresse.telefoneRetorno}
                                                onChange={(dados) => {
                                                    setTenhoInteresse(prevState => {
                                                        return { ...prevState, telefoneRetorno: dados.target.checked }
                                                    })
                                                }}
                                                name="telefone" color="primary" />}
                                            label="Telefone"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                                <ModalQueroContato tenhoInteresse={tenhoInteresse} />
                            </div>

                        </form>

                    </div>

                </div>

            </article>
            <Footer />
        </>
    )
}
import { React, useEffect, useState } from 'react';
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import ModalQueroVender from "./modalQueroVender"
import "./vender.css"
import Imagem from "./imagemVenda.jpg"
import BuscaBD from "../fetchBackEnd/api"

import {
    TextField,
    FormControlLabel, FormGroup, Checkbox, FormControl, FormLabel, useEventCallback
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            // width: '95%',
        },
    },
}));

export default function Vender() {

    const classes = useStyles();

    const [tenhoInteresse, setTenhoInteresse] = useState({
        nome: false,
        email: false,
        assunto: "TENHO INTERESSE EM VENDER MEU CARRO!",
        ddd: false,
        telefone: false,
        dddCel: false,
        telefoneCel: false,
        marca: false,
        modelo: false,
        anoModelo: false,
        cor: false,
        kilometro: false,
        valorAproximado: false,
        primeiroProprietario: false,
        seguro: false,
        sinistro: false,
        observacao: "",
        whatsappRetorno: true,
        emailRetorno: true,
        telefoneRetorno: true,
    })

    useEffect(() => {
        const classBuscaBD = new BuscaBD
        const resultado = classBuscaBD.SendEmailVender(tenhoInteresse)
    }, [])

    return (
        <>
            <Menu />
            <article className="vender-article">
                <div className="vender-article-div-imagem">
                    <img src={Imagem}></img>
                </div>

                <menu className="vender-article-menu">

                    <div className="vender-article-menu-div">
                        <p className="vender-article-menu-div-p">DESCRIÇÃO DO VEÍCULO</p>
                        <hr></hr>
                        <form className="vender-article-menu-div-form">
                            <p>"Os campos com * são de preenchimento obrigatórios."</p>
                            <div>
                                <TextField label="Nome *" id="standard-size-small" size="small" type="text"
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
                                <TextField label="E-mail *" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 40
                                    }}
                                    style={{ width: "100%", marginTop: "15px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, email: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="DDD *" id="standard-size-small" size="small" type="tel"
                                    style={{ width: "20%", marginTop: "15px" }}
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
                                <TextField label="Telefone *" id="standard-size-small" size="small" type="tel"
                                    style={{ width: "70%", marginLeft: "10%", marginTop: "15px" }}
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
                                    style={{ width: "20%", marginTop: "15px" }}
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
                                    style={{ width: "70%", marginLeft: "10%", marginTop: "15px" }}
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
                                <TextField label="Marca *" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 10
                                    }}
                                    style={{ width: "100%", marginTop: "15px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, marca: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="Modelo *" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 40
                                    }}
                                    style={{ width: "100%", marginTop: "15px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, modelo: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="Ano modelo *" id="standard-size-small" size="small" type="number"
                                    inputProps={{
                                        maxlength: 10
                                    }}
                                    style={{ width: "100%", marginTop: "15px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, anoModelo: dados.target.value }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="Cor *" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 10
                                    }}
                                    style={{ width: "100%", marginTop: "15px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, cor: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="Kilômetragem *" id="standard-size-small" size="small" type="text"
                                    inputProps={{
                                        maxlength: 10
                                    }}
                                    style={{ width: "100%", marginTop: "15px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, kilometro: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField label="Valor aproximado *" id="standard-size-small" size="small" type="number"
                                    inputProps={{
                                        maxlength: 10
                                    }}
                                    style={{ width: "100%", marginTop: "15px", marginBottom: "12px" }}
                                    onBlur={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, valorAproximado: dados.target.value }
                                        })
                                    }}
                                />
                            </div>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={tenhoInteresse.primeiroProprietario}
                                        onChange={(dados) => {
                                            setTenhoInteresse(prevState => {
                                                return { ...prevState, primeiroProprietario: dados.target.checked }
                                            })
                                        }}
                                        name="whatsApp" color="primary" />}
                                    label="Primeiro proprietário"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={tenhoInteresse.seguro}
                                        onChange={(dados) => {
                                            setTenhoInteresse(prevState => {
                                                return { ...prevState, seguro: dados.target.checked }
                                            })
                                        }}
                                        name="e-mail" color="primary" />}
                                    label="Possui seguro"
                                />
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={tenhoInteresse.sinistro}
                                        onChange={(dados) => {
                                            setTenhoInteresse(prevState => {
                                                return { ...prevState, sinistro: dados.target.checked }
                                            })
                                        }}
                                        name="telefone" color="primary" />}
                                    label="Houve sinistro"
                                />
                            </FormGroup>

                            <div>
                                <TextField
                                    style={{ width: "100%", marginTop: "20px" }}
                                    inputProps={{
                                        maxlength: 500
                                    }}
                                    id="outlined-multiline-static"
                                    label="Observação *"
                                    // value={tenhoInteresse.mensagem}
                                    value={tenhoInteresse.observacao}
                                    multiline
                                    rows={5}
                                    variant="outlined"
                                    onChange={(dados) => {
                                        dados.target.value = dados.target.value.toUpperCase()
                                        setTenhoInteresse(prevState => {
                                            return { ...prevState, observacao: dados.target.value.toUpperCase() }
                                        })
                                    }}
                                />
                            </div>
                            <div style={{ marginTop: "25px", marginTop: "15px" }}>
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
                                <ModalQueroVender tenhoInteresse={tenhoInteresse} />
                            </div>

                        </form>
                    </div>

                </menu>

            </article>
            <Footer />
        </>

    )
}
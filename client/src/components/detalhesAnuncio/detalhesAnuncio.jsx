import { react, useState, useEffect } from "react"
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import "./detalhesAnuncio.css"

import BuscaBD from "../fetchBackEnd/api"

import { makeStyles } from '@material-ui/core/styles';
import {
    Button, TextField, Radio, RadioGroup,
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


export default function DetalhesAnuncio(props) {
    const classes = useStyles();

    const [dadosAnuncio, setDadosAnuncio] = useState(false)
    const [imagens, setImagens] = useState(false)
    const [contadorImagens, setContadorImagens] = useState(0)
    const [botaoInfo, setBotaoInfo] = useState({
        botaoDetalhes: true,
        botaoObservacoes: false,
        dadosDetalhes: true,
        dadosObservacoes: false
    })
    const [tenhoInteresse, setTenhoInteresse] = useState({
        nome: false,
        email: false,
        ddd: false,
        telefone: false,
        dddCel: false,
        telefoneCel: false,
        whatsappRetorno: true,
        emailRetorno: true,
        telefoneRetorno: true,
        mensagem: false,
        idAnuncio: false
    })


    useEffect(async () => {
        const classBuscaBD = new BuscaBD

        const dados = await classBuscaBD.BuscaDetalheAnuncio(props.match.params.idanuncio)
        setDadosAnuncio(dados.data[0])
        setImagens(JSON.parse(dados.data[0].imagensPath))
        console.log(dados)
    }, [])

    function NavegaImagens(direcao) {
        const imagensQuery = document.querySelectorAll(".detalhesanuncio-article-div-carrosel img")
        if (direcao === "avancar") {
            imagensQuery[contadorImagens].classList.remove("selected")
            if (contadorImagens === imagensQuery.length - 1) {
                imagensQuery[0].classList.add("selected")
                setContadorImagens(0)
                return
            }
            imagensQuery[contadorImagens + 1].classList.add("selected")
            setContadorImagens(contadorImagens + 1)
        } else {

            imagensQuery[contadorImagens].classList.remove("selected")
            if (contadorImagens === 0) {
                imagensQuery[imagensQuery.length - 1].classList.add("selected")
                setContadorImagens(imagensQuery.length - 1)
                return
            }
            imagensQuery[contadorImagens - 1].classList.add("selected")
            setContadorImagens(contadorImagens - 1)
        }
    }
    async function FunctTenhoInteresse() {
        const classBuscaBD = new BuscaBD
        const resultado = classBuscaBD.SendEmail(tenhoInteresse)
        // console.log(tenhoInteresse)

    }


    return (
        <>
            <Menu />
            <article className="detalhesanuncio-article">
                <div className="detalhesanuncio-article-div-titulo">
                    <p>{dadosAnuncio.marca} {dadosAnuncio.modelo} {dadosAnuncio.motor} {dadosAnuncio.cambio}<spam>OFERTA: #{dadosAnuncio.id}</spam></p>
                </div>
                <div className="detalhesanuncio-article-div-carrosel">
                    {imagens &&
                        imagens.map((imagensMap, index) => {
                            return (

                                <img alt={imagensMap} key={index} className={index === 0 ? "selected" : ""}
                                    src={"http://192.168.0.150:9000/static/" + imagensMap} />
                            )
                        })
                    }

                    <div className="detalhesanuncioesquerda  detalhesanunciodirecao">
                        <i className="fa fa-chevron-left fa-4x arrow"
                            onClick={(dadosClick, direcao = "retornar") => {
                                NavegaImagens(direcao)
                            }}
                        ></i>
                    </div>
                    <div className="detalhesanunciodireita detalhesanunciodirecao">
                        <i className="fa fa-chevron-right fa-4x arrow"
                            onClick={(dadosClick, direcao = "avancar") => {
                                NavegaImagens(direcao)
                            }}
                        ></i>
                    </div>

                </div>

                <div className="detalhesanunciodireita-div-contato-info-detalhes">
                    <div style={{ display: "inline", marginTop: "0px", marginBottom: "20px", width: "40%" }} className={classes.root}>
                        <Button style={{ margin: "0" }} variant="contained" color="primary"
                            onClick={() => {
                                setBotaoInfo(prevState => {
                                    return {
                                        ...prevState, botaoDetalhes: !botaoInfo.botaoDetalhes, botaoObservacoes: !botaoInfo.botaoObservacoes,
                                        dadosDetalhes: !botaoInfo.dadosDetalhes, dadosObservacoes: !botaoInfo.dadosObservacoes
                                    }
                                })
                            }}
                            disabled={!botaoInfo.botaoObservacoes}
                        >
                            DETALHES
                    </Button>
                        <Button style={{ marginLeft: "40px" }} variant="contained" color="primary"
                            onClick={() => {
                                setBotaoInfo(prevState => {
                                    return {
                                        ...prevState, botaoDetalhes: !botaoInfo.botaoDetalhes, botaoObservacoes: !botaoInfo.botaoObservacoes,
                                        dadosDetalhes: !botaoInfo.dadosDetalhes, dadosObservacoes: !botaoInfo.dadosObservacoes
                                    }
                                })
                            }}
                            disabled={!botaoInfo.botaoDetalhes}
                        >
                            OBSERVAÇÕES
                    </Button>
                    </div>
                    {botaoInfo.dadosDetalhes &&
                        <>
                            <p className="detalhesanunciodireita-veiculo">Veículo: <spam>{dadosAnuncio.marca} - {dadosAnuncio.modelo}</spam></p>
                            <p className="detalhesanunciodireita-modelo">Modelo: <spam>{dadosAnuncio.motor} - {dadosAnuncio.cambio} - {dadosAnuncio.ano}</spam></p>
                            <p className="detalhesanunciodireita-cambio">Câmbio: <spam>{dadosAnuncio.cambio}</spam></p>
                            <p className="detalhesanunciodireita-combustivel">Combustível: <spam>{dadosAnuncio.combustivel}</spam></p>
                            <p className="detalhesanunciodireita-KM">KM: <spam>{dadosAnuncio.kilometro}</spam></p>
                            <p className="detalhesanunciodireita-portas">Portas: <spam>{dadosAnuncio.porta}</spam></p>
                            <p className="detalhesanunciodireita-portas">Final placa: <spam>{dadosAnuncio.finalPlaca}</spam></p>
                            <div className="detalhesanunciodireita-opcionais-div">
                                <p className="detalhesanunciodireita-opcionais">Opcionais:
                                <spam>{dadosAnuncio.airbag ? "AIRBAG" : ""} </spam><spam>{dadosAnuncio.alarme ? "ALARME" : " "}</spam>
                                    <spam> {dadosAnuncio.cdplayer ? "CDPLAYER" : ""}</spam> <spam>{dadosAnuncio.dvdplayer ? "DVDPLAYER" : ""}</spam>
                                    <spam>{dadosAnuncio.gps ? "GPS" : ""}</spam><spam>{dadosAnuncio.radio ? "RÁDIO" : ""}</spam>
                                    <spam>{dadosAnuncio.radioTocaFita ? "RÁDIO-TOCA-FITA" : ""}</spam><spam>{dadosAnuncio.computadorBordo ? "COMPUTADOR-DE-BORDO" : ""}</spam>
                                    <spam>{dadosAnuncio.controleTracao ? "CONTROLE-DE-TRAÇÃO" : ""}</spam><spam>{dadosAnuncio.controleVelocidade ? "CONTROLE-DE-VELOCIDADE" : ""}</spam>
                                    <spam>{dadosAnuncio.desembacadorTraseiro ? "DESEMBAÇADOR-TRASEIRO" : ""}</spam><spam>{dadosAnuncio.limpadorTraseiro ? "LIMPADOR-TRASEIRO" : ""}</spam>
                                    <spam>{dadosAnuncio.arCondicionado ? "AR-CONDICIONADO" : ""}</spam><spam>{dadosAnuncio.arQuente ? "AR-QUENTE" : ""}</spam>
                                    <spam>{dadosAnuncio.freioAbs ? "FREIO-ABS" : ""}</spam><spam>{dadosAnuncio.retrovisoresEletricos ? "RETROVISORES-ELÉTRICOS" : ""}</spam>
                                    <spam>{dadosAnuncio.travasEletricas ? "TRAVAS-ELÉTRICAS" : ""}</spam><spam>{dadosAnuncio.vidrosEletricos ? "VIDROS-ELÉTRICOS" : ""}</spam>
                                    <spam>{dadosAnuncio.retrovisoresFotocromicos ? "RETROVISORES-FOTOCROMICOS" : ""}</spam><spam>{dadosAnuncio.rodaLigaLeve ? "RODA-LIGA-LEVE" : ""}</spam>
                                    <spam>{dadosAnuncio.sensorChuva ? "SENSOR-CHUVA" : ""}</spam><spam>{dadosAnuncio.sensorEstacionamento ? "SENSOR-ESTACIONAMENTO" : ""}</spam>
                                    <spam>{dadosAnuncio.tetoSolar ? "TETO-SOLAR" : ""}</spam><spam>{dadosAnuncio.direcaoHidraulica ? "DIREÇÃO-HIDRÁULICA" : ""}</spam>
                                    <spam>{dadosAnuncio.volanteAltura ? "VOLANTE-COM-REGULAGEM-ALTURA" : ""}</spam><spam>{dadosAnuncio.bancoCouro ? "BANCOS-EM-COURO" : ""}</spam>
                                    <spam>{dadosAnuncio.encostoCabecaTraseiro ? "ENCOSTOS-CABEÇA-TRASEIRO" : ""}</spam><spam>{dadosAnuncio.bancosFrenteAquecimento ? "BANCOS-FRENTE-AQUECIMENTO" : ""}</spam>
                                    <spam>{dadosAnuncio.tracaoQuatroRodas ? "TRAÇÃO-QUATRO-RODAS" : ""}</spam><spam>{dadosAnuncio.protetorCacamba ? "PROTETOR-CAÇAMBA" : ""}</spam>
                                    <spam>{dadosAnuncio.blindado ? "BLINDADO" : ""}</spam><spam>{dadosAnuncio.farolXenonio ? "FAROL-XENONIO" : ""}</spam>
                                </p>
                            </div>
                        </>
                    }
                    {botaoInfo.dadosObservacoes &&
                        <div className="detalhesanunciodireita-div-contato-info-detalhes-sobre">
                            <p><spam>{dadosAnuncio.sobre}</spam></p>
                        </div>
                    }
                </div>
                <div className="detalhesanunciodireita-div-contato">
                    <p className="detalhesanunciodireita-div-contato-p">R$ {dadosAnuncio.valor},00</p>
                    {/* <div className="detalhesanunciodireita-div-contato-div"> */}
                    <form className="detalhesanunciodireita-div-contato-form">
                        <p>TENHO INTERESSE</p>
                        {/* <hr style={{ color: "red" }} /> */}
                        <div>
                            <TextField label="Nome" id="standard-size-small" size="small" type="text"
                                style={{ width: "90%" }}
                                onBlur={(dados) => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, nome: dados.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <TextField label="E-mail" id="standard-size-small" size="small" type="text"
                                style={{ width: "90%" }}
                                onBlur={(dados) => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, email: dados.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div>
                            <TextField label="DDD" id="standard-size-small" size="small" type="tel"
                                style={{ width: "20%" }}
                                onBlur={(dados) => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, ddd: dados.target.value }
                                    })
                                }}
                            />
                            <TextField label="Telefone" id="standard-size-small" size="small" type="tel"
                                style={{ width: "60%", marginLeft: "10%" }}
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
                                onBlur={(dados) => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, dddCel: dados.target.value }
                                    })
                                }}
                            />
                            <TextField label="Celular" id="standard-size-small" size="small" type="tel"
                                style={{ width: "60%", marginLeft: "10%" }}
                                onBlur={(dados) => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, telefoneCel: dados.target.value }
                                    })
                                }}
                            />

                        </div>

                        <div>
                            <TextField
                                style={{ width: "90%" }}
                                id="outlined-multiline-static"
                                label="Mensagem"
                                multiline
                                rows={5}
                                variant="outlined"
                                onBlur={(dados) => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, mensagem: dados.target.value }
                                    })
                                }}
                            />
                        </div>
                        <div style={{ marginTop: "25px" }}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Nosso Retorno:</FormLabel>
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
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" color="primary"
                                onClick={() => {
                                    setTenhoInteresse(prevState => {
                                        return { ...prevState, idAnuncio: dadosAnuncio.id }
                                    })
                                    FunctTenhoInteresse()
                                }}
                            >
                                ENVIAR
                            </Button>
                        </div>

                    </form>


                </div>


            </article >
            <Footer />
        </>
    )
} 
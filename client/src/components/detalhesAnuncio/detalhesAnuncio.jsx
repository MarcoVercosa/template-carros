import { react, useState, useEffect } from "react"
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import "./detalhesAnuncio.css"

import BuscaBD from "../fetchBackEnd/api"



export default function DetalhesAnuncio(props) {

    const [dadosAnuncio, setDadosAnuncio] = useState(false)
    const [imagens, setImagens] = useState(false)
    const [contadorImagens, setContadorImagens] = useState(0)

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


    return (
        <>
            <Menu />
            <article className="detalhesanuncio-article">
                <div className="detalhesanuncio-article-div-titulo">
                    <p>{dadosAnuncio.marca} {dadosAnuncio.modelo} {dadosAnuncio.motor} {dadosAnuncio.cambio}</p>
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
                    <p className="detalhesanunciodireita-veiculo">Veículo: <spam>{dadosAnuncio.marca} - {dadosAnuncio.modelo}</spam></p>
                    <p className="detalhesanunciodireita-modelo">Modelo: <spam>{dadosAnuncio.motor} - {dadosAnuncio.cambio}</spam></p>
                    <p className="detalhesanunciodireita-cambio">Câmbio: <spam>{dadosAnuncio.cambio}</spam></p>
                    <p className="detalhesanunciodireita-combustivel">Combustível: <spam>{dadosAnuncio.combustivel} - {dadosAnuncio.modelo}</spam></p>
                    <p className="detalhesanunciodireita-KM">KM: <spam>{dadosAnuncio.kilometro}</spam></p>
                    <p className="detalhesanunciodireita-portas">Portas: <spam>{dadosAnuncio.porta}</spam></p>
                    <p className="detalhesanunciodireita-portas">Final placa: <spam>{dadosAnuncio.finalPlaca}</spam></p>
                    <div className="detalhesanunciodireita-opcionais-div">
                        <p className="detalhesanunciodireita-opcionais">Opcionais:
                    <spam>{dadosAnuncio.airbag ? "AIRBAG" : ""} </spam><spam>{dadosAnuncio.alarme ? "ALARME" : " "}</spam>
                            <spam> {dadosAnuncio.cdplayer ? "CDPLAYER" : ""}</spam> <spam>{dadosAnuncio.dvdplayer ? "DVDPLAYER" : ""}</spam>
                            <spam>{dadosAnuncio.gps ? "GPS" : ""}</spam><spam>{dadosAnuncio.radio ? "RÁDIO" : ""}</spam>
                            <spam>{dadosAnuncio.radioTocaFita ? "RÁDIO" : ""}</spam><spam>{dadosAnuncio.computadorBordo ? "COMPUTADOR-DE-BORDO" : ""}</spam>
                            <spam>{dadosAnuncio.controleTracao ? "CONTROLE-DE-TRAÇÃO" : ""}</spam><spam>{dadosAnuncio.controleVelocidade ? "CONTROLE-DE-VELICIDADE" : ""}</spam>
                            <spam>{dadosAnuncio.desembacadorTraseiro ? "DESEMBAÇADOR-TRASEIRO" : ""}</spam><spam>{dadosAnuncio.limpadorTraseiro ? "LIMPADOR-TRASEIRO" : ""}</spam>
                            <spam>{dadosAnuncio.arCondicionado ? "AR-CONDICIONADO" : ""}</spam><spam>{dadosAnuncio.arQuente ? "AR-QUENTE" : ""}</spam>
                            <spam>{dadosAnuncio.freioAbs ? "FREIO-ABS" : ""}</spam><spam>{dadosAnuncio.retrovisoresEletricos ? "RETROVISORES-ELÉTRICOS" : ""}</spam>
                            <spam>{dadosAnuncio.travasEletricas ? "TRAVAS-ELÉTRICAS" : ""}</spam><spam>{dadosAnuncio.vidrosEletricos ? "VIDROS-ELÉTRICOS" : ""}</spam>
                            <spam>{dadosAnuncio.retrovisoresFotocromisos ? "RETROVISORES-FOTOCROMICOS" : ""}</spam><spam>{dadosAnuncio.rodaLigaLeve ? "RODA-LIGA-LEVE" : ""}</spam>
                            <spam>{dadosAnuncio.sensorChuva ? "SENSOR-CHUVA" : ""}</spam><spam>{dadosAnuncio.sensorEstacionamento ? "SENSOR-ESTACIONAMENTO" : ""}</spam>
                            <spam>{dadosAnuncio.tetoSolar ? "TETO-SOLAR" : ""}</spam><spam>{dadosAnuncio.direcaoHidraulica ? "DIREÇÃO-HIDRÁULICA" : ""}</spam>
                            <spam>{dadosAnuncio.volanteAltura ? "VOLANTE-COM-REGULAGEM-ALTURA" : ""}</spam><spam>{dadosAnuncio.bancoCouro ? "BANCOS-EM-COURO" : ""}</spam>
                            <spam>{dadosAnuncio.encostoCabecaTraseiro ? "ENCOSTOS-CABEÇA-TRASEIRO" : ""}</spam><spam>{dadosAnuncio.bancosFrenteAquecimento ? "BANCOS-FRENTE-AQUECIMENTO" : ""}</spam>
                            <spam>{dadosAnuncio.tracaoQuatroRodas ? "TRAÇÃO-QUATRO-RODAS" : ""}</spam><spam>{dadosAnuncio.protetorCacamba ? "PROTETOR-CAÇAMBA" : ""}</spam>
                            <spam>{dadosAnuncio.blindado ? "BLINDADO" : ""}</spam><spam>{dadosAnuncio.farolXenonio ? "FAROL-XENONIO" : ""}</spam>

                        </p>
                    </div>


                </div>
                <div className="detalhesanunciodireita-div-contato">
                    <h1>OK</h1>
                </div>
            </article >
            <Footer />
        </>
    )
} 
import { React, useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import SloganLeft from "./sloganLeft.png"
import TextField from '@material-ui/core/TextField';
import "./menu.css"

import BuscaBD from "../fetchBackEnd/api"




function Menu(props) {

    const [contatos, setContatos] = useState({

        dadosLojaUm: false,
        dadosLojaDois: false,
        dadosLojaTres: false,
        dadosLojaQuatro: false,
        dadosLojaWhatsapp: false,
        dadosLojaFacebook: false,
        dadosLojaInstagram: false,
        dadosLojaYouTube: false,
        dadosTotal: false
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
                dadosTotal: resultado
            }
        })

        console.log(props.dados)
    }, [])

    window.onscroll = (() => {
        if (document.body.scrollTop > 43 || document.documentElement.scrollTop > 43) {
            document.getElementById("menu-header-div").className = "menu-header-fixed"
        } else {
            document.getElementById("menu-header-div").className = "menu-header-normal"
        }
        console.log(document.documentElement.scrollTop)
    })

    return (

        <>
            <div className="menu">
                <div className="menu-header-div-contato">

                    {contatos.dadosLojaUm &&
                        <div className="menu-header-div-contato-tel-um menu-header-div-contato-tel">
                            <ul>
                                <li>
                                    <spam><i className="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaUm}
                                </li>
                                <li>
                                    <spam><i className="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].logradouroUm}
                                    <p style={{display: "flex", justifyContent: "center", margin: "0px", marginTop: "4px"}}>{contatos.dadosTotal.data[0].bairroCidadeUm}</p>
                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneUm}
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
                                    <p style={{display: "flex", justifyContent: "center", margin: "0px", marginTop: "4px"}}>{contatos.dadosTotal.data[0].bairroCidadeDois}</p>

                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneDois}
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
                                    <p style={{display: "flex", justifyContent: "center", margin: "0px", marginTop: "4px"}}>{contatos.dadosTotal.data[0].bairroCidadeTres}</p>

                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneTres}
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
                                    <p style={{display: "flex", justifyContent: "center", margin: "0px", marginTop: "4px"}}>{contatos.dadosTotal.data[0].bairroCidadeQuatro}</p>

                                </li>
                                <li>
                                    <spam><i className="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneQuatro}
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="menu-header-div-contato-redes-sociais">
                        <ul>
                            {contatos.dadosLojaWhatsApp &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].whatsapp} target="_blank"><i className="fab fa-whatsapp fa-3x"></i></a>
                                </li>
                            }
                            {contatos.dadosLojaFacebook &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].facebook} target="_blank"> <i className="fab fa-facebook fa-3x"></i></a>
                                </li>
                            }
                            {contatos.dadosLojaInstagram &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].instagram} target="_blank" > <i className="fab fa-instagram fa-3x"></i></a>
                                </li>
                            }
                            {contatos.dadosLojaYouTube &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].youtube} target="_blank"> <i className="fab fa-youtube fa-3x"></i></a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>

                <header className="menu-header">

                    <div id="menu-header-div" className="menu-header-normal">
                        <div className="menu-div-slogan-left">
                            <img src={SloganLeft} alt="Slogam Empresa" />
                        </div>

                        <div className="menu-head-div">
                            <ul>
                                <Link to="/">
                                    <li> 
                                        INÍCIO
                                
                                    </li>
                                </Link>
                                <Link to="/estoque">
                                    <li>
                                        ESTOQUE
                                    
                                    </li>
                                </Link>
                                <Link to="/blindados">
                                    <li>
                                        BLINDADOS
                                    </li>
                                </Link>
                                <Link to="/novos">
                                    <li>
                                        NOVOS
                                    </li>
                                </Link>
                                <li><Link to="/vender">
                                    VENDER
                            </Link>
                                </li>

                                <li>
                                    LOCALIZAÇÃO
                        </li>
                                <li>
                                    SOBRE NÓS
                        </li>
                                <li><Link to="/contato">
                                    CONTATO
                            </Link>
                                </li>
                            </ul>
                        </div>

                        <div style={{ marginLeft: "60px" }} className="head-div-search">

                            <TextField
                                style={{ marginTop: "13px", position: "absolute", width: "15%" }}
                                label="BUSCAR"
                                id="outlined-size-small"
                                defaultValue=""
                                variant="outlined"
                                size="small"
                                color="standard"
                            />


                        </div>
                        <spam className="menu-spam-search"><i className="fas fa-search fa-2x"></i></spam>

                    </div>
                </header>
            </div>
        </>
    )
}
export default memo(Menu)
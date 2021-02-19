import { React, useState, useEffect } from 'react';
import SloganLeft from "./sloganLeft.png"
import TextField from '@material-ui/core/TextField';
import "./menu.css"
import { Link } from 'react-router-dom';




export default function Menu(props) {

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

    useEffect(() => {

        if (props.dados) {
            setContatos(prevState => {
                return {
                    ...prevState,
                    dadosLojaUm: props.dados.data[0].lojaUm ? true : false,
                    dadosLojaDois: props.dados.data[0].lojaDois ? true : false,
                    dadosLojaTres: props.dados.data[0].lojaTres ? true : false,
                    dadosLojaQuatro: props.dados.data[0].lojaQuatro ? true : false,
                    dadosLojaWhatsApp: props.dados.data[0].whatsapp ? true : false,
                    dadosLojaFacebook: props.dados.data[0].facebook ? true : false,
                    dadosLojaInstagram: props.dados.data[0].instagram ? true : false,
                    dadosLojaYouTube: props.dados.data[0].youtube ? true : false,
                    dadosTotal: props.dados
                }
            })
        }
        console.log(props.dados)
    }, [props])

    window.onscroll = (() => {
        if (document.body.scrollTop > 64 || document.documentElement.scrollTop > 64) {
            document.getElementById("menu-header-div").className = "menu-header-div"
        } else {
            document.getElementById("menu-header-div").className = ""
        }
        // console.log(document.documentElement.scrollTop)
    })

    return (

        <>
            <div id="menu-header-div" className="">
                <div className="menu-header-div-contato">

                    {contatos.dadosLojaUm &&
                        <div className="menu-header-div-contato-tel-um">
                            <ul>
                                <li>
                                    <spam><i class="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaUm}
                                </li>
                                <li>
                                    <spam><i class="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].localUm}
                                </li>
                                <li>
                                    <spam><i class="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneUm}
                                </li>
                            </ul>
                        </div>
                    }
                    {contatos.dadosLojaDois &&
                        <div className="menu-header-div-contato-tel-dois">
                            <ul>
                                <li>
                                    <spam><i class="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaDois}
                                </li>
                                <li>
                                    <spam><i class="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].localDois}
                                </li>
                                <li>
                                    <spam><i class="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneDois}
                                </li>
                            </ul>
                        </div>
                    }
                    {contatos.dadosLojaTres &&
                        <div className="menu-header-div-contato-tel-tres">
                            <ul>
                                <li>
                                    <spam><i class="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaTres}
                                </li>
                                <li>
                                    <spam><i class="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].localTres}
                                </li>
                                <li>
                                    <spam><i class="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneTres}
                                </li>
                            </ul>
                        </div>
                    }
                    {contatos.dadosLojaQuatro &&
                        <div className="menu-header-div-contato-tel-tres">
                            <ul>
                                <li>
                                    <spam><i class="fas fa-store"></i></spam> {contatos.dadosTotal.data[0].lojaQuatro}
                                </li>
                                <li>
                                    <spam><i class="fas fa-map-marker-alt"></i></spam> {contatos.dadosTotal.data[0].localQuatro}
                                </li>
                                <li>
                                    <spam><i class="fas fa-phone-volume"></i></spam> {contatos.dadosTotal.data[0].telefoneQuatro}
                                </li>
                            </ul>
                        </div>
                    }
                    <div className="menu-header-div-contato-redes-sociais">
                        <ul>
                            {contatos.dadosLojaWhatsApp &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].whatsapp} target="_blank"><i class="fab fa-whatsapp fa-3x"></i></a>
                                </li>
                            }
                            {contatos.dadosLojaFacebook &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].facebook} target="_blank"> <i class="fab fa-facebook fa-3x"></i></a>
                                </li>
                            }
                            {contatos.dadosLojaInstagram &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].instagram} target="_blank" > <i class="fab fa-instagram fa-3x"></i></a>
                                </li>
                            }
                            {contatos.dadosLojaYouTube &&
                                <li>
                                    <a href={contatos.dadosTotal.data[0].youtube} target="_blank"> <i class="fab fa-youtube fa-3x"></i></a>
                                </li>
                            }
                        </ul>
                    </div>
                </div>

                <header className="menu-header">

                    <div className="menu-div-slogan-left">
                        <img src={SloganLeft} alt="Slogam Empresa" />
                    </div>

                    <div className="menu-head-div">
                        <ul>
                            <li>
                                INÍCIO
                        </li>
                            <li>
                                VEÍCULOS
                        </li>
                            <li>
                                BLINDADOS
                        </li>
                            <li>
                                VENDER
                        </li>
                            <li>
                                FINANCIAR
                        </li>
                            <li>
                                LOCALIZAÇÃO
                        </li>
                            <li>
                                SOBRE NÓS
                        </li>
                            <li><Link to="/paineladministrativo">
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
                    <spam className="menu-spam-search"><i class="fas fa-search fa-2x"></i></spam>


                </header>
            </div>
        </>

    )


}
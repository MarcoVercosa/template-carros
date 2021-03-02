import { React, useEffect, useState } from 'react';
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import Imagem from "./imagemVenda.jpg"
import "./vender.css"
import BuscaBD from "../fetchBackEnd/api"


export default function Vender() {

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
            <article className="vender-article">
                <div className="vender-article-div-imagem">
                    <img src={Imagem} />
                </div>
                <p className="vender-article-div-endereco-p">CONTATO</p>
                <hr></hr>
                <div className="vender-article-div-endereco">

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
                        <a href={`mailto:${contatos.dadosTotal.data[0].email}`} className="vender-article-div-endereco-email"><i class="fas fa-envelope"></i>{contatos.dadosTotal.data[0].email}</a>
                    }
                </div>
                <div className="vender-article-div-endereco-outroscontatos">
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

            </article>
            <Footer />
        </>
    )
}
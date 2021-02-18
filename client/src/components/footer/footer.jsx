import { React, useState, useEffect } from 'react';
import "./footer.css"

export default function Footer(props) {//recebe do app dados so BD  coluna sobreNos


    const [sobreNos, setSobreNos] = useState(false)

    useEffect(() => {
        if (props.dados.data) {
            setSobreNos(props.dados)
        }

    }, [props])

    return (
        <footer className="footer">
            <div className="footer-div">
                <h2 style={{ color: "white" }} >Seminovos MULTIMARCA</h2>
                <div className="footer-div-empresa footer-div-empresaum  ">

                    <ul>

                        <li>
                            Início
                        </li>
                        <hr />
                        <li>
                            Sobre nós
                        </li>
                        <hr />
                        <li>
                            Contato
                        </li>
                        <hr />
                        <li>
                            Veículos
                        </li>
                        <hr />
                    </ul>
                </div>
                <div className="footer-div-empresa footer-div-empresadois">
                    <ul>
                        <li>
                            Blindados
                    </li>
                        <hr />
                        <li>
                            Vender
                    </li>
                        <hr />
                        <li>
                            Financiar
                    </li>
                        <hr />
                    </ul>
                </div>
                <div className="footer-div-sobre">
                    <ul>
                        {sobreNos &&
                            <>
                                <h3>Sobre Nós</h3>
                                <hr />
                                <li>
                                    {sobreNos.data[0].sobreNos}
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </footer>
    )

}

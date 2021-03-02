import { React, useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import "./footer.css"
import BuscaBD from "../fetchBackEnd/api"

function Footer(props) {//recebe do app dados so BD  coluna sobreNos


    const [sobreNos, setSobreNos] = useState(false)

    useEffect(async () => {
        // if (props.dados.data) {
        //     setSobreNos(props.dados)
        // }
        const classBuscaBD = new BuscaBD()
        const resultado = await classBuscaBD.Footer()
        setSobreNos(resultado)

    }, [props])

    return (
        <footer className="footer">
            <div className="footer-div">
                <h2 style={{ color: "white" }} >Seminovos MULTIMARCA</h2>
                <div className="footer-div-empresa footer-div-empresaum  ">

                    <ul>

                        <li>
                            <Link to="/">
                                Início
                            </Link>
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
                            <Link to="/estoque">
                                Estoque
                            </Link>
                        </li>
                        <hr />
                    </ul>
                </div>
                <div className="footer-div-empresa footer-div-empresadois">
                    <ul>
                        <Link to="/blindados">
                            <li>
                                Blindados
                            </li>
                        </Link>
                        <hr />
                        <li><Link to="/vender">
                            Vender
                            </Link>
                        </li>
                        <hr />
                        <Link to="/novos">
                            <li>
                                Novos
                            </li>
                        </Link>
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
export default memo(Footer)

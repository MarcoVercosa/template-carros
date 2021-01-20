import React from 'react';
import SloganLeft from "./sloganLeft.png"
import TextField from '@material-ui/core/TextField';
import "./menu.css"




export default function Menu() {


    return (

        <>
            <div className="menu-header-div-contato">
                <div className="menu-header-div-contato-tel">
                    <ul>
                        <li>
                            <spam><i class="fas fa-phone-volume"></i></spam> (11) 0000-0000
                        </li>
                        <li>
                            <spam><i class="fas fa-map-marker-alt"></i></spam> Av. Dom Pedro 2
                        </li>
                    </ul>
                </div>
                <div className="menu-header-div-contato-redes-sociais">
                    <ul>
                        <li>
                            <i class="fab fa-facebook fa-2x"></i>
                        </li>
                        <li>
                            <i class="fab fa-instagram fa-2x"></i>
                        </li>
                        <li>
                            <i class="fab fa-youtube fa-2x"></i>
                        </li>
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
                        <li>
                            CONTATO
                </li>
                    </ul>
                </div>

                <div className="head-div-search">

                    <TextField
                        style={{ marginTop: "13px", position: "absolute", width: "14%" }}
                        label="BUSCAR"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        color="success"
                    />


                </div>
                <spam className="menu-spam-search"><i class="fas fa-search fa-2x"></i></spam>


            </header>
        </>

    )


}
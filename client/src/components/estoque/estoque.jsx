import { React, useState, useEffect } from 'react';
import Menu from "../../components/menu/menu"
import Footer from "../../components/footer/footer"
import "./estoque.css"

import Button from '@material-ui/core/Button';






export default function Estoque(props) {


    return (
        <>
            <Menu />

            <menu className="estoque-menu-left">
                <h3 className="titulo-estoque">VEÍCULOS EM ESTOQUE</h3>
                <div className="estoque-menu-left-div">
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Veículos Blindados</label>
                        <select id="blindado">
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Marca</label>
                        <select id="blindado">
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Preço</label>
                        <select id="blindado">
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Ano</label>
                        <select id="blindado">
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Câmbio</label>
                        <select id="blindado">
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-div">
                        <label for="blindado">Combustível</label>
                        <select id="blindado">
                            <option >SIM</option>
                            <option>NÃO</option>
                        </select>
                    </div>
                    <div className="estoque-menu-left-div-button">
                        <Button variant="contained" size="large" color="primary" >
                            BUSCAR
                        </Button>
                    </div>
                </div>
                <div className="estoque-article" >
                    <h1>Anúncios</h1>

                </div>

            </menu >
            <Footer />
        </>

    )
}
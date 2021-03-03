import { React, useState } from 'react';
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import "./vender.css"
import Imagem from "./imagemVenda.jpg"


export default function Vender() {
    return (
        <>
            <Menu />
            <article className="vender-article">
                <div className="vender-article-div-imagem">
                    <img src={Imagem}></img>
                </div>

            </article>
            <Footer />
        </>

    )
}
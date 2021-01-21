import { React, useEffect } from 'react';
import "./carroselPrincipal.css"
import ImagemUm from "./imagens/carros.jpg"
import ImagemDois from "./imagens/feliz.jpg"
import ImagemTres from "./imagens/lancamentos.jpg"
import ImagemQuatro from "./imagens/venda.jpg"


export default function CarroselPrincipal() {

    useEffect(() => {

        var imagens = document.querySelectorAll(".CarroselPrincipal-article-div img")
        var maximoImagens = imagens.length

        StatrCarrosel(imagens, maximoImagens)

    }, [])

    function StatrCarrosel(imagens, maximoImagens) {
        var numero = 0
        setInterval(() => {

            imagens[numero].classList.remove("selected")
            numero++
            if (numero >= maximoImagens) { numero = 0 }
            imagens[numero].classList.add("selected")

        }, 7000)
    }

    return (
        <article className="CarroselPrincipal-article">
            <div className="CarroselPrincipal-article-div">
                <img className="selected" src={ImagemUm} alt="inicio" />
                <img src={ImagemDois} alt="inicio" />
                <img src={ImagemTres} alt="inicio" />
                <img src={ImagemQuatro} alt="inicio" />
            </div>
        </article>

    )


}
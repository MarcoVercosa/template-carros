import { React, useEffect, useState } from 'react';
import "./carroselPrincipal.css"

import BuscaBD from "../fetchBackEnd/api"

import ImagemUm from "./imagens/carros.jpg"
import ImagemDois from "./imagens/feliz.jpg"
import ImagemTres from "./imagens/lancamentos.jpg"
import ImagemQuatro from "./imagens/venda.jpg"


export default function CarroselPrincipal() {

    const [imagensCarrosel, setImagensCarrosel] = useState([])

    useEffect(async () => {



        const classBuscaBD = new BuscaBD
        const imagensBD = await classBuscaBD.ImagensSlidePrincipal()
        setImagensCarrosel(JSON.parse(imagensBD.data[0].imagensSlide))

        var imagens = document.querySelectorAll(".CarroselPrincipal-article-div img")
        StartCarrosel(imagens)

    }, [])

    function StartCarrosel(imagens,) {
        var numero = 0
        setInterval(() => {
            imagens[numero].classList.remove("selected")

            numero++

            if (numero >= imagens.length) { numero = 0 }
            imagens[numero].classList.add("selected")

        }, 5000)
    }

    return (
        <article className="CarroselPrincipal-article">
            <div className="CarroselPrincipal-article-div">
                {imagensCarrosel &&
                    imagensCarrosel.map((dados, index) => {
                        return (

                            <img alt={dados} key={index} className={index === 0 ? "selected" : ""} src={"http://192.168.0.150:9000/static/" + dados} />


                        )
                    })

                }
                <div className="divdirecaoSlideRigth divdirecaoSlide">
                    <i className="fa fa-chevron-right fa-4x setaavanca "></i>
                </div>
                <div className="divdirecaoSlideLeft divdirecaoSlide direcaoSlide">
                    <i className="fa fa-chevron-left fa-4x setaretorna  direcaoSlide"></i>
                </div>
            </div>

        </article>

    )


}
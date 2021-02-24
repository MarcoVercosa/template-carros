import { React, useEffect, useState } from 'react';
import "./carroselPrincipal.css"

import BuscaBD from "../fetchBackEnd/api"

export default function CarroselPrincipal() {

    const [imagensCarrosel, setImagensCarrosel] = useState([])
    const [contadorImagensCarrossel, setContadorImagensCarrosel] = useState(0)

    useEffect(async () => {
        const classBuscaBD = new BuscaBD
        const imagensBD = await classBuscaBD.ImagensSlidePrincipal()
        setImagensCarrosel(JSON.parse(imagensBD.data[0].imagensSlide))

        var imagens = document.querySelectorAll(".CarroselPrincipal-article-div img")
        StartCarrosel(imagens)
    }, [])

    function StartCarrosel(imagens) {
        var numero = 0
        setInterval(() => {
            imagens[numero].classList.remove("selected") //remove a class select pois a imagem 0 ja renderiza por padrão
            numero++ //add + 1
            if (numero >= imagens.length) { numero = 0 }//se numero der o total de imagens, zera a var
            imagens[numero].classList.add("selected") //add a class select na imagem da vez
            setContadorImagensCarrosel(numero) //atualza o state parq que as setas da imagem possam enchergar a posição da imagem da vez
        }, 7000)
    }

    function NavegaCarrosel(direcao) {
        var numero = contadorImagensCarrossel
        var imagens = document.querySelectorAll(".CarroselPrincipal-article-div img")

        if (direcao === "avancar") {
            imagens[numero].classList.remove("selected") //remove a class select pois a imagem 0 ja renderiza por padrão
            if (numero >= imagens.length - 1) { numero = -1 } //se chegar ao final, deixa o numero negativo, pq o + 1 da linha abaixo será 0
            imagens[numero + 1].classList.add("selected")
            setContadorImagensCarrosel(numero + 1)
        } else {
            imagens[numero].classList.remove("selected") //remove a class select pois a imagem 0 ja renderiza por padrão
            if (numero === 0) { numero = imagens.length }
            imagens[numero - 1].classList.add("selected")
            setContadorImagensCarrosel(numero - 1)
        }
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
                    <i className="fa fa-chevron-right fa-4x setaavanca "
                        onClick={(dadosClick, direcao = "avancar") => {
                            NavegaCarrosel(direcao)
                        }}
                    ></i>
                </div>
                <div className="divdirecaoSlideLeft divdirecaoSlide direcaoSlide">
                    <i className="fa fa-chevron-left fa-4x setaretorna  direcaoSlide"
                        onClick={(dadosClick, direcao = "retornar") => {
                            NavegaCarrosel(direcao)
                        }}
                    ></i>
                </div>
            </div>

        </article>

    )


}
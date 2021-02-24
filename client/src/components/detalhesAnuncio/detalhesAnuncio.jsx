import { react, useState, useEffect } from "react"
import Menu from "../menu/menu"
import Footer from "../footer/footer"
import BuscaBD from "../fetchBackEnd/api"


export default function DetalhesAnuncio(props) {

    const [dadosAnuncio, setDadosAnuncio] = useState()

    useEffect(async () => {
        const classBuscaBD = new BuscaBD

        const dados = await classBuscaBD.BuscaDetalheAnuncio(props.match.params.idanuncio)
        setDadosAnuncio(dados.data[0].modelo)

    })


    return (
        <>
            <Menu />
            <h1>DETALHES ANÚNCIO</h1>
            <h1>{dadosAnuncio}</h1>
            <Footer />
        </>
    )
} 
import { React, useEffect, useState } from 'react';

import "./listaAnuncios.css"

import BuscaBD from "../../fetchBackEnd/api"
import SimpleModal from "./modalExibirAnuncio"


export default function ListarAnuncios() {

    const [dadosListaAnuncio, setDadosListaAnuncio] = useState({
        todasPaginas: false,
        paginacao: 0,
        paginaAvanca: 25,
        paginaRetorna: 0,
        paginaAtual: false,
        paginaFinal: false

    })

    useEffect(async () => {
        const classBuscaBD = new BuscaBD()
        let resultado = await classBuscaBD.ListarAnuncios()
        setDadosListaAnuncio(prevState => {
            let calculaTotalPaginas = 0
            if (resultado.data.length % 25 === 0) { calculaTotalPaginas = resultado.data.length / 25 } else { calculaTotalPaginas = Math.floor(resultado.data.length / 25 + 1) }
            //se total de resultados / 25 sobrar zero, então apenas divide, senão use o math, que não considera numero quebrado, e add mais 1 para bater com a sobra da página
            return {
                ...prevState, todasPaginas: resultado, paginacao: resultado.data.slice(
                    dadosListaAnuncio.paginaRetorna, dadosListaAnuncio.paginaAvanca),
                paginaAtual: 1,
                paginaFinal: calculaTotalPaginas
            }

        })
    }, [])

    function FunctionPaginacao(click, direcao) {

        if (direcao === "avancar") {
            if (dadosListaAnuncio.paginaAvanca >= dadosListaAnuncio.todasPaginas.data.length) {
                return
            }
            setDadosListaAnuncio(prevState => {
                return {
                    ...prevState,
                    paginacao: dadosListaAnuncio.todasPaginas.data.slice
                        (dadosListaAnuncio.paginaRetorna + 25, dadosListaAnuncio.paginaAvanca + 25)//recorta a array e mostra somente 25 linhas
                    , paginaAvanca: dadosListaAnuncio.paginaAvanca + 25,
                    paginaRetorna: dadosListaAnuncio.paginaRetorna + 25, //soma os contadores
                    paginaAtual: dadosListaAnuncio.paginaAtual += 1,
                }
            })
        }
        if (direcao === "retornar") {
            if (dadosListaAnuncio.paginaRetorna <= 0) {
                return
            }
            setDadosListaAnuncio(prevState => {
                return {
                    ...prevState,
                    paginacao: dadosListaAnuncio.todasPaginas.data.slice
                        (dadosListaAnuncio.paginaRetorna - 25, dadosListaAnuncio.paginaAvanca - 25)//recorta a array e mostra somente 25 linhas
                    , paginaAvanca: dadosListaAnuncio.paginaAvanca - 25,
                    paginaRetorna: dadosListaAnuncio.paginaRetorna - 25,
                    paginaAtual: dadosListaAnuncio.paginaAtual -= 1 //soma os contadores
                }
            })
        }

    }

    return (
        <>
            {dadosListaAnuncio.todasPaginas &&
                <h3 className="listaranuncio-h3">{dadosListaAnuncio.todasPaginas.data.length} ANÚNCIOS</h3>
            }
            <table className="listaranuncio-table">
                <tr className="listaranuncio-table-tr">
                    <th >
                        ID
                </th>
                    <th >
                        Marca
                </th>
                    <th>
                        Modelo
                </th>
                    <th>
                        Valor
                </th>
                    <th>
                        Ano
                </th>
                    <th>
                        Motor
                </th>
                    <th>
                        KM
                </th>
                    <th>
                        Câmbio
                </th>
                    <th>
                        Carroceria
                </th>
                    <th>
                        Final Placa
                </th>
                    <th>
                        Ativado
                </th>
                    <th>
                        MAIS
                </th>
                </tr>

                {dadosListaAnuncio.todasPaginas &&
                    dadosListaAnuncio.paginacao.map((dados, index) => {
                        return (

                            <tr className="listaranuncio-table-tr-tr">
                                <td style={{ width: "5%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.id}
                                </td>
                                <td style={{ width: "10%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.marca}
                                </td>
                                <td style={{ width: "9%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.modelo}
                                </td>
                                <td style={{ width: "7%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.valor}
                                </td>
                                <td style={{ width: "5%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.ano}
                                </td>
                                <td style={{ width: "12%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.motor}
                                </td>
                                <td style={{ width: "5.5%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.kilometro}
                                </td>
                                <td style={{ width: "5%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.cambio}
                                </td>
                                <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.carroceria}
                                </td>
                                <td style={{ width: "4%" }} className="listaranuncio-table-td" key={index} >
                                    {dados.finalPlaca}
                                </td>
                                <td style={{ width: "4%", backgroundColor: dados.ativado ? " rgb(157, 213, 131)" : "rgb(216, 114, 103)" }} className="listaranuncio-table-td" key={index} >
                                    {dados.ativado ? "ATIVADO" : "DESATIVADO"}
                                </td>
                                <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                    {<SimpleModal dados={dados.id} />}
                                </td>
                            </tr>
                        )
                    })
                }
            </table>

            <div className="listaranuncio-paginacao">
                <div className="listaranuncio-paginacao-left">
                    <i class="fas fa-arrow-circle-left fa-2x"
                        onClick={(dadosClick, direcao = "retornar") => { FunctionPaginacao(dadosClick, direcao) }}
                    ></i>
                </div>

                <div className="listaranuncio-paginacao-numeros">
                    {dadosListaAnuncio.paginaAtual} de {dadosListaAnuncio.paginaFinal}
                </div>

                <div className="listaranuncio-paginacao-rigth">
                    <i

                        onClick={(dadosClick, direcao = "avancar") => { FunctionPaginacao(dadosClick, direcao) }}
                        class="fas fa-arrow-circle-right fa-2x"></i>
                </div>
            </div>
        </>
    )

}

import { React, useEffect, useState } from 'react';

import "./listaAnuncios.css"

import BuscaBD from "../../fetchBackEnd/api"
import SimpleModal from "./modalExibirAnuncio"


export default function ListarAnuncios() {

    const [dadosListaAnuncio, setDadosListaAnuncio] = useState(false)

    useEffect(async () => {
        const classBuscaBD = new BuscaBD()
        let resultado = await classBuscaBD.ListarAnuncios()
        setDadosListaAnuncio(resultado)
    }, [])

    return (

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
                    MAIS
                </th>
            </tr>

            {dadosListaAnuncio &&
                dadosListaAnuncio.data.map((dados, index) => {
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
                            <td style={{ width: "10%" }} className="listaranuncio-table-td" key={index} >
                                {dados.valor}
                            </td>
                            <td style={{ width: "5%" }} className="listaranuncio-table-td" key={index} >
                                {dados.ano}
                            </td>
                            <td style={{ width: "15%" }} className="listaranuncio-table-td" key={index} >
                                {dados.motor}
                            </td>
                            <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                {dados.kilometro}
                            </td>
                            <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                {dados.cambio}
                            </td>
                            <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                {dados.carroceria}
                            </td>
                            <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                {dados.finalPlaca}
                            </td>
                            <td style={{ width: "8%" }} className="listaranuncio-table-td" key={index} >
                                {<SimpleModal dados={dados.id} />}
                            </td>
                        </tr>

                    )

                })
            }
        </table>

    )

}

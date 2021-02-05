
import { React, useState, useEffect, useCallback } from 'react';

import DadosOpcionais from "./opcionais" //formulario react opcionais
import BuscaBD from "../../fetchBackEnd/api" //classe axios
import FormData from 'form-data' //FormData classe que permite o multer identificar as imagens recebidas

import CriaAnuncio from "./functions/funtionCriarAnuncio"
//funcão para cadastro de anuncio


import "./formulario.css"
import ModalExcluirAnuncio from "./modals/modalExluirAnuncio"

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
    TextField,
    InputLabel, Select, FormControl
} from '@material-ui/core/';


export default function Formulario(props) {



    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();
    console.log(props.tipoFormulario)



    const [render, setRender] = useState(1930)//recebe loop para gerar os anos para seleção do ano do carro
    const [formulario, SetFormulario] = useState({
        valor: "",
        marca: "",
        ano: 2010,
        modelo: "",
        motor: "",
        kilometro: 0,
        combustivel: "",
        porta: 4,
        cambio: "",
        carroceria: "",
        finalPlaca: 0,
        sobre: "",
        imagensPath: false
    })

    const [formularioOpcionais, setFormularioOpcionais] = useState({
        aceitaTroca: false,
        IPVA: false,
        licenciado: false,
        airbag: false,
        alarme: false,
        cdplayer: false,
        dvdplayer: false,
        gps: false,
        radio: false,
        radioTocaFita: false,
        computadorBordo: false,
        controleTracao: false,
        controleVelocidade: false,
        desembacadorTraseiro: false,
        limpadorTraseiro: false,
        arCondicionado: false,
        arQuente: false,
        freioAbs: false,
        retrovisoresEletricos: false,
        retrovisoresFotocromicos: false,
        rodaLigaLeve: false,
        sensorChuva: false,
        sensorEstacionamento: false,
        tetoSolar: false,
        travasEletricas: false,
        vidrosEletricos: false,
        direcaoHidraulica: false,
        volanteAltura: false,
        bancoCouro: false,
        encostoCabecaTraseiro: false,
        bancosFrenteAquecimento: false,
        tracaoQuatroRodas: false,
        protetorCacamba: false,
        farolXenonio: false,

    })


    const [buscaParaAlterar, setBuscaParaAlterar] = useState("")
    //RECEBE PALAVRA PARA PESQUISAR NO BANCO DE DADOS

    const [abreModal, setAbreModal] = useState(false) //usado para abrir e fechar modal
    const [editarImagens, setEditarImagens] = useState({
        imagensDeletadas: [],
        imagensAdicionadas: [],
        mensagem: "",
        display: "none"
    })

    useEffect(() => {
        var anoAtual = new Date().getFullYear()
        var anoInicio = 1930
        var render = []
        while (anoInicio <= anoAtual) {
            render.push(<option >{anoInicio}</option>)
            anoInicio++
        }
        setRender(render)
    }, [])



    //########################  FUNÇÕES PARA CADASTRO //########################
    //########################  FUNÇÕES PARA CADASTRO //########################
    //########################  FUNÇÕES PARA CADASTRO //########################

    function PreviewImagem() { //Gera preview da simagens ao adicioná-las
        var armazena = []
        for (var i = 0; i < formulario.imagensPath.length; i++) {
            armazena.push(
                <>
                    <div className="formulario-preview-imagens-div">
                        <img alt={i} key={i} className="formulario-preview-imagens" src={URL.createObjectURL(formulario.imagensPath[i])} />
                    </div>
                </>
            )
        }
        console.log(formulario.imagensPath)
        return (
            <>
                {armazena}
            </>
        )
    }

    const FunctionOpcionais = useCallback((dados) => {//Essa func é chamada pelo componente externo Opcionais
        const { name } = dados.target //retira o campo name do obj que será o nome do campo no obj formulario
        setFormularioOpcionais(prevState => {
            return { ...prevState, [name]: dados.target.checked }
        })
        console.log(formularioOpcionais)
    }, [formularioOpcionais])

    function MostrarTopoPaginaComMensagem() {

        window.location.href = ("#inicio")

    }


    //########################  FUNÇÕES PARA EDITAR //########################
    //########################  FUNÇÕES PARA EDITAR //########################
    //########################  FUNÇÕES PARA EDITAR //########################



    //previw das imagens adicionadas no modal
    function PreviewImagemEdicao() { //Gera preview das imagens ao adicioná-las
        var armazena = []
        var push = []
        if (editarImagens.imagensAdicionadas.length > 0) {
            for (var i = 0; i < editarImagens.imagensAdicionadas.length; i++) {
                armazena.push(editarImagens.imagensAdicionadas[i])
            }
            //por algum motivo o map não roda no editarImagens.imagensAdicionadas. Tive que criar uma array com loop
            //e assim permitiu o map. Sempre que exclui alguma imagem ele atualiza o editarImagens.imagensAdicionadas
            //onde a var "armazena" busca as infos
            armazena.map((dados, index) => {
                push.push(
                    <>
                        <div className="formulario-div-formualario-form-imagem-div" style={{ rigth: "40%" }}>
                            <img alt={index} key={index} className="formulario-preview-imagens-edicao" src={URL.createObjectURL(dados)} />
                        </div>
                        <div className="foromulario-div-formualario-form-imagem-div-div">
                            <i class="fas fa-trash fa-2x icon-trash"
                                onClick={() => {
                                    var temp = []
                                    setEditarImagens((prevState => {
                                        temp = armazena.filter((recebe => recebe !== dados))
                                        return { ...prevState, imagensAdicionadas: temp }
                                    }))  //armazena a imagem deletada   

                                }}
                            ></i>

                        </div>
                    </>
                )
            })
        }
        console.log(formulario.imagensPath)
        return (
            <>
                {push}
            </>
        )
    }


    //########################  FUNÇÕES PARA EDITAR //########################
    //########################  FUNÇÕES PARA EDITAR //########################
    //########################  FUNÇÕES PARA EDITAR //########################


    //buscar as infos e preencher o formulário
    async function BuscarBDDados() {
        const classBuscaBD = new BuscaBD()
        const resultado = await classBuscaBD.BuscaBDGetDados(buscaParaAlterar)
        if (resultado.data.length < 1) {
            setBuscaParaAlterar("")
            alert("Anúncio não encontrado")
            return
        }

        SetFormulario({
            id: resultado.data[0].id,
            valor: "R$ " + resultado.data[0].valor + ",00",
            marca: resultado.data[0].marca,
            ano: resultado.data[0].ano,
            modelo: resultado.data[0].modelo,
            motor: resultado.data[0].motor,
            kilometro: resultado.data[0].kilometro,
            combustivel: resultado.data[0].combustivel,
            porta: resultado.data[0].porta,
            cambio: resultado.data[0].cambio,
            carroceria: resultado.data[0].carroceria,
            finalPlaca: resultado.data[0].finalPlaca,
            sobre: resultado.data[0].sobre,
            imagensPath: JSON.parse(resultado.data[0].imagensPath) // volta a origem da transformação do JSON.stringify, voltando a ser uma array
        })
        setFormularioOpcionais({
            aceitaTroca: resultado.data[0].aceitaTroca,
            IPVA: resultado.data[0].IPVA,
            licenciado: resultado.data[0].licenciado,
            airbag: resultado.data[0].airbag,
            alarme: resultado.data[0].alarme,
            cdplayer: resultado.data[0].cdplayer,
            dvdplayer: resultado.data[0].dvdplayer,
            gps: resultado.data[0].gps,
            radio: resultado.data[0].radio,
            radioTocaFita: resultado.data[0].radioTocaFita,
            computadorBordo: resultado.data[0].computadorBordo,
            controleTracao: resultado.data[0].controleTracao,
            controleVelocidade: resultado.data[0].controleVelocidade,
            desembacadorTraseiro: resultado.data[0].desembacadorTraseiro,
            limpadorTraseiro: resultado.data[0].limpadorTraseiro,
            arCondicionado: resultado.data[0].arCondicionado,
            arQuente: resultado.data[0].arQuente,
            freioAbs: resultado.data[0].freioAbs,
            retrovisoresEletricos: resultado.data[0].retrovisoresEletricos,
            retrovisoresFotocromicos: resultado.data[0].retrovisoresFotocromicos,
            rodaLigaLeve: resultado.data[0].rodaLigaLeve,
            sensorChuva: resultado.data[0].sensorChuva,
            sensorEstacionamento: resultado.data[0].sensorEstacionamento,
            tetoSolar: resultado.data[0].sensorEstacionamento,
            travasEletricas: resultado.data[0].travasEletricas,
            vidrosEletricos: resultado.data[0].vidrosEletricos,
            direcaoHidraulica: resultado.data[0].direcaoHidraulica,
            volanteAltura: resultado.data[0].volanteAltura,
            bancoCouro: resultado.data[0].bancoCouro,
            encostoCabecaTraseiro: resultado.data[0].encostoCabecaTraseiro,
            bancosFrenteAquecimento: resultado.data[0].bancosFrenteAquecimento,
            tracaoQuatroRodas: resultado.data[0].tracaoQuatroRodas,
            protetorCacamba: resultado.data[0].protetorCacamba,
            farolXenonio: resultado.data[0].farolXenonio,
        })
    }

    async function AtualizarDadosBD() {   //primeiro deleta as imagens solicitadas do storage

        const classBuscaBD = new BuscaBD()
        const dadosImagens = new FormData()//FormData classe que permite o multer identificar as imagens recebidas
        let caminhoImagensMulter = [] //armazena nomes das imagens no storage

        //se houver imagens a serem ADICIONADAS, adicione-as no Multer
        if (editarImagens.imagensAdicionadas.length > 0) {
            for (var i = 0; i < editarImagens.imagensAdicionadas.length; i++) {
                dadosImagens.append("files", editarImagens.imagensAdicionadas[i])
                //para enviar imagens tem q ser pelo FormData
                //primeiro coloca eles numa array com o loop for. Necessário quando é mais de uma imagem
            }
            const retornaImagenslLocationNodeMulter = await classBuscaBD.CadastraImagemMulter(dadosImagens)

            retornaImagenslLocationNodeMulter.data.map((dados) => {
                caminhoImagensMulter.push(dados.filename)//armezena o nome das imagens em array
            })
            // AtualizaTabelas(caminhoImagensMulter)
        }
        //se houver imagens a serem DELETADAS, delete-as no Storage
        if (editarImagens.imagensDeletadas.length > 0) {
            const resultado = await classBuscaBD.DeletaImagem(editarImagens.imagensDeletadas)
            console.log(resultado)
            AtualizaTabelas(caminhoImagensMulter)
        } else {
            AtualizaTabelas(caminhoImagensMulter)
        }

        //depois update dados  do anúncio no BD incluindo retirar as deletadas do BD
        async function AtualizaTabelas(caminhoImagensMulter) {

            var formularioTemp = formulario

            if (caminhoImagensMulter) {//se houve imaggens guardadas no storage
                var stringiFy = JSON.stringify(formulario.imagensPath.concat(caminhoImagensMulter))
                //transforma o json novamente em string. o Concat  add os valores da array caminhoImagensMulter permitindo tornar uma única array. parecido com o Objetc-consign
                formularioTemp = { ...formularioTemp, valor: formularioTemp.valor.slice(3, -3) } //rerira o R$ e o ,00 do valor
                formularioTemp = { ...formularioTemp, imagensPath: stringiFy }
            }
            else {
                var stringiFy = JSON.stringify(formulario.imagensPath)//transforma o json novamente em string
                formularioTemp = { ...formularioTemp, valor: formularioTemp.valor.slice(3, -3) }
                formularioTemp = { ...formularioTemp, imagensPath: stringiFy }
            }

            var formularioTempFinal = Object.assign(formularioTemp, formularioOpcionais)
            const resultado = await classBuscaBD.AtualizaBDDados(formularioTempFinal, buscaParaAlterar)
            console.log(resultado)
            props.mensagemDeRetorno(`${resultado.data} ID do anúncio: ${buscaParaAlterar}`)

            MostrarTopoPaginaComMensagem()

            setEditarImagens({
                imagensDeletadas: [],
                imagensAdicionadas: [],
                mensagem: "",
                display: "none"
            })
        }
    }

    return (
        <>
            {(props.tipoFormulario === "alterarAnuncio" || props.tipoFormulario === "deletarAnuncio") &&
                <div className="publicacao-div-search">
                    <TextField
                        onBlur={(recebe) => { setBuscaParaAlterar(recebe.target.value) }}
                        style={{ margin: "0 1% 3% 10%", }}
                        label="BUSCAR POR ID"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        color="success"
                    />
                    <Button
                        onClick={() => { BuscarBDDados() }}
                        style={{ margin: "0", backgroundColor: "white" }}
                        variant="contained"
                        color="inherit"
                        className={classes.button}
                        startIcon={<i class="fas fa-search fa-2x"></i>}
                    >
                        BUSCAR ANÚNCIO
                        </Button>
                </div>
            }
            {formulario.id &&
                <h2>ID ANÚNCIO: {formulario.id}</h2>
            }
            <div style={{ display: buscaParaAlterar || props.tipoFormulario === "criarAnuncio" ? "block" : "none" }} className="formulario-div-formualario"
                onSubmit={async (event) => {
                    // event.preventDefault()

                    if (formulario.valor === "" || formulario.marca === "" || formulario.modelo === "" || formulario.motor === ""
                        || formulario.combustivel === "" || formulario.cambio === "" || formulario.carroceria === ""
                        || formulario.sobre === "") {
                        alert("OS CAMPOS EM VERMELHO SÃO OBRIGATÓRIOS")
                        event.preventDefault()
                        return
                    }
                    if (formulario.imagensPath.length > 12) {
                        alert("SELECIONE ATÉ 12 IMAGENS")
                        event.preventDefault()
                        return
                    }

                    var resultado = await CriaAnuncio(event, formulario, formularioOpcionais)
                    // let mensagem = `${resultado.data.mensagem} ID: {resultado.data.resultado.insertId}`
                    props.mensagemDeRetorno(`${resultado.data.mensagem} ID do anúncio: ${resultado.data.resultado.insertId}`)
                }}>

                {/* <form className="paineladministrativo-div-formualario-form" method="post" enctype="multipart/form-data"> */}
                <form className="formulario-div-formualario-form" >

                    <TextField style={{ marginLeft: '20px', width: '15%' }}

                        onClick={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, valor: "" }
                            })
                        }}

                        onChange={(envia) => {

                            SetFormulario(prevState => {
                                return { ...prevState, valor: envia.target.value }
                            })
                        }}
                        onBlur={(envia) => {//formata para deixar decimais
                            if (envia.target.value.length < 1) { envia.target.value = 0 }
                            SetFormulario(prevState => {
                                const formater = new Intl.NumberFormat("pt-BR")
                                // alert(typeof (formater.format(parseFloat(envia.target.value))))
                                return { ...prevState, valor: "R$ " + formater.format(parseFloat(envia.target.value)) + ",00" }
                            })
                        }}

                        value={formulario.valor}
                        id="Valor"
                        label="VALOR - Só números"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        error={!formulario.valor}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />


                    <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                        <InputLabel shrink htmlFor="age-native-simple">Ano</InputLabel>

                        <Select

                            native
                            value={formulario.ano}
                            onChange={(envia) => {
                                SetFormulario(prevState => {
                                    return { ...prevState, ano: envia.target.value }
                                })
                            }}
                        >
                            <option aria-label="None" value="" />
                            {render}
                        </Select>

                    </FormControl>


                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, marca: envia.target.value }
                            })
                        }}
                        value={formulario.marca}
                        id="marca"
                        label="MARCA - ex: FIAT"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, modelo: envia.target.value }
                            })
                        }}
                        value={formulario.modelo}
                        id="modelo"
                        label="MODELO - ex: UP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        error={!formulario.modelo}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, motor: envia.target.value }
                            })
                        }}
                        value={formulario.motor}
                        id="motor"
                        label="MOTOR - ex: 2.0 TSI 16V"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        error={!formulario.motor}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField style={{ marginLeft: '20px', width: '15%' }}

                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, kilometro: envia.target.value }
                            })
                        }}
                        onClick={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, kilometro: 0 }
                            })
                        }}

                        onBlur={(envia) => {//formata para deixar decimais
                            if (envia.target.value.length < 1) { envia.target.value = 0 }
                            SetFormulario(prevState => {
                                const formater = new Intl.NumberFormat("pt-BR")

                                return { ...prevState, kilometro: formater.format(parseFloat(envia.target.value)) }
                            })
                        }}


                        id="filled-number"
                        label="KM - Só números"
                        type="number"
                        value={formulario.kilometro}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        margin="dense"
                    />
                    <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                        <InputLabel shrink htmlFor="age-native-simple">COMBUSTÍVEL</InputLabel>
                        <Select
                            native
                            value={formulario.combustivel}
                            error={!formulario.combustivel}
                            onChange={(envia) => {
                                SetFormulario(prevState => {
                                    return { ...prevState, combustivel: envia.target.value }
                                })
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option >GASOLINA</option>
                            <option >ALCOOL</option>
                            <option >FLEX</option>
                            <option >DIESEL</option>
                            <option >ELÉTRICO</option>
                            <option >HÍBRIDO</option>

                        </Select>
                    </FormControl>

                    <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                        <InputLabel shrink htmlFor="age-native-simple">PORTAS</InputLabel>
                        <Select
                            native
                            value={formulario.porta}
                            onChange={(envia) => {
                                SetFormulario(prevState => {
                                    return { ...prevState, porta: envia.target.value }
                                })
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                            <option >5</option>
                            <option >6</option>
                        </Select>
                    </FormControl>

                    <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                        <InputLabel shrink htmlFor="age-native-simple">CÂMBIO</InputLabel>
                        <Select
                            native
                            value={formulario.cambio}
                            error={!formulario.cambio}
                            onChange={(envia) => {
                                SetFormulario(prevState => {
                                    return { ...prevState, cambio: envia.target.value }
                                })
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option >MANUAL</option>
                            <option >AUTOMÁTICO</option>
                            <option >SEMIAUTOMÁTICO</option>
                            <option >AUTOMATIZADO</option>

                        </Select>
                    </FormControl>

                    <hr className="formulario-div-formualario-form-hr" />

                    <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                        <InputLabel shrink htmlFor="age-native-simple">CARROCERIAS</InputLabel>
                        <Select
                            native
                            value={formulario.carroceria}
                            error={!formulario.carroceria}
                            onChange={(envia) => {
                                SetFormulario(prevState => {
                                    return { ...prevState, carroceria: envia.target.value }
                                })
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option >HATCH</option>
                            <option >SEDÃ</option>
                            <option >PERUA/STATION-WAGONS (SW)</option>
                            <option >COUPÉ</option>
                            <option >CONVERSÍVEL</option>
                            <option >MINIVAN</option>
                            <option >LIMOUSINE</option>
                            <option >SUV / UTILITÁRIO ESPORTIVO</option>
                            <option >JIPE/</option>
                            <option >PICAPE/</option>

                        </Select>
                    </FormControl>

                    <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                        <InputLabel shrink htmlFor="age-native-simple">FINAL PLACA</InputLabel>
                        <Select
                            native
                            value={formulario.finalPlaca}
                            onChange={(envia) => {
                                SetFormulario(prevState => {
                                    return { ...prevState, finalPlaca: envia.target.value }
                                })
                            }}
                        >
                            <option aria-label="None" value="" />
                            <option >0</option>
                            <option >1</option>
                            <option >2</option>
                            <option >3</option>
                            <option >4</option>
                            <option >5</option>
                            <option >6</option>
                            <option >7</option>
                            <option >8</option>
                            <option >9</option>

                        </Select>
                    </FormControl>
                    <hr className="formulario-div-formualario-form-hr" />

                    <TextField style={{ marginLeft: '20px', width: '90%' }}
                        value={formulario.sobre}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, sobre: envia.target.value }
                            })
                        }}
                        id="sobre"
                        label="SOBRE O VEÍCULO "
                        variant="outlined"
                        multiline

                        className="FormularioCadastro_inputs"
                        margin="dense"
                        error={!formulario.sobre}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <hr className="formulario-div-formualario-form-hr" />
                    <DadosOpcionais formulario={formularioOpcionais} Opcionais={FunctionOpcionais} />

                    <hr className="formulario-div-formualario-form-hr" />
                    {props.tipoFormulario === "criarAnuncio" &&
                        <>
                            <label className="formulario-div-formualario-form-label-imagem">
                                Selecione as imagens:
                            <input type="file" name="file" multiple="multiple"

                                    onChange={(envia) => {
                                        SetFormulario(prevState => {
                                            return { ...prevState, imagensPath: envia.target.files }
                                        })
                                    }}
                                ></input>
                            </label>

                            {formulario.imagensPath.length > 0 &&
                                <>
                                    <h2>Preview Imagens</h2>
                                    <div className="formulario-preview-div">

                                        <PreviewImagem />
                                    </div>
                                </>
                            }
                        </>
                    }

                    {/* ABRE O MODAL*/}
                    {props.tipoFormulario === "alterarAnuncio" &&
                        <>
                            <h3 style={{ display: "flex", justifyContent: "center", textAlign: "center", color: "rgb(68, 68, 68)" }}>IMAGENS ANÚNCIO</h3>
                            {/* REMOÇÃO DE IMAGENS */}
                            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", marginRight: "9%" }}>
                                <a href="#abrirModal" className="modalbotao"><button type="button"
                                    className="modalbotao-abririmagem"
                                    onClick={() => { setAbreModal(true) }}
                                ><i class="far fa-images fa-4x"></i></button></a>
                            </div>
                            {/* <label className="label-imagens-altera-anuncio">{formulario.imagensPath.length} Imagens do anúncio</label> */}
                            <div className="modal-mensagem-alteração" style={{ display: editarImagens.display }}>
                                {editarImagens.mensagem}
                                {/* Mensagem quando pressiona o botao salvar dentro do modal */}
                            </div>

                            {abreModal &&
                                <div id="abrirModal" class="modal">
                                    <div >
                                        <a href="#fechar" title="Fechar" class="fechar">
                                            <button type="button">X</button>
                                        </a>
                                        <h3 style={{ color: "grey" }}>GERENCIAR IMAGENS ANÚNCIO</h3>
                                        <hr></hr>

                                        {formulario.imagensPath.length > 0 && //se existir imagem

                                            formulario.imagensPath.map((recebe) => { //JSON.parse pega a array que está em string e transforma em string
                                                return (
                                                    <>
                                                        <div class="formulario-div-formualario-form-imagem-div" >
                                                            <a href={"http://localhost:9000/static/" + recebe} target="_blank">
                                                                <img alt={recebe} key={recebe} src={"http://localhost:9000/static/" + recebe}></img>
                                                            </a>

                                                        </div>
                                                        <div className="foromulario-div-formualario-form-imagem-div-div">
                                                            <i class="fas fa-trash fa-2x icon-trash"
                                                                onClick={() => {

                                                                    setEditarImagens((prevState => {
                                                                        return { ...prevState, imagensDeletadas: [...editarImagens.imagensDeletadas, recebe] }
                                                                    }))  //armazena a imagem deletada   

                                                                    //Já Atualiza o formulario com as imagens NÃO DELETADAS
                                                                    var atualiza = formulario.imagensPath.filter(temp => temp !== recebe)
                                                                    SetFormulario((prevState => {
                                                                        return { ...prevState, imagensPath: atualiza }
                                                                    }))
                                                                }}
                                                            ></i>

                                                        </div>
                                                    </>
                                                )
                                            })

                                        }

                                        <PreviewImagemEdicao />


                                        <div className="modalbotao-salvar" >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="large"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                onClick={() => {
                                                    setEditarImagens((prevState => {
                                                        setAbreModal(false)

                                                        return { ...prevState, mensagem: "Cliquem em ALTERAR ANÚNCIO para salvar as alterações", display: "flex" }
                                                    }))
                                                }} >
                                                SALVAR
                                            </Button>
                                        </div>
                                        <div className="modalbotao-salvar">

                                            <label className="formulario-div-formualario-form-label-plus-imagens">
                                                ADICIONAR IMAGENS:
                                            </label>
                                            <hr></hr>
                                            <input className="input-imagens-edicao" type="file" name="file" multiple="multiple"
                                                onChange={(envia) => {
                                                    setEditarImagens(prevState => {
                                                        return { ...prevState, imagensAdicionadas: envia.target.files }
                                                    })
                                                }}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            }
                        </>
                    }
                    <div className="formulario-div-formualario-form-botao-publicar"
                        style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
                    >
                        {props.tipoFormulario === "criarAnuncio" &&


                            < Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                startIcon={<SaveIcon />}
                            >
                                PUBLICAR
                        </Button>

                        }
                        {props.tipoFormulario === "alterarAnuncio" &&
                            <Button
                                style={{ marginTop: "75px" }}
                                onClick={() => { AtualizarDadosBD() }}
                                variant="contained"
                                color="default"
                                className={classes.button}
                                startIcon={<CloudUploadIcon />}
                            >
                                ALTERAR ANÚNCIO
                        </Button>
                        }
                        {props.tipoFormulario === "deletarAnuncio" &&
                            <>

                                <ModalExcluirAnuncio
                                    buscaParaAlterar={buscaParaAlterar} formulario={formulario} mensagemDeRetorno={props.mensagemDeRetorno} MostrarTopoPaginaComMensagem={MostrarTopoPaginaComMensagem}
                                />
                            </>
                        }
                    </div>

                </form>
            </div >

        </>
    )
}

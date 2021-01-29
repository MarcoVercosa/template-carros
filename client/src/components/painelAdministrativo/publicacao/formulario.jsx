
import { React, useState, useEffect, useCallback } from 'react';

import DadosOpcionais from "./opcionais"
import BuscaBD from "../../fetchBackEnd/api"
import FormData from 'form-data'
import "./formulario.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    TextField,
    InputLabel, Select, FormControl
} from '@material-ui/core/';

// import Switch from '@material-ui/core/Switch';


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
        valor: 0,
        marca: "",
        ano: 2010,
        modelo: "",
        motor: "",
        kilometro: 0,
        combustivel: "",
        porta: 4,
        cambio: "",
        carroceria:"",
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
    const [imagensParaDeletar, setImagensParaDeletar] = useState({
        imagensDeletadas: [],
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

    function PreviewImagem ()  { //Gera preview da simagens ao adicioná-las
        var armazena = []
        for(var i = 0; i < formulario.imagensPath.length; i++){            
            armazena.push(
                <>                    
                    <div className="formulario-preview-imagens-div">
                        <img className="formulario-preview-imagens" src={URL.createObjectURL(formulario.imagensPath[i])} />
                    </div>
                </>
            )
        }
        console.log(formulario.imagensPath)
        return(            
            <>
                {armazena}
            </>
        )      
    }

    const FunctionOpcionais = useCallback((dados)=> {//Essa func é chamada pelo componente externo Opcionais
        const {name} = dados.target //retira o campo name do obj que será o nome do campo no obj formulario
        setFormularioOpcionais(prevState => {
            return {...prevState, [name]: dados.target.checked }
        })
        console.log(formularioOpcionais)
    },[formularioOpcionais])


    async function UploadImagens (event) {//fazupload imagens e retornar o nome e caminho de cada imagem no node
        event.preventDefault()
        if(formulario.marca === "" || formulario.modelo === "" || formulario.motor === ""
            || formulario.combustivel === "" || formulario.cambio === "" || formulario.carroceria === ""
            || formulario.sobre === ""){
                alert("OS CAMPOS EM VERMELHO SÃO OBRIGATÓRIOS")
                event.preventDefault()
                return
        }
        if (formulario.imagensPath.length > 12) {
            alert("SELECIONE ATÉ 12 IMAGENS")
            event.preventDefault()
            return
        }
        const classBuscaBD = new BuscaBD()// classe da Api onde está conf  o Axios
        const dadosImagens = new FormData()//FormData classe que permite o multer identificar as imagens
        for (var i = 0; i < formulario.imagensPath.length; i++) {
            dadosImagens.append("files", formulario.imagensPath[i])
        }
        //para enviar imagens tem q ser pelo FormData
        //primeiro coloca eles numa array com o loop for. Necessário quando é mais de uma imagem

        const retornaImagenslLocationNodeMulter = await classBuscaBD.BuscaBDPostImagem(dadosImagens)
        //faz o upload das imagens e o node vai retornar as imagens recebidas
        console.log(retornaImagenslLocationNodeMulter)
        let imagensPath = []
        //faz um map na array nos nomes das imagens retornadas do Node
        retornaImagenslLocationNodeMulter.data.map((dados) => {
            imagensPath.push(dados.filename)//armezeneo nome das imagens em array
        })
        const GuardaDados = await ArmazenaDadosBD(imagensPath) //chama a func armazena dados enviado o nome das imagens recebidas em array
        console.log(GuardaDados)
        
        props.mensagemDeRetorno(GuardaDados.data)
        
    }

    //com os nomes das imagens no node, reuni todos os dados do carro e junta com o nome das imagens
    async function ArmazenaDadosBD (recebeLocationImagens){ 
        const classBuscaBD = new BuscaBD()
        var imagensLocation = JSON.stringify(recebeLocationImagens);//transforma a array de localização das imagens em uma array String, para poder ser gravado em um único campo no BD
        var reuniDados = formulario
        reuniDados = { ...reuniDados, imagensPath: imagensLocation } //add os nomes da imagem no obj reunidados, que é o formulario
        var reunidadosFinal = Object.assign(reuniDados, formularioOpcionais) // Object.assign torna dois objs em um só
        console.log(reuniDados)
        const EnviaDadosBD = await classBuscaBD.BuscaBDPostDados(reunidadosFinal)
        return EnviaDadosBD
    }


    //########################  FUNÇÕES PARA EDITAR //########################
    //########################  FUNÇÕES PARA EDITAR //########################
    //########################  FUNÇÕES PARA EDITAR //########################


    //buscar as infos e preencher o formulário
    async function BuscarBDDados () {
        const classBuscaBD = new BuscaBD()
        const resultado = await classBuscaBD.BuscaBDGetDados(buscaParaAlterar)
        if (resultado.data.length < 1) {
            {
                alert("Anúncio não encontrado")
                return
            }
        }       

        SetFormulario({
            valor: resultado.data[0].valor,
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
    
    const AtualizarDadosBD = useCallback(async()  =>{   //primeiro deleta as imagens do storage
        const classBuscaBD = new BuscaBD()
        if(imagensParaDeletar.imagensDeletadas.length > 0){
           
            const resultado = await classBuscaBD.DeletaImagem(imagensParaDeletar.imagensDeletadas)
            console.log(resultado)
            AtualizaTabelas()
        }
        AtualizaTabelas() //depois update dados  do anúncio no BD
        async function AtualizaTabelas() {
            var stringiFy = JSON.stringify(formulario.imagensPath)
            var formularioTemp = formulario
           formularioTemp = {...formularioTemp, imagensPath: stringiFy}
           var formularioTempFinal = Object.assign(formularioTemp, formularioOpcionais)

            const resultado = await classBuscaBD.AtualizaBDDados(formularioTempFinal, buscaParaAlterar)
            console.log(resultado)
            props.mensagemDeRetorno(resultado.data)
        }
    
    },[formulario, formularioOpcionais])



    return (
        <>
            {props.tipoFormulario === "alterarAnuncio" &&
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



            <div className="formulario-div-formualario"
                onSubmit={(event) => {
                    // event.preventDefault()
                    UploadImagens(event)

                }}>

                {/* <form className="paineladministrativo-div-formualario-form" method="post" enctype="multipart/form-data"> */}
                <form className="formulario-div-formualario-form" >
        
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, valor: envia.target.value }
                            })
                        }}
                        value={formulario.valor}
                        id="Valor"
                        label="Valor automóvel"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
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
                        error = {!formulario.marca}
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
                        error = {!formulario.modelo}
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
                        error = {!formulario.motor}
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
                        id="filled-number"
                        label="KM"
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
                            error = {!formulario.combustivel}
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
                            error = {!formulario.cambio}
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
                            error = {!formulario.carroceria}
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
                        error = {!formulario.sobre}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <hr className="formulario-div-formualario-form-hr" />
                    <DadosOpcionais formulario = {formularioOpcionais} Opcionais = {FunctionOpcionais}/>
                   
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
                                        
                                <PreviewImagem/>
                                </div>   
                        </>
                        }
                    </>
                    }

                    {/* ABRE O MODAL*/}
                    {props.tipoFormulario === "alterarAnuncio" &&
                        <>
                            <a href="#abrirModal" className="modalbotao"><button type="button"
                                className="modalbotao-abririmagem"
                                onClick={() => { setAbreModal(true) }}
                            ><i class="fas fa-image fa-4x"></i></button></a>
                            <label className="label-imagens-altera-anuncio">{formulario.imagensPath.length} Imagens do anúncio</label>
                            <div className="modal-mensagem-alteração" style={{display: imagensParaDeletar.display}}>
                                 {imagensParaDeletar.mensagem}
                                </div>

                            {abreModal && 
                            <div id="abrirModal" class="modal">
                            <div >
                                <a href="#fechar" title="Fechar" class="fechar">
                                    <button type="button">X</button>
            
                                </a>
                                <h3>IMAGENS DO ANÚNCIO</h3>
                                <hr></hr>
            
                                {formulario.imagensPath.length > 0 && //se existir imagem
            
                                    formulario.imagensPath.map((recebe) => { //JSON.parse pega a array que está em string e transforma em string
                                        return (
                                            <>
                                                <div class="formulario-div-formualario-form-imagem-div" >
                                                    <a href={"http://localhost:9000/static/" + recebe} target="_blank">
                                                        <img key={recebe} src={"http://localhost:9000/static/" + recebe}></img>
                                                    </a>

                                                </div>
                                                <div className="foromulario-div-formualario-form-imagem-div-div">
                                                    <i class="fas fa-trash fa-2x icon-trash"
                                                        onClick={() => {            
                                                            
                                                            setImagensParaDeletar((prevState => {                                                                 
                                                                return { ...prevState, imagensDeletadas: [...imagensParaDeletar.imagensDeletadas, recebe] }}))  //armazena a imagem deletada
                                                                

                                                            var atualiza = formulario.imagensPath.filter(temp => temp !== recebe)//permaceça imagens que sao diferentes da deletada
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
                               
                                <div className="modalbotao-salvar">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        onClick={() => { 
                                            setImagensParaDeletar((prevState =>                                                 
                                                { 
                                                    setAbreModal(false) 
                                                    
                                                    return {...prevState, mensagem: "Cliquem em ALTERAR ANÚNCIO para salvar as alterações", display:"flex"}
                                                }))

                                        }} >
                                        GUARDAR
                                        
                                    </Button>
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
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                            >
                                REMOVER ANÚNCIO
                            </Button>
                        }
                    </div>

                </form>
            </div >

        </>
    )
}

import { React, useState, useEffect } from 'react';
import BuscaBD from "../../fetchBackEnd/api"
import FormData from 'form-data'
import "./publicacao.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    TextField, FormControlLabel,
    InputLabel, Select, FormControl
} from '@material-ui/core/';

import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));



export default function Formulario(props) {
    console.log(props.tipoFormulario)
    const [render, setRender] = useState(1930)//recebe loop para gerar os anos para seleção do ano do carro

    const [valor, setValor] = useState()
    const [marca, setMarca] = useState()
    const [ano, setAno] = useState()
    const [modelo, setModelo] = useState()
    const [motor, setMotor] = useState()
    const [kilometro, setKilometro] = useState()
    const [combustivel, setCombustivel] = useState()
    const [porta, setPorta] = useState()
    const [cambio, setCambio] = useState()
    const [carroceria, setCarroceria] = useState()
    const [finalPlaca, setFinalPlaca] = useState()
    const [sobre, setSobre] = useState()
    const [aceitaTroca, setAceitaTroca] = useState(false)
    const [IPVA, setIPVA] = useState(false)
    const [licenciado, setLicenciado] = useState(false)
    const [airbag, setAirbag] = useState(false)
    const [alarme, setAlarme] = useState(false)
    const [cdplayer, setCdplayer] = useState(false)
    const [dvdplayer, setDvdplayer] = useState(false)
    const [gps, setGps] = useState(false)
    const [radio, setRadio] = useState(false)
    const [radioTocaFita, setRadioTocaFita] = useState(false)
    const [computadorBordo, setComputadorBordo] = useState(false)
    const [controleTracao, setControleTracao] = useState(false)
    const [controleVelocidade, setControleVelocidade] = useState(false)
    const [desembacadorTraseiro, setDesembacadorTraseiro] = useState(false)
    const [limpadorTraseiro, setLimpadorTraseiro] = useState(false)
    const [arCondicionado, setArCondicionado] = useState(false)
    const [arQuente, setArQuente] = useState(false)
    const [freioAbs, setFreioAbs] = useState(false)
    const [retrovisoresEletricos, setRetrovisoresEletricos] = useState(false)
    const [retrovisoresFotocromicos, setRetrovisoresFotocromicos] = useState(false)
    const [rodaLigaLeve, setRodaLigaLeve] = useState(false)
    const [sensorChuva, setSensorChuva] = useState(false)
    const [sensorEstacionamento, setSensorEstacionamento] = useState(false)
    const [tetoSolar, setTetoSolar] = useState(false)
    const [travasEletricas, setTravasEletricas] = useState(false)
    const [vidrosEletricos, setVidrosEletricos] = useState(false)
    const [direcaoHidraulica, setDirecaoHidraulica] = useState(false)
    const [volanteAltura, setVolanteAltura] = useState(false)
    const [bancoCouro, setBancoCouro] = useState(false)
    const [encostoCabecaTraseiro, setEncostoCabecaTraseiro] = useState(false)
    const [bancosFrenteAquecimento, setBancosFrenteAquecimento] = useState(false)
    const [tracaoQuatroRodas, setTracaoQuatroRodas] = useState(false)
    const [protetorCacamba, setProtetorCacamba] = useState(false)
    const [farolXenonio, setFarolXenonio] = useState(false)
    const [imagens, setImagens] = useState([])


    const [buscaParaAlterar, setBuscaParaAlterar] = useState("")
    //campo pesquisa para alterar


    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    //########################  FUNÇÕES PARA CADASTRO //########################
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

    async function UploadImagens(event) {//fund inde vai fazer upload imagens e retornar o nome e caminho de cada imagem no node
        event.preventDefault()
        if (imagens.length > 12) {
            alert("SELECIONE ATÉ 12 IMAGENS")
            return
        }
        const classBuscaBD = new BuscaBD()// classe da Api onde está conf  o Axios
        const dadosImagens = new FormData()//FormData classe que permite o multer identificar as imagens
        for (var i = 0; i < imagens.length; i++) {
            dadosImagens.append("files", imagens[i])
        }
        //para enviar imagens tem q ser pelo FormData
        //primeiro coloca eles numa array com o loop for. Necessário quando é mais de uma imagem

        const retornaImagenslLocationNodeMulter = await classBuscaBD.BuscaBDPostImagem(dadosImagens)
        //faz o upload das imagens e o node vai retornar as imagens recebidas
        console.log(retornaImagenslLocationNodeMulter)
        let imagensPath = []
        retornaImagenslLocationNodeMulter.data.map((dados) => {
            imagensPath.push("http://localhost:9000/static/" + dados.filename)
        })
        const GuardaDados = await ArmazenaDadosBD(imagensPath)
        console.log(GuardaDados)
    }


    async function ArmazenaDadosBD(imagensPath) {//com os nomes dos arquivos no node, reuni todos os dados do carro e junta com o nome das imagens
        const classBuscaBD = new BuscaBD()
        var imagensPath = JSON.stringify(imagensPath);//transforma a array de localização das imagens em uma array String
        console.log(imagensPath)
        const reuniDados =
        {
            valor, marca, ano, modelo, motor, kilometro, combustivel, porta, cambio, carroceria, finalPlaca, sobre, aceitaTroca, IPVA, licenciado,
            airbag, alarme, cdplayer, dvdplayer, gps, radio, radioTocaFita, computadorBordo, controleTracao,
            controleVelocidade, desembacadorTraseiro, limpadorTraseiro, arCondicionado, arQuente, freioAbs,
            retrovisoresEletricos, travasEletricas, vidrosEletricos, retrovisoresFotocromicos, rodaLigaLeve, sensorChuva, sensorEstacionamento, tetoSolar,
            direcaoHidraulica, volanteAltura, bancoCouro, encostoCabecaTraseiro,
            bancosFrenteAquecimento, tracaoQuatroRodas, protetorCacamba, farolXenonio, imagensPath
        }
        console.log(reuniDados)
        const EnviaDadosBD = await classBuscaBD.BuscaBDPostDados(reuniDados)
        return EnviaDadosBD
    }


    //########################  FUNÇÕES PARA EDITAR //########################

    //buscar as infos e preencher o formulário
    async function BuscarBDDados() {
        const classBuscaBD = new BuscaBD()
        const resultado = await classBuscaBD.BuscaBDGetDados(buscaParaAlterar)
        PreencheFormulario(resultado)
    }
    function PreencheFormulario(resultado) {
        setValor(resultado.data[0].valor)
        setMarca(resultado.data[0].marca)
        setAno(resultado.data[0].ano)
        setModelo(resultado.data[0].modelo)
        setMotor(resultado.data[0].motor)
        setKilometro(resultado.data[0].kilometro)
        setCombustivel(resultado.data[0].combustivel)
        setPorta(resultado.data[0].porta)
        setCambio(resultado.data[0].cambio)
        setCarroceria(resultado.data[0].carroceria)
        setFinalPlaca(resultado.data[0].finalPlaca)
        setSobre(resultado.data[0].sobre)
        setAceitaTroca(resultado.data[0].aceitaTroca)
        setIPVA(resultado.data[0].IPVA)
        setLicenciado(resultado.data[0].licenciado)
        setAirbag(resultado.data[0].airbag)
        setAlarme(resultado.data[0].alarme)
        setCdplayer(resultado.data[0].cdplayer)
        setDvdplayer(resultado.data[0].dvdplayer)
        setGps(resultado.data[0].gps)
        setRadio(resultado.data[0].radio)
        setRadioTocaFita(resultado.data[0].radioTocaFita)
        setComputadorBordo(resultado.data[0].computadorBordo)
        setControleTracao(resultado.data[0].controleTracao)
        setControleVelocidade(resultado.data[0].controleVelocidade)
        setDesembacadorTraseiro(resultado.data[0].desembacadorTraseiro)
        setLimpadorTraseiro(resultado.data[0].limpadorTraseiro)
        setArCondicionado(resultado.data[0].arCondicionado)
        setArQuente(resultado.data[0].arQuente)
        setFreioAbs(resultado.data[0].freioAbs)
        setRetrovisoresEletricos(resultado.data[0].retrovisoresEletricos)
        setRetrovisoresFotocromicos(resultado.data[0].retrovisoresFotocromicos)
        setRodaLigaLeve(resultado.data[0].rodaLigaLeve)
        setSensorChuva(resultado.data[0].sensorChuva)
        setSensorEstacionamento(resultado.data[0].sensorEstacionamento)
        setTetoSolar(resultado.data[0].tetoSolar)
        setTravasEletricas(resultado.data[0].travasEletricas)
        setVidrosEletricos(resultado.data[0].vidrosEletricos)
        setDirecaoHidraulica(resultado.data[0].direcaoHidraulica)
        setVolanteAltura(resultado.data[0].volanteAltura)
        setBancoCouro(resultado.data[0].bancoCouro)
        setEncostoCabecaTraseiro(resultado.data[0].encostoCabecaTraseiro)
        setBancosFrenteAquecimento(resultado.data[0].bancosFrenteAquecimento)
        setTracaoQuatroRodas(resultado.data[0].tracaoQuatroRodas)
        setProtetorCacamba(resultado.data[0].protetorCacamba)
        setFarolXenonio(resultado.data[0].farolXenonio)
        setImagens(resultado.data[0].imagensPath)
    }

    //manda os dados para o update do anúncio
    function AtualizarDadosBd() {

    }


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
                    event.preventDefault()
                    UploadImagens(event)

                }}>

                {/* <form className="paineladministrativo-div-formualario-form" method="post" enctype="multipart/form-data"> */}
                <form className="formulario-div-formualario-form" >
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(recebe) => { setValor(recebe.target.value) }}
                        value={valor}
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
                            value={ano} onChange={(recebe) => { setAno(recebe.target.value) }}
                        >
                            <option aria-label="None" value="" />
                            {render}
                        </Select>

                    </FormControl>


                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(recebe) => { setMarca(recebe.target.value) }}
                        value={marca}
                        id="marca"
                        label="MARCA - ex: FIAT"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(recebe) => { setModelo(recebe.target.value) }}
                        value={modelo}
                        id="modelo"
                        label="MODELO - ex: UP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(recebe) => { setMotor(recebe.target.value) }}
                        value={motor}
                        id="motor"
                        label="MOTOR - ex: 2.0 TSI 16V"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField style={{ marginLeft: '20px', width: '15%' }}

                        onChange={(recebe) => { setKilometro(recebe.target.value) }}
                        id="filled-number"
                        label="KM"
                        type="number"
                        value={kilometro}
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
                            value={combustivel} onChange={(recebe) => { setCombustivel(recebe.target.value) }}
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
                            value={porta} onChange={(recebe) => { setPorta(recebe.target.value) }}
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
                            value={cambio} onChange={(recebe) => { setCambio(recebe.target.value) }}
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
                            value={carroceria} onChange={(recebe) => { setCarroceria(recebe.target.value) }}
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
                            value={finalPlaca} onChange={(recebe) => { setFinalPlaca(recebe.target.value) }}
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

                        onChange={(recebe) => { setSobre(recebe.target.value) }}
                        value={sobre}
                        id="sobre"
                        label="SOBRE O VEÍCULO "
                        variant="outlined"
                        multiline

                        className="FormularioCadastro_inputs"
                        margin="dense"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <hr className="formulario-div-formualario-form-hr" />

                    <h4>OPCIONAIS:</h4>
                    <div className="formulario-div-formualario-form-div-grid">

                        <div>
                            <FormControlLabel
                                checked={airbag}
                                control={<Switch color="primary" onChange={(recebe) => { setAirbag(recebe.target.checked) }} />}
                                label="AIRBAG"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={alarme}
                                control={<Switch color="primary" onChange={(recebe) => { setAlarme(recebe.target.checked) }} />}
                                label="ALARME"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={cdplayer}
                                control={<Switch color="primary" onChange={(recebe) => { setCdplayer(recebe.target.checked) }} />}
                                label="CD PLAYER"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={dvdplayer}
                                control={<Switch color="primary" onChange={(recebe) => { setDvdplayer(recebe.target.checked) }} />}
                                label="DVD PLAYER"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={gps}
                                control={<Switch color="primary" onChange={(recebe) => { setGps(recebe.target.checked) }} />}
                                label="GPS"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={radio}
                                control={<Switch color="primary" onChange={(recebe) => { setRadio(recebe.target.checked) }} />}
                                label="RÁDIO"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={radioTocaFita}
                                control={<Switch color="primary" onChange={(recebe) => { setRadioTocaFita(recebe.target.checked) }} />}
                                label="RÁDIO/TOCA FITA"
                                labelPlacement="start"
                            />
                        </div>

                        <div>
                            <FormControlLabel
                                checked={computadorBordo}
                                control={<Switch color="primary" onChange={(recebe) => { setComputadorBordo(recebe.target.checked) }} />}
                                label="Computador de bordo"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={controleTracao}
                                control={<Switch color="primary" onChange={(recebe) => { setControleTracao(recebe.target.checked) }} />}
                                label="Controle de tração"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={controleVelocidade}
                                control={<Switch color="primary" onChange={(recebe) => { setControleVelocidade(recebe.target.checked) }} />}
                                label="Controle de velocidade"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={desembacadorTraseiro}
                                control={<Switch color="primary" onChange={(recebe) => { setDesembacadorTraseiro(recebe.target.checked) }} />}
                                label="Desembaçador traseiro"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={limpadorTraseiro}
                                control={<Switch color="primary" onChange={(recebe) => { setLimpadorTraseiro(recebe.target.checked) }} />}
                                label="Limpador traseiro"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={farolXenonio}
                                control={<Switch color="primary" onChange={(recebe) => { setFarolXenonio(recebe.target.checked) }} />}
                                label="Farol de xenônio"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={arCondicionado}
                                control={<Switch color="primary" onChange={(recebe) => { setArCondicionado(recebe.target.checked) }} />}
                                label="Ar condicionado"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={arQuente}
                                control={<Switch color="primary" onChange={(recebe) => { setArQuente(recebe.target.checked) }} />}
                                label="Ar quente"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={freioAbs}
                                control={<Switch color="primary" onChange={(recebe) => { setFreioAbs(recebe.target.checked) }} />}
                                label="Freios ABS"
                                labelPlacement="start"
                            />
                        </div>

                        <div>
                            <FormControlLabel
                                checked={retrovisoresEletricos}
                                control={<Switch color="primary" onChange={(recebe) => { setRetrovisoresEletricos(recebe.target.checked) }} />}
                                label="Retrovisores elétricos"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={retrovisoresFotocromicos}
                                control={<Switch color="primary" onChange={(recebe) => { setRetrovisoresFotocromicos(recebe.target.checked) }} />}
                                label="Retrovisores fotocrômicos"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={rodaLigaLeve}
                                control={<Switch color="primary" onChange={(recebe) => { setRodaLigaLeve(recebe.target.checked) }} />}
                                label="Rodas de liga leve"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={sensorChuva}
                                control={<Switch color="primary" onChange={(recebe) => { setSensorChuva(recebe.target.checked) }} />}
                                label="Sensor de chuva"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={sensorEstacionamento}
                                control={<Switch color="primary" onChange={(recebe) => { setSensorEstacionamento(recebe.target.checked) }} />}
                                label="Sensor de estacionamento"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={tetoSolar}
                                control={<Switch color="primary" onChange={(recebe) => { setTetoSolar(recebe.target.checked) }} />}
                                label="Teto solar"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={travasEletricas}
                                control={<Switch color="primary" onChange={(recebe) => { setTravasEletricas(recebe.target.checked) }} />}
                                label="Travas elétricas"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={vidrosEletricos}
                                control={<Switch color="primary" onChange={(recebe) => { setVidrosEletricos(recebe.target.checked) }} />}
                                label="Vidros elétricos"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={direcaoHidraulica}
                                control={<Switch color="primary" onChange={(recebe) => { setDirecaoHidraulica(recebe.target.checked) }} />}
                                label="Direção hidráulica"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={volanteAltura}
                                control={<Switch color="primary" onChange={(recebe) => { setVolanteAltura(recebe.target.checked) }} />}
                                label="Volante regulagem altura"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={bancoCouro}
                                control={<Switch color="primary" onChange={(recebe) => { setBancoCouro(recebe.target.checked) }} />}
                                label="Bancos em couro"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={encostoCabecaTraseiro}
                                control={<Switch color="primary" onChange={(recebe) => { setEncostoCabecaTraseiro(recebe.target.checked) }} />}
                                label="Encosto de cabeça traseiro"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={bancosFrenteAquecimento}
                                control={<Switch color="primary" onChange={(recebe) => { setBancosFrenteAquecimento(recebe.target.checked) }} />}
                                label="Bancos frente aquecimento"
                                labelPlacement="start"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                checked={tracaoQuatroRodas}
                                control={<Switch color="primary" onChange={(recebe) => { setTracaoQuatroRodas(recebe.target.checked) }} />}
                                label="Tração 4x4"
                                labelPlacement="start"
                            />
                        </div>

                        <div>
                            <FormControlLabel
                                checked={protetorCacamba}
                                control={<Switch color="primary" onChange={(recebe) => { setProtetorCacamba(recebe.target.checked) }} />}
                                label="Protetor de caçamba"
                                labelPlacement="start"
                            />
                        </div>


                    </div>

                    <hr className="formulario-div-formualario-form-hr" />

                    <FormControlLabel style={{ marginRight: "20px" }}
                        checked={aceitaTroca}
                        value="start"
                        control={<Switch color="primary" onChange={(recebe) => { setAceitaTroca(recebe.target.checked) }} />}
                        label="Aceita troca"
                        labelPlacement="start"
                    />

                    <FormControlLabel style={{ marginRight: "20px" }}
                        checked={IPVA}
                        value="start"
                        control={<Switch color="primary" onChange={(recebe) => { setIPVA(recebe.target.checked) }} />}
                        label="IPVA pago"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        checked={licenciado}
                        value="start"
                        control={<Switch color="primary" onChange={(recebe) => { setLicenciado(recebe.target.checked) }} />}
                        label="Licenciado"
                        labelPlacement="start"
                    />

                    <hr className="formulario-div-formualario-form-hr" />
                    {props.tipoFormulario === "criarAnuncio" &&
                        <label className="formulario-div-formualario-form-label-imagem">
                            Selecione as imagens:
                    <input type="file" name="file" multiple="multiple" onChange={(recebe) => { setImagens(recebe.target.files) }}></input>
                        </label>
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
                                onClick={() => { AtualizarDadosBd() }}
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
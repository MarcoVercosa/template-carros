import { React, useState, useEffect } from 'react';
import BuscaBD from "../../fetchBackEnd/api"
import FormData from 'form-data'
import "./publicacao.css"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import SaveIcon from '@material-ui/icons/Save';
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



export default function Publicacao() {

    const [render, setRender] = useState(1930)//recebe loop para gerar os anos para seleção do ano do carro


    const [marca, setMarca] = useState("")
    const [ano, setAno] = useState("")
    const [modelo, setModelo] = useState("")
    const [motor, setMotor] = useState("")
    const [kilometro, setKilometro] = useState()
    const [combustivel, setCombustivel] = useState("")
    const [porta, setPorta] = useState("")
    const [carroceria, setCarroceria] = useState("")
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


    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();




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
            marca, ano, modelo, motor, kilometro, combustivel, porta, carroceria, aceitaTroca, IPVA, licenciado,
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


    return (

        <div className="paineladministrativo-div-formualario"
            onSubmit={(event) => {
                event.preventDefault()
                UploadImagens(event)

            }}>

            {/* <form className="paineladministrativo-div-formualario-form" method="post" enctype="multipart/form-data"> */}
            <form className="paineladministrativo-div-formualario-form" >
                <TextField style={{ marginLeft: '20px', width: '15%' }}
                    onBlur={(recebe) => { setMotor(recebe.target.value) }}
                    id="Valor"
                    label="Valor automóvel"
                    variant="outlined"
                    className="FormularioCadastro_inputs"
                    margin="dense"
                />


                <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                    <InputLabel htmlFor="age-native-simple">Ano</InputLabel>
                    <Select
                        native
                        value={ano} onChange={(recebe) => { setAno(recebe.target.value) }}
                    >
                        <option aria-label="None" value="" />
                        {render}
                    </Select>
                </FormControl>


                <TextField style={{ marginLeft: '20px', width: '15%' }}
                    onBlur={(recebe) => { setMarca(recebe.target.value) }}
                    id="marca"
                    label="MARCA - ex: FIAT"
                    variant="outlined"
                    className="FormularioCadastro_inputs"
                    margin="dense"
                />
                <TextField style={{ marginLeft: '20px', width: '15%' }}
                    onBlur={(recebe) => { setModelo(recebe.target.value) }}
                    id="modelo"
                    label="MODELO - ex: UP"
                    variant="outlined"
                    className="FormularioCadastro_inputs"
                    margin="dense"
                />
                <TextField style={{ marginLeft: '20px', width: '15%' }}
                    onBlur={(recebe) => { setMotor(recebe.target.value) }}
                    id="motor"
                    label="MOTOR - ex: 2.0 TSI 16V"
                    variant="outlined"
                    className="FormularioCadastro_inputs"
                    margin="dense"
                />

                <TextField style={{ marginLeft: '20px', width: '15%' }}

                    onBlur={(recebe) => { setKilometro(recebe.target.value) }}
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
                    <InputLabel htmlFor="age-native-simple">COMBUSTÍVEL</InputLabel>
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
                    <InputLabel htmlFor="age-native-simple">PORTAS</InputLabel>
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
                    <InputLabel htmlFor="age-native-simple">CÂMBIO</InputLabel>
                    <Select
                        native
                        value={porta} onChange={(recebe) => { setPorta(recebe.target.value) }}
                    >
                        <option aria-label="None" value="" />
                        <option >MANUAL</option>
                        <option >AUTOMÁTICO</option>
                        <option >SEMIAUTOMÁTICO</option>
                        <option >AUTOMATIZADO</option>

                    </Select>
                </FormControl>

                <hr className="paineladministrativo-div-formualario-form-hr" />

                <FormControl style={{ marginLeft: '20px', width: '15%' }}>
                    <InputLabel htmlFor="age-native-simple">CARROCERIAS</InputLabel>
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
                    <InputLabel htmlFor="age-native-simple">FINAL PLACA</InputLabel>
                    <Select
                        native
                        value={porta} onChange={(recebe) => { setPorta(recebe.target.value) }}
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
                <hr className="paineladministrativo-div-formualario-form-hr" />

                <TextField style={{ marginLeft: '20px', width: '90%' }}

                    onBlur={(recebe) => { setModelo(recebe.target.value) }}
                    id="sobre"
                    label="SOBRE O VEÍCULO "
                    variant="outlined"
                    multiline

                    className="FormularioCadastro_inputs"
                    margin="dense"
                />

                <hr className="paineladministrativo-div-formualario-form-hr" />

                <h4>OPCIONAIS:</h4>
                <div className="paineladministrativo-div-formualario-form-div-grid">

                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setAirbag(recebe.target.checked) }} />}
                            label="AIRBAG"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setAlarme(recebe.target.checked) }} />}
                            label="ALARME"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setCdplayer(recebe.target.checked) }} />}
                            label="CD PLAYER"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setDvdplayer(recebe.target.checked) }} />}
                            label="DVD PLAYER"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setGps(recebe.target.checked) }} />}
                            label="GPS"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setRadio(recebe.target.checked) }} />}
                            label="RÁDIO"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setRadioTocaFita(recebe.target.checked) }} />}
                            label="RÁDIO/TOCA FITA"
                            labelPlacement="start"
                        />
                    </div>

                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setComputadorBordo(recebe.target.checked) }} />}
                            label="Computador de bordo"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setControleTracao(recebe.target.checked) }} />}
                            label="Controle de tração"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setControleVelocidade(recebe.target.checked) }} />}
                            label="Controle de velocidade"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setDesembacadorTraseiro(recebe.target.checked) }} />}
                            label="Desembaçador traseiro"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setLimpadorTraseiro(recebe.target.checked) }} />}
                            label="Limpador traseiro"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setFarolXenonio(recebe.target.checked) }} />}
                            label="Farol de xenônio"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setArCondicionado(recebe.target.checked) }} />}
                            label="Ar condicionado"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setArQuente(recebe.target.checked) }} />}
                            label="Ar quente"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setFreioAbs(recebe.target.checked) }} />}
                            label="Freios ABS"
                            labelPlacement="start"
                        />
                    </div>

                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setRetrovisoresEletricos(recebe.target.checked) }} />}
                            label="Retrovisores elétricos"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setRetrovisoresFotocromicos(recebe.target.checked) }} />}
                            label="Retrovisores fotocrômicos"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setRodaLigaLeve(recebe.target.checked) }} />}
                            label="Rodas de liga leve"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setSensorChuva(recebe.target.checked) }} />}
                            label="Sensor de chuva"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setSensorEstacionamento(recebe.target.checked) }} />}
                            label="Sensor de estacionamento"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setTetoSolar(recebe.target.checked) }} />}
                            label="Teto solar"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setTravasEletricas(recebe.target.checked) }} />}
                            label="Travas elétricas"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setVidrosEletricos(recebe.target.checked) }} />}
                            label="Vidros elétricos"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setDirecaoHidraulica(recebe.target.checked) }} />}
                            label="Direção hidráulica"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setVolanteAltura(recebe.target.checked) }} />}
                            label="Volante regulagem altura"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setBancoCouro(recebe.target.checked) }} />}
                            label="Bancos em couro"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setEncostoCabecaTraseiro(recebe.target.checked) }} />}
                            label="Encosto de cabeça traseiro"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setBancosFrenteAquecimento(recebe.target.checked) }} />}
                            label="Bancos frente aquecimento"
                            labelPlacement="start"
                        />
                    </div>
                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setTracaoQuatroRodas(recebe.target.checked) }} />}
                            label="Tração 4x4"
                            labelPlacement="start"
                        />
                    </div>

                    <div>
                        <FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={(recebe) => { setProtetorCacamba(recebe.target.checked) }} />}
                            label="Protetor de caçamba"
                            labelPlacement="start"
                        />
                    </div>


                </div>

                <hr className="paineladministrativo-div-formualario-form-hr" />

                <FormControlLabel style={{ marginRight: "20px" }}
                    value="start"
                    control={<Switch color="primary" onChange={(recebe) => { setAceitaTroca(recebe.target.checked) }} />}
                    label="Aceita troca"
                    labelPlacement="start"
                />

                <FormControlLabel style={{ marginRight: "20px" }}
                    value="start"
                    control={<Switch color="primary" onChange={(recebe) => { setIPVA(recebe.target.checked) }} />}
                    label="IPVA pago"
                    labelPlacement="start"
                />

                <FormControlLabel
                    value="start"
                    control={<Switch color="primary" onChange={(recebe) => { setLicenciado(recebe.target.checked) }} />}
                    label="Licenciado"
                    labelPlacement="start"
                />

                <hr className="paineladministrativo-div-formualario-form-hr" />

                <label className="paineladministrativo-div-formualario-form-label-imagem">
                    Selecione as imagens:
                    <input type="file" name="file" multiple="multiple" onChange={(recebe) => { setImagens(recebe.target.files) }}></input>
                </label>

                <div paineladministrativo-div-formualario-form-botao-publicar
                    style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >
                        PUBLICAR
                    </Button>
                </div>

            </form>
        </div>


    )


}
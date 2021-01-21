import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./painelAdministrativo.css"

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import {
    TextField, FormControlLabel, Container,
    InputLabel, Select, FormControl, FormLabel, Radio, RadioGroup
} from '@material-ui/core/';

import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Paineladministrativo() {
    const [marca, setMarca] = useState("")
    const [ano, setAno] = useState("")
    const [render, setRender] = useState(1930)//recece loop para gerar os anos para seleção do ano do carro
    const [modelo, setModelo] = useState("")
    const [motor, setMotor] = useState("")
    const [kilometro, setKilometro] = useState()
    const [combustivel, setCombustivel] = useState("")
    const [porta, setPorta] = useState("")
    const [carroceria, setCarroceria] = useState("")
    const [troca, setTroca] = useState(false)
    const [IPVA, setIPVA] = useState(false)
    const [licenciado, setLicenciado] = useState(false)




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



    const classes = useStyles();
    return (
        <>

            <div className="paineladministrativo-div">
                <h2>Bem vindo ao PAINEL ADMINISTRATIVO DE OFERTAS</h2>
            </div>


            <article className="paineladministrativo-article">

                <h4>SELECIONE A OPÇÃO DESEJADA:</h4>


                <div className="paineladministrativo-article-div-button">
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SendIcon />}
                    >
                        CRIAR ANÚNCIO
                    </Button>

                    <Button
                        variant="contained"
                        color="default"
                        className={classes.button}
                        startIcon={<CloudUploadIcon />}
                    >
                        ALTERAR ANÚNCIO
                    </Button>

                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                    >
                        DELETAR ANÚNCIO
                    </Button>
                </div>
            </article>

            <div className="paineladministrativo-div-formualario">

                <form className="paineladministrativo-div-formualario-form">

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
                        label="MARCA - ex: nissan"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onBlur={(recebe) => { setModelo(recebe.target.value) }}
                        id="modelo"
                        label="MODELO - ex: sentra"
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

                    <FormControlLabel style={{ marginRight: "20px" }}
                        value="start"
                        control={<Switch color="primary" />}
                        label="Aceita troca"
                        labelPlacement="start"
                    />

                    <FormControlLabel style={{ marginRight: "20px" }}
                        value="start"
                        control={<Switch color="primary" />}
                        label="IPVA pago"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="Licenciado"
                        labelPlacement="start"
                    />

                </form>
            </div>

        </>

    )

}
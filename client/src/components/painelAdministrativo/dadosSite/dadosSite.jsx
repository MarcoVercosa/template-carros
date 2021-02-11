import React, { useState } from 'react';
import "./dadosSite.css"


import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    InputLabel, Select, FormControl, Switch, FormControlLabel
} from '@material-ui/core/';


export default function DadosSite(props) {

    const [formulario, SetFormulario] = useState({

        whatsapp: "",
        facebook: "",
        youtube: "",
        instagram: "",
        email: "",
        lojaUm: "",
        horarioFuncionamentoUm: "",
        localUm: "",
        cepUm: "",
        telefoneUm: "",
        lojaDois: "",
        horarioFuncionamentoDois: "",
        localDois: "",
        cepDois: "",
        telefoneDois: "",
        lojaTres: "",
        horarioFuncionamentoTres: "",
        localTres: "",
        cepTres: "",
        telefoneTres: "",
        lojaQuatro: "",
        horarioFuncionamentoQuatro: "",
        localQuatro: "",
        cepQuatro: "",
        telefoneQuatro: "",
        sobreNos: ""


    })

    return (

        <article className="dadossite-article">

            <div className="dadossite-article-div">

                <form className="dadossite-article-div-form">

                    <h4 className="dadossite-article-div-form-h4"> REDES SOCIAIS / EMAIL</h4>
                    <TextField style={{ marginLeft: '20px', width: '18%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, whatsapp: envia.target.value }
                            })
                        }}
                        value={formulario.whatsapp}
                        id="whatsapp"
                        label="WHATSAPP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '18%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, facebook: envia.target.value }
                            })
                        }}
                        value={formulario.facebook}
                        id="facebook"
                        label="FACEBOOK"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '18%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, youtube: envia.target.value }
                            })
                        }}
                        value={formulario.youtube}
                        id="youtube"
                        label="YOUTUBE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '18%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, instagram: envia.target.value }
                            })
                        }}
                        value={formulario.instagram}
                        id="instagram"
                        label="INSTAGRAM"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '18%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, email: envia.target.value }
                            })
                        }}
                        value={formulario.email}
                        id="email"
                        label="E-MAIL"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <hr style={{ marginTop: "20px" }}></hr>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <h4 className="dadossite-article-div-form-h4"> CONTATO LOJA 1 </h4>
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, lojaUm: envia.target.value }
                            })
                        }}
                        value={formulario.lojaUm}
                        id="loja"
                        label="LOJA 1"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '27%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, horarioFuncionamentoUm: envia.target.value }
                            })
                        }}
                        value={formulario.horarioFuncionamentoUm}
                        id="horarioFuncionamento"
                        label="HORÁRIO FUNCIONAMENTO"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.horarioFuncionamentoUm}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, localUm: envia.target.value }
                            })
                        }}
                        value={formulario.localUm}
                        id="local"
                        label="LOCAL"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.localUm}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, cepUm: envia.target.value }
                            })
                        }}
                        value={formulario.cepUm}
                        id="cep"
                        label="CEP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.cepUm}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, telefoneUm: envia.target.value }
                            })
                        }}
                        value={formulario.telefoneUm}
                        id="telefone"
                        label="TELEFONE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <hr style={{ marginTop: "20px" }}></hr>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <h4 className="dadossite-article-div-form-h4"> CONTATO LOJA 2 </h4>
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, lojaDois: envia.target.value }
                            })
                        }}
                        value={formulario.lojaDois}
                        id="lojaDois"
                        label="LOJA 2"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '27%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, horarioFuncionamentoDois: envia.target.value }
                            })
                        }}
                        value={formulario.horarioFuncionamentoDois}
                        id="horarioFuncionamentoDois"
                        label="HORÁRIO FUNCIONAMENTO"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, localDois: envia.target.value }
                            })
                        }}
                        value={formulario.localDois}
                        id="localDois"
                        label="LOCAL"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, cepDois: envia.target.value }
                            })
                        }}
                        value={formulario.cepDois}
                        id="cepDois"
                        label="CEP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, telefoneDois: envia.target.value }
                            })
                        }}
                        value={formulario.telefoneDois}
                        id="telefoneDois"
                        label="TELEFONE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <hr style={{ marginTop: "20px" }}></hr>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <h4 className="dadossite-article-div-form-h4"> CONTATO LOJA 3 </h4>
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, lojaTres: envia.target.value }
                            })
                        }}
                        value={formulario.lojaTres}
                        id="lojaTres"
                        label="LOJA 3"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '27%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, horarioFuncionamentoTres: envia.target.value }
                            })
                        }}
                        value={formulario.horarioFuncionamentoTres}
                        id="horarioFuncionamentoTres"
                        label="HORÁRIO FUNCIONAMENTO"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, localTres: envia.target.value }
                            })
                        }}
                        value={formulario.localTres}
                        id="localTres"
                        label="LOCAL"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, cepTres: envia.target.value }
                            })
                        }}
                        value={formulario.cepTres}
                        id="cepTres"
                        label="CEP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, telefoneTres: envia.target.value }
                            })
                        }}
                        value={formulario.telefoneTres}
                        id="telefoneTres"
                        label="TELEFONE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <hr style={{ marginTop: "20px" }}></hr>
                    <hr style={{ marginBottom: "20px" }}></hr>
                    <h4 className="dadossite-article-div-form-h4"> CONTATO LOJA 4 </h4>
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, lojaQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.lojaQuatro}
                        id="lojaQuatro"
                        label="LOJA 4"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '27%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, horarioFuncionamentoQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.horarioFuncionamentoQuatro}
                        id="horarioFuncionamentoQuatro"
                        label="HORÁRIO FUNCIONAMENTO"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, localQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.localQuatro}
                        id="localQuatro"
                        label="LOCAL"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, cepQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.cepQuatro}
                        id="cepQuatro"
                        label="CEP"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, telefoneQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.telefoneQuatro}
                        id="telefoneQuatro"
                        label="TELEFONE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <hr style={{ marginTop: "20px" }}></hr>
                    <hr style={{ marginBottom: "20px" }}></hr>

                    <h4 className="dadossite-article-div-form-h4"> SOBRE</h4>
                    <TextField style={{ marginLeft: '20px', width: '55%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, sobreNos: envia.target.value }
                            })
                        }}
                        value={formulario.sobreNos}
                        id="sobreNos"
                        label="SOBRE NÓS"
                        variant="outlined"
                        multiline
                        rows={5}
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.marca}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />



                </form>

            </div>

        </article>
    )
}
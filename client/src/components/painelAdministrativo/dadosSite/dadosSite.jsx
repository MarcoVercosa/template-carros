import React, { useState, useEffect } from 'react';
import "./dadosSite.css"
import SimpleModal from "./modalImagensSlide"


import BuscaBD from "../../fetchBackEnd/api"
import FormData from 'form-data' //FormData classe que permite o multer identificar as imagens recebidas


import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
    TextField,
    Button
} from '@material-ui/core/';


export default function DadosSite(props) {

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

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
        sobreNos: "",
        imagensSlide: false
    })

    useEffect(async () => {

        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.GetInfoSite()
        PolulaFormulario(resultado)

    }, [])

    function PolulaFormulario(resultado) {
        SetFormulario({
            whatsapp: resultado.data[0].whatsapp,
            facebook: resultado.data[0].facebook,
            youtube: resultado.data[0].youtube,
            instagram: resultado.data[0].instagram,
            email: resultado.data[0].email,
            lojaUm: resultado.data[0].lojaUm,
            horarioFuncionamentoUm: resultado.data[0].horarioFuncionamentoUm,
            localUm: resultado.data[0].localUm,
            cepUm: resultado.data[0].cepUm,
            telefoneUm: resultado.data[0].telefoneUm,
            lojaDois: resultado.data[0].lojaDois,
            horarioFuncionamentoDois: resultado.data[0].horarioFuncionamentoDois,
            localDois: resultado.data[0].localDois,
            cepDois: resultado.data[0].cepDois,
            telefoneDois: resultado.data[0].telefoneDois,
            lojaTres: resultado.data[0].lojaTres,
            horarioFuncionamentoTres: resultado.data[0].horarioFuncionamentoTres,
            localTres: resultado.data[0].localTres,
            cepTres: resultado.data[0].cepTres,
            telefoneTres: resultado.data[0].telefoneTres,
            lojaQuatro: resultado.data[0].lojaQuatro,
            horarioFuncionamentoQuatro: resultado.data[0].horarioFuncionamentoQuatro,
            localQuatro: resultado.data[0].localQuatro,
            cepQuatro: resultado.data[0].cepQuatro,
            telefoneQuatro: resultado.data[0].telefoneQuatro,
            sobreNos: resultado.data[0].sobreNos,
            imagensSlide: resultado.data[0].imagensSlide
        })
    }

    async function DadosModal(dados) {
        const dadosImagens = new FormData()
        const classBuscaBD = new BuscaBD
        let caminhoImagensMulter = [] //armazena nomes das imagens no storage

        if (dados.imagensAdicionadas.length > 0) {
            //se houver imagens a serem ADICIONADAS, adicione-as no Multer
            for (var i = 0; i < dados.imagensAdicionadas.length; i++) {
                dadosImagens.append("files", dados.imagensAdicionadas[i])
                //para enviar imagens tem q ser pelo FormData
                //primeiro coloca eles numa array com o loop for. Necessário quando é mais de uma imagem
            }
            const retornaImagenslLocationNodeMulter = await classBuscaBD.CadastraImagemMulter(dadosImagens)
            retornaImagenslLocationNodeMulter.data.map((recebe) => {
                caminhoImagensMulter.push(recebe.filename)
            })
        }
        if (dados.imagensDeletadas.length > 0) {
            //se houverem imagens a serem DELETADAS do MULTER
            //obs. magens deletadas que devem ser atualizadas no BD ja foi feita no Onclick no Modal no dados.imagensBD
            const resultado = await classBuscaBD.DeletaImagem(dados.imagensDeletadas)
            //no node executa um loop executando uma por uma da array
            AtualizaImagensBD(caminhoImagensMulter)
        } else {
            AtualizaImagensBD(caminhoImagensMulter)
        }
    }


    async function AtualizaImagensBD(caminhoImagensMulter) {

        if (caminhoImagensMulter) {//se houver imagens guardadas no storage
            if (formulario.imagensSlide) { //se houver imagens no BD
                var stringFy = JSON.stringify(formulario.imagensSlide.concat(caminhoImagensMulter))
            }
            else {
                var stringFy = JSON.stringify(caminhoImagensMulter)
            }

            //transforma o json novamente em string. o Concat  add os valores da array 
            //caminhoImagensMulter tambem o transformando e string permitindo tornar uma única array. parecido com o Objetc-consign
        } else {
            stringFy = JSON.stringify(formulario.imagensSlide) //Só transforma o json novamente em string
        }
        SetFormulario(prevState => {
            return { ...prevState, imagensSlide: stringFy }
        })

    }

    async function AtualizaDadosBD() {

        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.GravaInfoSite(formulario)
        console.log(resultado)

    }

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

                    <hr style={{ marginTop: "20px" }}></hr>
                    <hr style={{ marginBottom: "20px" }}></hr>

                    <h4 className="dadossite-article-div-form-h4"> SLIDE PÁGINA INICIAL </h4>

                    <div>
                        <SimpleModal imagensSlideBD={formulario.imagensSlide} DadosModal={DadosModal} />
                    </div>

                </form>
            </div>

            <div style={{ display: "block", justifyContent: "center", textAlign: "center", margin: "30px auto" }}>
                <Button

                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                    onClick={AtualizaDadosBD}
                >
                    ALTERAR INFORMAÇÕES
            </Button>
            </div>

        </article>
    )
}
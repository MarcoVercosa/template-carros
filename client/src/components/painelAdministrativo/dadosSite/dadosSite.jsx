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
        logradouroUm: "",
        bairroCidadeUm: "",
        cepUm: "",
        telefoneUm: "",
        lojaDois: "",
        horarioFuncionamentoDois: "",
        logradouroDois: "",
        bairroCidadeDois: "",
        cepDois: "",
        telefoneDois: "",
        logradouroTres: "",
        bairroCidadeTres: "",
        horarioFuncionamentoTres: "",
        logradouroTres: "",
        cepTres: "",
        telefoneTres: "",
        lojaQuatro: "",
        horarioFuncionamentoQuatro: "",
        logradouroQuatro: "",
        bairroCidadeQuatro: "",
        cepQuatro: "",
        telefoneQuatro: "",
        sobreNos: "",
        imagensSlide: false
    })

    const [imagensModal, setImagensModal] = useState({
        imagensBD: [],
        imagensAdicionadas: [],
        imagensDeletadasBD: []
    })

    useEffect(async () => {

        const classBuscaBD = new BuscaBD
        const resultado = await classBuscaBD.GetInfoSite()
        PolulaFormulario(resultado)

    }, [])

    function PolulaFormulario(resultado) {
        if (resultado.data.length > 0) {
            SetFormulario({
                whatsapp: resultado.data[0].whatsapp,
                facebook: resultado.data[0].facebook,
                youtube: resultado.data[0].youtube,
                instagram: resultado.data[0].instagram,
                email: resultado.data[0].email,
                lojaUm: resultado.data[0].lojaUm,
                horarioFuncionamentoUm: resultado.data[0].horarioFuncionamentoUm,
                logradouroUm: resultado.data[0].logradouroUm,
                bairroCidadeUm: resultado.data[0].bairroCidadeUm,
                cepUm: resultado.data[0].cepUm,
                telefoneUm: resultado.data[0].telefoneUm,
                lojaDois: resultado.data[0].lojaDois,
                horarioFuncionamentoDois: resultado.data[0].horarioFuncionamentoDois,
                logradouroDois: resultado.data[0].logradouroDois,
                bairroCidadeDois: resultado.data[0].bairroCidadeDois,
                cepDois: resultado.data[0].cepDois,
                telefoneDois: resultado.data[0].telefoneDois,
                lojaTres: resultado.data[0].lojaTres,
                horarioFuncionamentoTres: resultado.data[0].horarioFuncionamentoTres,
                logradouroTres: resultado.data[0].logradouroTres,
                bairroCidadeTres: resultado.data[0].bairroCidadeTres,
                cepTres: resultado.data[0].cepTres,
                telefoneTres: resultado.data[0].telefoneTres,
                lojaQuatro: resultado.data[0].lojaQuatro,
                horarioFuncionamentoQuatro: resultado.data[0].horarioFuncionamentoQuatro,
                logradouroQuatro: resultado.data[0].logradouroQuatro,
                bairroCidadeQuatro: resultado.data[0].bairroCidadeQuatro,
                cepQuatro: resultado.data[0].cepQuatro,
                telefoneQuatro: resultado.data[0].telefoneQuatro,
                sobreNos: resultado.data[0].sobreNos,
                imagensSlide: resultado.data[0].imagensSlide ? JSON.parse(resultado.data[0].imagensSlide) : ""
            })
        }
    }

    async function DadosModal(dados) {

        setImagensModal(prevState => {
            return {
                ...prevState, imagensBD: dados.imagensBD,
                imagensAdicionadas: dados.imagensAdicionadas, imagensDeletadasBD: dados.imagensDeletadasBD
            }
        })
        //ja atualiza a string de imagens que vem do BD com as alteraçõe do modal
        SetFormulario(prevState => {
            return { ...prevState, imagensSlide: dados.imagensBD }
        })

    }


    async function AtualizaDadosBD() {

        const dadosImagens = new FormData()
        const classBuscaBD = new BuscaBD
        let caminhoImagensMulter = [] //armazena nomes das imagens no storage

        if (imagensModal.imagensAdicionadas.length > 0) {
            //se houver imagens a serem ADICIONADAS, adicione-as no Multer
            for (var i = 0; i < imagensModal.imagensAdicionadas.length; i++) {
                dadosImagens.append("files", imagensModal.imagensAdicionadas[i])
                //para enviar imagens tem q ser pelo FormData
                //primeiro coloca eles numa array com o loop for. Necessário quando é mais de uma imagem
            }
            const retornaImagenslLocationNodeMulter = await classBuscaBD.CadastraImagemMulter(dadosImagens)
            retornaImagenslLocationNodeMulter.data.map((recebe) => {
                caminhoImagensMulter.push(recebe.filename)
            })
        }
        if (imagensModal.imagensDeletadasBD.length > 0) {
            //se houverem imagens a serem DELETADAS do MULTER
            //obs. imagens deletadas que devem ser atualizadas no BD ja foi feita no Onclick no Modal no dados.imagensBD
            const resultado = await classBuscaBD.DeletaImagem(imagensModal.imagensDeletadasBD)
            //no node executa um loop executando uma por uma da array
            AtualizaImagensBD(caminhoImagensMulter)
        } else {
            AtualizaImagensBD(caminhoImagensMulter)
        }
    }
    async function AtualizaImagensBD(caminhoImagensMulter) {
        const classBuscaBD = new BuscaBD
        var tempFormulario = formulario

        if (caminhoImagensMulter) {//se houver imagens que foram add no storage
            if (tempFormulario.imagensSlide) { //se houver imagens no BD
                var stringFy = JSON.stringify(tempFormulario.imagensSlide.concat(caminhoImagensMulter))
                //transforma o json novamente em string. o Concat  add os valores da array 
                //caminhoImagensMulter tambem o transformando e string permitindo tornar uma única array. parecido com o Objetc-consign
            }
            else {
                var stringFy = JSON.stringify(caminhoImagensMulter)
                //se não houver dados no bd de imagens, então add as imagens do upload
            }


        } else {
            stringFy = JSON.stringify(tempFormulario.imagensSlide) //se o cliente não solicitou add imagens
            //Só transforma o json novamente em string
        }

        tempFormulario = { ...tempFormulario, imagensSlide: stringFy }


        const resultado = await classBuscaBD.GravaInfoSite(tempFormulario)
        window.location.href = ("#inicio")
        props.mensagemDeRetorno(resultado.data)
    }

    return (

        <article className="dadossite-article">
            <h3>{imagensModal.mensagemGravacao}</h3>
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
                                return { ...prevState, logradouroUm: envia.target.value }
                            })
                        }}
                        value={formulario.logradouroUm}
                        id="local"
                        label="LOGRADOURO"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.logradouroUm}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField style={{ marginLeft: '20px', width: '15%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, bairroCidadeUm: envia.target.value }
                            })
                        }}
                        value={formulario.bairroCidadeUm}
                        id="bairrocidade"
                        label="BAIRRO - CIDADE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.logradouroUm}
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
                    <TextField style={{ display: "flex", marginTop: '20px', marginLeft: '48px', width: '15%' }}
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
                                return { ...prevState, logradouroDois: envia.target.value }
                            })
                        }}
                        value={formulario.logradouroDois}
                        id="logradouroDois"
                        label="LOGRADOURO"
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
                                return { ...prevState, bairroCidadeDois: envia.target.value }
                            })
                        }}
                        value={formulario.bairroCidadeDois}
                        id="bairrocidadedois"
                        label="BAIRRO - CIDADE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.logradouroUm}
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
                    <TextField style={{ display: "flex", marginTop: '20px', marginLeft: '48px', width: '15%' }}
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
                                return { ...prevState, logradouroTres: envia.target.value }
                            })
                        }}
                        value={formulario.logradouroTres}
                        id="logradourotres"
                        label="LOGRADOURO"
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
                                return { ...prevState, bairroCidadeTres: envia.target.value }
                            })
                        }}
                        value={formulario.bairroCidadeTres}
                        id="bairrocidadetres"
                        label="BAIRRO - CIDADE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.logradouroUm}
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
                    <TextField style={{ display: "flex", marginTop: '20px', marginLeft: '48px', width: '15%' }}
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
                                return { ...prevState, logradouroQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.logradouroQuatro}
                        id="logradouroQuatro"
                        label="LOGRADOURO"
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
                                return { ...prevState, bairroCidadeQuatro: envia.target.value }
                            })
                        }}
                        value={formulario.bairroCidadeQuatro}
                        id="bairrocidadequatro"
                        label="BAIRRO - CIDADE"
                        variant="outlined"
                        className="FormularioCadastro_inputs"
                        margin="dense"
                        // error={!formulario.logradouroUm}
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
                    {/* <TextField style={{ marginTop: '20px', width: '15%' }} */}
                    <TextField style={{ display: "flex", marginTop: '20px', marginLeft: '48px', width: '15%' }}
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

                    <h4 className="dadossite-article-div-form-h4"> SOBRE - rodapé páginas</h4>
                    <TextField style={{ marginLeft: '20px', width: '55%' }}
                        onChange={(envia) => {
                            SetFormulario(prevState => {
                                return { ...prevState, sobreNos: envia.target.value }
                            })
                        }}
                        inputProps={{
                            maxlength: 500
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
                    <p
                        style={{ color: "grey" }}
                    >{formulario.imagensSlide.length + imagensModal.imagensAdicionadas.length < 1 ? 0 : formulario.imagensSlide.length + imagensModal.imagensAdicionadas.length} IMAGENS</p>

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
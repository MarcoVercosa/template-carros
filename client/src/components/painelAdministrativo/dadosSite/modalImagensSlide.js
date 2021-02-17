import React, { useState, useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 1100,
        height: 550,
        overflow: "scroll",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {

        if (props.imagensSlideBD) {
            setImagens(prevState => {

                return {
                    ...prevState, imagensBD: props.imagensSlideBD
                }
            })
        }

    }, [props])

    const [imagens, setImagens] = useState({

        imagensBD: false,//imagens vindas do BD
        imagensAdicionadas: false, //imagens adicionadas pelo upload
        imagensDeletadasBD: [] // imagens deletadas do BD

    })

    function PreviewImagem() { //Gera preview das imagens ao adicioná-las

        //por algum motivo o map não roda no imagens.imagensAdicionadas. Tive que criar uma array com loop
        //e assim permitiu o map. Sempre que exclui alguma imagem ele atualiza o editarImagens.imagensAdicionadas
        //onde a var "armazena" busca as infos
        var armazena = []
        var push = []
        for (var i = 0; i < imagens.imagensAdicionadas.length; i++) {

            armazena.push(imagens.imagensAdicionadas[i])
        }
        armazena.map((dados, index) => {
            push.push(
                <>

                    <div className="formulario-div-formualario-form-imagem-div">
                        <img alt={index} key={index} className="" src={URL.createObjectURL(dados)} />
                        <i alt={index} key={index} class="fas fa-trash fa-2x trash-imagembd"
                            onClick={(recebe) => {

                                //armazena somente as imagens diferentes da excluída
                                setImagens(prevState => {
                                    return {
                                        ...prevState, imagensAdicionadas: armazena.filter((temp => temp !== dados)),
                                    }
                                })
                            }}
                        ></i>
                    </div>
                </>
            )
        })

        return (
            <>
                {push}
            </>
        )
    }


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 style={{ display: "flex", justifyContent: "center", textAlign: "center", color: "rgb(121, 121, 121)" }}>As imagens abaixo serão apresentadas no SlideShow principal da HOME.</h2>


            {imagens.imagensBD &&
                imagens.imagensBD.map((recebe, index) => {
                    return (

                        <div class="formulario-div-formualario-form-imagem-div" >

                            <img alt={recebe} key={index} src={"http://192.168.0.150:9000/static/" + recebe}></img>

                            <i class="fas fa-trash fa-2x trash-imagembd"
                                onClick={() => {//retira as imagens vindas do BD que são deletadas ao click
                                    setImagens(prevState => {
                                        return { ...prevState, imagensBD: imagens.imagensBD.filter(dados => dados !== recebe) }
                                    })

                                    setImagens(prevState => {//armazena a var com imagens deletadas do BD para excluir do storage
                                        return { ...prevState, imagensDeletadasBD: [...imagens.imagensDeletadasBD, recebe] }
                                    })
                                }}

                            ></i>

                        </div>


                    )
                })
            }
            {/* <div className="modalImagensSlide-previewUpload-div"> */}
            {imagens.imagensAdicionadas &&
                <PreviewImagem />
            }
            {/* </div> */}

            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(imagensUpload) => {
                        if (imagens.imagensBD.length + imagensUpload.target.files.length > 7) {
                            alert("Adicione no máximo 7 imagens")
                            return
                        }
                        setImagens(prevState => {
                            //adiciona as imagens do upload
                            return { ...prevState, imagensAdicionadas: imagensUpload.target.files }
                        })
                    }}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" startIcon={<AddAPhotoIcon />}
                        style={{ left: "8%", top: "5%" }}
                    >
                        UPLOAD ARQUIVOS
                    </Button>
                </label>

                <Button
                    style={{ left: "13%", top: "5%", backgroundColor: "#52af52", color: "black" }}
                    startIcon={<SaveIcon />}
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        props.DadosModal(imagens)
                        handleClose()
                    }}
                >SALVAR ALTERAÇÕES
            </Button>
                <Button
                    style={{ left: "17%", top: "5%" }}
                    startIcon={<SaveIcon />}
                    color="secondary"
                    variant="contained"
                    className={classes.button}
                    onClick={() => {
                        setImagens(prevState => {
                            return { ...prevState, imagensAdicionadas: false }
                        })
                        handleClose()
                    }}

                >CANCELAR ALTERAÇÕES
            </Button>
            </div>
        </div >
    );

    return (
        <div>

            <i class="fas fa-camera-retro fa-2x" style={{}}
                onClick={handleOpen}
            >  SLIDE SHOW</i>
            <Modal
                disableBackdropClick={true}//não permite fechar a janela ao clicar fora dela
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}

            </Modal>
        </div>
    );
}
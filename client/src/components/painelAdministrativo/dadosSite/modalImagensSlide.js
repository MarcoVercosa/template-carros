import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';


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

        if (props.imagens) {
            setImagens(prevState => {
                return { ...prevState, imagensBD: props.imagens }
            })
        }

    }, [])

    const [imagens, setImagens] = useState({

        imagensBD: false,
        imagensAdicionadas: false,
        imagensDeletadas: false

    })

    function PreviewImagem() { //Gera preview das imagens ao adicioná-las
        var armazena = []
        for (var i = 0; i < imagens.imagensAdicionadas.length; i++) {

            armazena.push(

                <img alt={i} key={i} className="" src={URL.createObjectURL(imagens.imagensAdicionadas[i])} />

            )
        }

        return (
            <>
                {armazena}
            </>
        )
    }


    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 style={{ display: "flex", justifyContent: "center", textAlign: "center", color: "rgb(121, 121, 121)" }}>As imagens abaixo serão apresentadas no SlideShow principal da HOME.</h2>
            {
                imagens.imagensBD &&
                imagens.imagensBD.map((recebe) => {
                    <div class="modalImagensSlide]-div" >
                        <a href={"http://192.168.0.150:9000/static/" + recebe} target="_blank">
                            <img alt={recebe} key={recebe} src={"http://192.168.0.150:9000/static/" + recebe}></img>
                        </a>
                    </div>
                })
            }
            <div className="modalImagensSlide-previewUpload-div">
                {imagens.imagensAdicionadas &&
                    <PreviewImagem />
                }
            </div>

            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(imagens) => {
                        setImagens(prevState => {
                            return { ...prevState, imagensAdicionadas: imagens.target.files }
                        })
                    }}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" startIcon={<AddAPhotoIcon />}
                        style={{ left: "23%", top: "5%" }}
                    >
                        Upload
                    </Button>
                </label>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" startIcon={<SaveIcon />}
                        style={{ left: "23%", top: "5%", backgroundColor: "#52af52", color: "white" }}
                    >
                        SALVAR ALTERAÇÕES
                    </Button>
                </label>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="secondary" component="span" startIcon={<CancelIcon />}
                        style={{ left: "23%", top: "5%" }}
                    >
                        CANCELAR ALTERAÇÕES
                    </Button>
                </label>
            </div>
        </div >
    );

    return (
        <div>

            <i class="fas fa-camera-retro fa-2x" style={{}}
                onClick={handleOpen}
            >  SLIDE SHOW</i>
            <Modal
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

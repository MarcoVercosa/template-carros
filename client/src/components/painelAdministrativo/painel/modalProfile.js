import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import BuscaBD from "../../fetchBackEnd/api"


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
        width: 500,
        height: 450,
        overflow: "scroll",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function SimpleModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const [dadosLocalStorage, setDadosLocalStorage] = useState(false)
    const [mensagem, setMensagem] = useState()


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        const dadosLocalStorage = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        setDadosLocalStorage(dadosLocalStorage)

    }, [])

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div>
                <div>
                    <i class="fas fa-user fa-2x" onClick={() => { handleOpen() }} ></i>
                </div>
                <div>
                    { }
                </div>
                <div>
                    { }
                </div>
            </div>

            <TextField style={{ width: "100%", marginTop: "10px" }} label="Primeiro Nome *" autocomplete="nome" id="nome" name="email" type="text" variant="outlined"

            />
            <TextField style={{ width: "100%", marginTop: "10px" }} label="Ultimo Nome *" autocomplete="nome" id="nome" name="nome" type="text" variant="outlined"

            />
            <TextField style={{ width: "100%", marginTop: "10px" }} disabled label="E-mail *" autocomplete="email" id="email" name="email" type="email" variant="outlined"

            />

            <p style={{ margin: "10px" }}>{mensagem}</p>

            <Button


                style={{ left: "40%", top: "12%" }}
                variant="contained"
                color="primary"
                className={classes.button}

            >ENVIAR
            </Button>
        </div>
    );

    return (
        <div>
            {localStorage &&
                <p style={{ display: "inline", color: "rgb(63, 60, 60)", fontFamily: "'Lora', serif", fontSize: "23px" }}>{dadosLocalStorage.primeiroNome} {dadosLocalStorage.ultimoNome}<i style={{ cursor: "pointer", marginLeft: "10px", color: "rgb(100, 100, 100)" }} class="fas fa-user fa-2x" onClick={() => { handleOpen() }} ></i></p>
            }

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

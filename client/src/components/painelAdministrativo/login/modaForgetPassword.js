import { React, useState } from 'react';
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
        height: 250,
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

    const [email, setEmail] = useState()
    const [mensagem, setMensagem] = useState()


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function ChangePassword() {
        const classBuscaBD = new BuscaBD
        const { data } = await classBuscaBD.ForgetPassword(email)
        setMensagem(data)
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>

            <p
                style={{ fontSize: "20px" }}
            >Digite seu user acount abaixo. Será enviado um email com novas credenciais.</p>

            <TextField label="E-mail *" autocomplete="email" id="email" name="email" type="email" variant="outlined"
                style={{ width: "100%" }}
                onBlur={(dados) => {
                    setEmail(dados.target.value)
                }}
            />
            <p style={{ margin: "10px" }}>{mensagem}</p>

            <Button

                onClick={() => {
                    ChangePassword()

                }}
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
            {/* <button type="button" onClick={handleOpen}>
                Esqueci minha senha
      </button> */}
            <p className="login-article-form-div-login-esqueceusenha" style={{ cursor: "pointer" }}
                onClick={handleOpen}
            >Esqueceu a senha ?</p>

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

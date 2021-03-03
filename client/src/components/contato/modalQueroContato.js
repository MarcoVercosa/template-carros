import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button } from '@material-ui/core/';
import BuscaBD from "../fetchBackEnd/api"

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

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
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function ModalRequestInfo(props) {
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

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Dados enviados com sucesso.</h2>
            <p id="simple-modal-description">
                Obrigado pelo o interesse. Iremos retornar o contato o mais rápido possível.
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <i class="far fa-smile-wink fa-4x"></i></div>

        </div>
    );
    async function EnviaDados() {
        const classBuscaBD = new BuscaBD
        const resultado = classBuscaBD.SendEmail(props.tenhoInteresse)

    }

    return (
        <div>
            <Button variant="contained" color="primary"
                onClick={() => {
                    if (!props.tenhoInteresse.nome || !props.tenhoInteresse.email ||
                        !props.tenhoInteresse.dddCel || !props.tenhoInteresse.telefoneCel) {
                        alert("Os campos Nome, email e celular não podem estar em branco.")
                        console.log(props.tenhoInteresse)
                        return
                    }
                    EnviaDados()
                    handleOpen()
                }}
            >
                ENVIAR
            </Button>
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

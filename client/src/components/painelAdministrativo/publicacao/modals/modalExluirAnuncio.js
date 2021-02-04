import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import RemoverAnuncio from "../functions/functionRemoverAnuncio"


function getModalStyle() {
    // const top = 50 + rand();
    // const left = 55 + rand();
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

    const body = (
        <div style={modalStyle} className={classes.paper}>

            <h2 style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
            >POR FAVOR. CONFIRME A REMOÇÃO DO ANÚNCIO: {props.buscaParaAlterar} </h2>
            <Button
                style={{ left: "10%" }}
                variant="contained"
                color="default"
                className={classes.button}
                onClick={() => {

                    handleClose()
                }}
            // startIcon={<CloudUploadIcon />}
            >
                CANCELAR
        </Button>

            <Button
                style={{ left: "30%" }}
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}

                onClick={async () => {

                    const resultado = await RemoverAnuncio(props.buscaParaAlterar, props.formulario.imagensPath)
                    if (resultado.data.affectedRows > 0) {
                        props.mensagemDeRetorno("ANÚNCIO REMOVIDO COM SUCESSO !!!")
                    } else {
                        props.mensagemDeRetorno("ANÚNCIO NÃO ENCONTRADO")
                    }
                    handleClose()
                    props.MostrarTopoPaginaComMensagem()

                }}

            >
                DELETAR
      </Button>
            {/* <SimpleModal /> */}
        </div>
    );

    return (
        <div >
            <button type="button" onClick={handleOpen}>
                <Button
                    // style={{ left: "30%" }}
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}

                >
                    REMOVER ANÚNCIO
      </Button>
            </button>
            <Modal
                disableBackdropClick={true}
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
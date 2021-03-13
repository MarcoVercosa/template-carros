import { React, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';

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

    const [dadosProfile, setDadosProfile] = useState(false)//guarda dados codeUser localStorage e dados pessoas do Server
    const [changeProfile, setChangeProfile] = useState({//"armazena alteração some e ultimo nome"        
        primeiroNome: false,
        ultimoNome: false
    })
    const [changePassword, setChangePassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false
    })


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(async () => {

        const dadosLocalStorage = JSON.parse(window.localStorage.getItem("userSession")) === null ? false : JSON.parse(window.localStorage.getItem("userSession"))
        if (dadosLocalStorage) {
            const classBuscaBD = new BuscaBD
            const { data } = await classBuscaBD.InfoProfile(dadosLocalStorage.codeUser)
            if (data.length > 0) {
                setDadosProfile({ primeiroNome: data[0].primeiroNome, ultimoNome: data[0].ultimoNome, email: data[0].email, codeUser: dadosLocalStorage.codeUser })
                setChangeProfile({ primeiroNome: data[0].primeiroNome, ultimoNome: data[0].ultimoNome })
            }
            else {
                return
            }
        }

    }, [])

    async function AlteraNomeOuSenha(tipo) {
        if (tipo === "nomeSobrenome") {
            const classBuscaBD = new BuscaBD
            const dados = { codeUser: dadosProfile.codeUser, email: dadosProfile.email, primeiroNome: changeProfile.primeiroNome, ultimoNome: changeProfile.ultimoNome }
            const resultado = await classBuscaBD.ChangeDataOrPassordProfile(tipo, dados)
            if (resultado.data.token === "expired") {
                alert("SESSÃO EXPIRADA. NECESÁRIO AUTENTICAÇÃO")
                window.location.href = ("http://192.168.0.150:3000/login")
                return
            }

        } else {

            if (changePassword.newPassword === changePassword.confirmNewPassword) {
                const classBuscaBD = new BuscaBD
                const dados = { codeUser: dadosProfile.codeUser, email: dadosProfile.email, currentPassword: changePassword.currentPassword, newPassword: changePassword.confirmNewPassword }
                const resultado = await classBuscaBD.ChangeDataOrPassordProfile(tipo, dados)
                if (resultado.data.token === "expired") {
                    alert("SESSÃO EXPIRADA. NECESÁRIO AUTENTICAÇÃO")
                    window.location.href = ("http://192.168.0.150:3000/login")
                    return
                }
                alert(resultado.data)
            } else {
                alert('As novas senhas precisam ser IGUAIS')
            }
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: "15%", margin: "0 auto", backgroundColor: "rgb(196, 196, 196)", padding: "40px", borderRadius: "100px" }}>
                    <i class="fas fa-user fa-5x" style={{ color: "rgb(136, 136, 137)" }} onClick={() => { handleOpen() }} ></i>
                </div>
                <div style={{ marginTop: "15px", color: "rgb(63, 60, 60)", fontSize: "25px", fontFamily: "Lora", fontWeight: "700" }}>
                    {dadosProfile &&
                        dadosProfile.primeiroNome
                    }
                </div>
                <div style={{ margin: "15px", color: "rgb(100, 100, 100)" }}>
                    {dadosProfile &&
                        dadosProfile.email
                    }
                </div>
            </div>

            <TextField style={{ width: "100%", marginTop: "10px" }} margin="dense"
                label="Primeiro Nome *" autocomplete="nome" id="nome" name="email" type="text" variant="outlined"
                onChange={(dados) => {
                    setChangeProfile(prevState => {
                        return { ...prevState, primeiroNome: dados.target.value }
                    })
                }}
                value={changeProfile.primeiroNome}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField style={{ width: "100%", marginTop: "10px" }} margin="dense"
                label="Ultimo Nome *" autocomplete="nome" id="nome" name="nome" type="text" variant="outlined"
                value={changeProfile.ultimoNome}
                onChange={(dados) => {
                    setChangeProfile(prevState => {
                        return { ...prevState, ultimoNome: dados.target.value }
                    })
                }}
                InputLabelProps={{
                    shrink: true,
                }}

            />
            <TextField style={{ width: "100%", marginTop: "10px" }} margin="dense"
                disabled label="E-mail *" autocomplete="email" id="email" name="email" type="email" variant="outlined"
                value={dadosProfile.email}
                InputLabelProps={{
                    shrink: true,
                }}

            />

            <div style={{ margin: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div >
                    <Button
                        style={{}}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={(click, tipo = "nomeSobrenome") => { AlteraNomeOuSenha(tipo) }}

                    >ALTERAR DADOS
                    </Button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "15%", margin: "15px auto", backgroundColor: "rgb(196, 196, 196)", padding: "40px", borderRadius: "100px" }}>
                    <LockIcon style={{ fontSize: "75px", color: "rgb(136, 136, 137)" }} />
                </div>
                <div>
                    <p style={{ color: "rgb(100, 100, 100)" }}  >ALTERAÇÃO DE SENHA:</p>
                </div>
                <div style={{ width: "60%" }}>
                    <TextField style={{ width: "100%", marginTop: "10px" }} margin="dense"
                        label="Senha atual *" autocomplete="senhaAtual" id="senhaAtual" name="senhaAtual" type="password" variant="outlined"
                        onChange={(dados) => {
                            setChangePassword(prevState => {
                                return { ...prevState, currentPassword: dados.target.value }
                            })
                        }}

                    />
                </div>
                <div style={{ width: "60%" }}>
                    <TextField style={{ width: "100%", marginTop: "10px" }} margin="dense"
                        label="Nova Senha *" autocomplete="senhaNova" id="senhaNova" name="senhaNova" type="password" variant="outlined"
                        onChange={(dados) => {
                            setChangePassword(prevState => {
                                return { ...prevState, newPassword: dados.target.value }
                            })
                        }}

                    />

                </div>
                <div style={{ width: "60%" }}>
                    <TextField style={{ width: "100%", marginTop: "10px" }} margin="dense"
                        label="Confirmação da nova Senha *" autocomplete="senhaNovaNova" id="senhaNovaNova" name="senhaNovaNova" type="password" variant="outlined"
                        onChange={(dados) => {
                            setChangePassword(prevState => {
                                return { ...prevState, confirmNewPassword: dados.target.value }
                            })
                        }}

                    />
                </div>

            </div>

            <Button
                style={{ left: "33%", top: "8%" }}
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(click, tipo = "password") => { AlteraNomeOuSenha(tipo) }}

            >ALTERAR SENHA
            </Button>
        </div >
    );

    return (
        <div>
            {dadosProfile &&
                <p style={{ display: "inline", color: "rgb(63, 60, 60)", fontFamily: "'Lora', serif", fontSize: "23px" }}>{dadosProfile.primeiroNome} {dadosProfile.ultimoNome}<i style={{ cursor: "pointer", marginLeft: "10px", color: "rgb(100, 100, 100)" }} class="fas fa-user fa-2x" onClick={() => { handleOpen() }} ></i></p>
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

import { React, memo } from 'react';



import {
    Switch, FormControlLabel,

} from '@material-ui/core/';


function Opcionais(props) {

    return (
        <>
            <h4>OPCIONAIS:</h4>
            <div className="formulario-div-formualario-form-div-grid">

                <div>
                    <FormControlLabel
                        checked={props.formulario.airbag}
                        name="airbag"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="AIRBAG"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.alarme}
                        name="alarme"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="ALARME"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.cdplayer}
                        name="cdplayer"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="CD PLAYER"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.dvdplayer}
                        name="dvdplayer"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="DVD PLAYER"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.gps}
                        name="gps"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="GPS"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.radio}
                        name="radio"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="RÁDIO"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.radioTocaFita}
                        name="radioTocaFita"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="RÁDIO/TOCA FITA"
                        labelPlacement="start"
                    />
                </div>

                <div>
                    <FormControlLabel
                        checked={props.formulario.computadorBordo}
                        name="computadorBordo"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="Computador de bordo"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.controleTracao}
                        name="controleTracao"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="Controle de tração"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.controleVelocidade}
                        name="controleVelocidade"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Controle de velocidade"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.desembacadorTraseiro}
                        name="desembacadorTraseiro"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Desembaçador traseiro"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.limpadorTraseiro}
                        name="limpadorTraseiro"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Limpador traseiro"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.farolXenonio}
                        name="farolXenonio"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Farol de xenônio"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.arCondicionado}
                        name="arCondicionado"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Ar condicionado"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.arQuente}
                        name="arQuente"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Ar quente"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.freioAbs}
                        name="freioAbs"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Freios ABS"
                        labelPlacement="start"
                    />
                </div>

                <div>
                    <FormControlLabel
                        checked={props.formulario.retrovisoresEletricos}
                        name="retrovisoresEletricos"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Retrovisores elétricos"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.retrovisoresFotocromicos}
                        name="retrovisoresFotocromicos"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="Retrovisores fotocrômicos"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.rodaLigaLeve}
                        name="rodaLigaLeve"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Rodas de liga leve"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.sensorChuva}
                        name="sensorChuva"

                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Sensor de chuva"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.sensorEstacionamento}
                        name="sensosensorEstacionamentorChuva"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Sensor de estacionamento"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.tetoSolar}
                        name="tetoSolar"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Teto solar"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.travasEletricas}
                        name="travasEletricas"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Travas elétricas"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.vidrosEletricos}
                        name="vidrosEletricos"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Vidros elétricos"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.direcaoHidraulica}
                        name="direcaoHidraulica"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Direção hidráulica"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.volanteAltura}
                        name="volanteAltura"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Volante regulagem altura"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.bancoCouro}
                        name="bancoCouro"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Bancos em couro"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.encostoCabecaTraseiro}
                        name="encostoCabecaTraseiro"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Encosto de cabeça traseiro"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.bancosFrenteAquecimento}
                        name="bancosFrenteAquecimento"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}
                        />}
                        label="Bancos frente aquecimento"
                        labelPlacement="start"
                    />
                </div>
                <div>
                    <FormControlLabel
                        checked={props.formulario.tracaoQuatroRodas}
                        name="tracaoQuatroRodas"
                        control={<Switch color="primary"
                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Tração 4x4"
                        labelPlacement="start"
                    />
                </div>

                <div>
                    <FormControlLabel
                        checked={props.formulario.protetorCacamba}
                        name="protetorCacamba"
                        control={<Switch color="primary"

                            onChange={(envia) => { props.Opcionais(envia) }}

                        />}
                        label="Protetor de caçamba"
                        labelPlacement="start"
                    />
                </div>


            </div>

            <hr className="formulario-div-formualario-form-hr" />

            <FormControlLabel style={{ marginRight: "20px" }}
                checked={props.formulario.aceitaTroca}
                name="aceitaTroca"
                value="start"
                control={<Switch color="primary"

                    onChange={(envia) => { props.Opcionais(envia) }}

                />}
                label="Aceita troca"
                labelPlacement="start"
            />

            <FormControlLabel style={{ marginRight: "20px" }}
                checked={props.formulario.IPVA}
                name="IPVA"
                value="start"
                control={<Switch color="primary"

                    onChange={(envia) => { props.Opcionais(envia) }}

                />}
                label="IPVA pago"
                labelPlacement="start"
            />

            <FormControlLabel
                checked={props.formulario.licenciado}
                name="licenciado"
                value="start"
                control={<Switch color="primary"

                    onChange={(envia) => { props.Opcionais(envia) }}

                />}
                label="Licenciado"
                labelPlacement="start"
            />
        </>

    )
}

export default memo(Opcionais)


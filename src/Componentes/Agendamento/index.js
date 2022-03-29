import React, { useContext } from "react";

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

import { contextUsuarioConectado } from "../../App";

function Agendamento() {

    const tituloDaPagina = "Agendamento";

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const navigate = useNavigate();

    function onClickConsultas() {

        if(usuarioConectado.cpf !== "") {

            navigate('/gerenciar_consultas_agendadas/agendar');

        } else {

            navigate('/login');
        }
    }

    function onClickExames() {

        if( usuarioConectado.cpf !== "") {

            navigate('/gerenciar_exames_e_procedimentos_agendados/agendar');

        } else {

            navigate('/login');
        }
    }

    return (               

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <button onClick = { onClickConsultas } className = { styles.botaoAgendamento }> Agendar Consulta </button>

            <button type = "button" className = { styles.botaoAgendamento } onClick = { onClickExames }  > Agendar Exames </button>

        </>
    );
};

export default Agendamento;
import React, { useContext } from "react";



import Card from "../Card"
import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

import { contextUsuarioConectado } from "../../App";

function HomeClientes() {

    const tituloDaPagina = "Página Inicial do Cliente"

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const dadosDoCard = [

        {
            imagem: "imagens/consultas.jpg",
            altImagem: "Consultas Agendadas",
            titulo: "Consultas Agendadas",
            link: "/gerenciar_consultas_agendadas"
        },
        {
            imagem: "imagens/exames agendados.png",
            altImagem: "Exames / Procedimentos Agendados",
            titulo: "Exames / Procedimentos Agendados",
            link: "/gerenciar_exames_e_procedimentos_agendados"
        },
        {
            imagem: "imagens/resultados.png",
            altImagem: "Resultados de Exames",
            titulo: "Resultados",
            link: "/gerenciar_resultados"
        },               

      ];

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <h4> Bem Vindo { usuarioConectado.nome }</h4>

            <div className = { styles.containerPrincipal } >
                
                <Card dadosDoCard = { dadosDoCard[0] } />
                <Card dadosDoCard = { dadosDoCard[1] } />
                <Card dadosDoCard = { dadosDoCard[2] } />                
                
            </div>
        </>

        
    );
};

export default HomeClientes;
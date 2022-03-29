import React from "react";

import Card from "../Card"
import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

export default function HomeExaminadores() {

    const tituloDaPagina = "Página Inicial do Administrador"

    const dadosDoCard = [

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
        }        

    ];

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <div className = { styles.containerPrincipal } >
                
                <Card dadosDoCard = { dadosDoCard[0] } />
                <Card dadosDoCard = { dadosDoCard[1] } />
                
            </div>
        </>

        
    );
};
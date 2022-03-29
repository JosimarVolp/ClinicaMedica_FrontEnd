import React from "react";

import Card from "../Card"
import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function HomeMedicos() {

    const tituloDaPagina = "Página Inicial do Médico"

    const dadosDoCard = [

        {
            imagem: "imagens/consultas.jpg",
            altImagem: "Consultas Agendadas",
            titulo: "Consultas Agendadas",
            link: "/gerenciar_consultas_agendadas"
        }  
        
    ];

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <div className = { styles.containerPrincipal } >
                
                <Card dadosDoCard = { dadosDoCard[0] } />
                               
                
            </div>
        </>

        
    );
};

export default HomeMedicos;
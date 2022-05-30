import React, { useState, useEffect, useContext } from "react";

//import { BrowserRouter as Router } from "react-router-dom";
//import { Routes, Route } from "react-router-dom";


import Carrossel from '../Carrossel';
import AtalhoAgenda from "../AtalhoAgenda";
import Card from "../Card";

import styles from "./styles.module.css";

import { contextUsuarioConectado } from '../../App';



function Home() {

    const { usuarioConectado } = useContext(contextUsuarioConectado);
    
    const dadosDoCard = [

        {
            imagem: "imagens/agendamento.png",
            altImagem: "Agendamento de Consultas",
            titulo: "Agendar Consultas",
            link: "/gerenciar_consultas_agendadas/agendar"
        },
        {
            imagem: "imagens/agendamento.png",
            altImagem: "Agendamento de Consultas",
            titulo: "Agendar Consultas",
            link: "/login"
        },
        {
            imagem: "imagens/agendamento.png",
            altImagem: "Agendamento de Exames e Procedimentos",
            titulo: "Agendar Exames / Procedimentos",
            link: "/gerenciar_exames_e_procedimentos_agendados/agendar"
        },
        {
            imagem: "imagens/agendamento.png",
            altImagem: "Agendamento de Exames e Procedimentos",
            titulo: "Agendar Exames / Procedimentos",
            link: "/login"
        },
        {
            imagem: "imagens/especialidades.jpg",
            altImagem: "Especialidades",
            titulo: "Especialidades",
            link: "/especialidades"
        },
        {
            imagem: "imagens/exames.png",
            altImagem: "Exames e Procedimentos",
            titulo: "Exames / Procedimentos",
            link: "/exames_e_procedimentos"
        },
        {
            imagem: "imagens/resultados.png",
            altImagem: "Resultados de Exames",
            titulo: "Resultados",
            link: "/resultados"
        },
        {
            imagem: "imagens/resultados.png",
            altImagem: "Resultados de Exames",
            titulo: "Resultados",
            link: "/login"
        }       
    ];

             

    if(usuarioConectado.cpf !== "") {

        return (

       
        
            <main className = { styles.areaPrincipal } >                

                    <div className = { styles.areaSuperior }>
                        <div className = { styles.boxCarrossel }>
                            <Carrossel />
                        </div>
                        <div className = { styles.agendamento }>
                            <AtalhoAgenda className = { styles.teste } dadosDoCard = { dadosDoCard[0] } />
                            <AtalhoAgenda dadosDoCard = { dadosDoCard[2] } />
                        </div>
                    </div>
                    <div className = { styles.areaInferior }>
                        <Card dadosDoCard = { dadosDoCard[4] } />
                        <Card dadosDoCard = { dadosDoCard[5] } />
                        <Card dadosDoCard = { dadosDoCard[6] } />                
                    </div>

            </main> 
          
         
        );

    } else {

        return (

       
        
            <main className = { styles.areaPrincipal } > 

                <div className = { styles.areaSuperior }>
                    <div className = { styles.boxCarrossel }>
                        <Carrossel />
                    </div>
                    <div className = { styles.agendamento }>
                        <AtalhoAgenda className = { styles.teste } dadosDoCard = { dadosDoCard[1] } />
                        <AtalhoAgenda dadosDoCard = { dadosDoCard[3] } />
                    </div>
                </div>
                    <div className = { styles.areaInferior }>
                        <Card dadosDoCard = { dadosDoCard[4] } />
                        <Card dadosDoCard = { dadosDoCard[5] } />
                        <Card dadosDoCard = { dadosDoCard[7] } />                
                    </div>

            </main> 
          
         
        );


    }
};

export default Home;
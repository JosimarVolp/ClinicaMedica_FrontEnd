import React from "react";

import Card from "../Card"
import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function HomeAdministradores() {

    const tituloDaPagina = "Página Inicial do Administrador"

    const dadosDoCard = [

        {
            imagem: "imagens/clientes.jpg",
            altImagem: "Clientes",
            titulo: "Clientes",
            link: "/gerenciar_clientes"
        },
        {
            imagem: "imagens/funcionarios.jpg",
            altImagem: "Funcionários",
            titulo: "Funcionários",
            link: "/gerenciar_funcionarios"
        },
        {
            imagem: "imagens/exames.png",
            altImagem: "Exames / Procedimentos",
            titulo: "Exames / Procedimentos",
            link: "/gerenciar_exames_e_procedimentos"
        },
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
        {
            imagem: "imagens/especialidades.jpg",
            altImagem: "Especialidades",
            titulo: "Especialidades",
            link: "/gerenciar_especialidades"
        },
        {
            imagem: "imagens/cargos.jpg",
            altImagem: "Cargos",
            titulo: "Cargos",
            link: "/gerenciar_cargos"
        },
        {
            imagem: "imagens/convenios.png",
            altImagem: "Convênios",
            titulo: "Convênios",
            link: "/gerenciar_convenios"
        },
        {
            imagem: "imagens/comorbidades.png",
            altImagem: "Comorbidades",
            titulo: "Comorbidades",
            link: "/gerenciar_comorbidades"
        },
        {
            imagem: "imagens/medicamentos.jpg",
            altImagem: "Medicamentos",
            titulo: "Medicamentos",
            link: "/gerenciar_medicamentos"
        }        

      ];

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <div className = { styles.containerPrincipal } >
                <Card dadosDoCard = { dadosDoCard[0] } />
                <Card dadosDoCard = { dadosDoCard[1] } />
                <Card dadosDoCard = { dadosDoCard[2] } />
                <Card dadosDoCard = { dadosDoCard[3] } />
                <Card dadosDoCard = { dadosDoCard[4] } />
                <Card dadosDoCard = { dadosDoCard[5] } />
                <Card dadosDoCard = { dadosDoCard[6] } />
                <Card dadosDoCard = { dadosDoCard[7] } />
                <Card dadosDoCard = { dadosDoCard[8] } />
                <Card dadosDoCard = { dadosDoCard[9] } />
                <Card dadosDoCard = { dadosDoCard[10] } />
            </div>
        </>

        
    );
};

export default HomeAdministradores;
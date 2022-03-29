import React from "react";

import TituloDaPagina from "../TituloDaPagina";
import Botao from "../Botao";

import styles from "./styles.module.css";

function CadastrarComorbidades() {

    const tituloDaPagina = "Cadastrar Comorbidades";

    const dadosDoBotao = [

        {
            titulo: "Cadastrar",
            link: "/gerenciar_comorbidades"
        }
    ];

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } >

                <label htmlFor = "nomeComorbidade" > Comorbidade </label>
                <input type = "text" name = "nomeComorbidade" />                 

            </form>

            <div className = { styles.botaoCadastrar }>

                <Botao dadosDoBotao = { dadosDoBotao[0] } />

            </div>

        </>
    );
};

export default CadastrarComorbidades;
import React from "react";

import TituloDaPagina from "../TituloDaPagina";
import Botao from "../Botao";

import styles from "./styles.module.css";

function CadastrarMedicamentos() {

    const tituloDaPagina = "Cadastrar Medicamentos";

    const dadosDoBotao = [

        {
            titulo: "Cadastrar",
            link: "/gerenciar_medicamentos"
        }
    ];

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } >

                <label htmlFor = "nomeMedicamento" > Medicamento </label>
                <input type = "text" name = "nomeMedicamento" />

            </form>

            <div className = { styles.botaoCadastrar } >
            
                <Botao dadosDoBotao = { dadosDoBotao[0] } />

            </div>

        </>
    );
};

export default CadastrarMedicamentos;
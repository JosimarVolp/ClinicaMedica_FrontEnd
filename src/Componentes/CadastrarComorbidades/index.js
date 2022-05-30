import React, { useState } from "react";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

function CadastrarComorbidades() {

    const tituloDaPagina = "Cadastrar Comorbidades";

    const navigate = useNavigate();

    const [ dadosDaComorbidade, setDadosDaComorbidade ] = useState( { } );

    function onChange(ev) {

        const { name, value } = ev.target;
      
        setDadosDaComorbidade( { ...dadosDaComorbidade, [name]: value } );
    };

    function onSubmit(ev) {

        ev.preventDefault();
        axios.post( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_comorbidades", dadosDaComorbidade )
        
            .then( (response) => {

                alert("Comorbidade cadastrada com sucesso!!");
                navigate('/gerenciar_comorbidades');

            });
    };

    function retornaAoGerenciador() {

        navigate('/gerenciar_comorbidades');
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Comorbidade </label>
                    <input type = "text" name = "nome" id = "nome" onChange = { onChange }/>                 

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>

                </div>


            </form>

            

        </>
    );
};

export default CadastrarComorbidades;
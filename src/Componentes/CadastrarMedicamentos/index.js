import React, { useState } from "react";

import axios from 'axios';

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

function CadastrarMedicamentos() {

    const tituloDaPagina = "Cadastrar Medicamentos";

    const navigate = useNavigate();    

    function retornaAoGerenciador() {

        navigate('/gerenciar_medicamentos');
    }

    const [ dadosDoMedicamento, setDadosDoMedicamento ] = useState( { } );

    function onChange(ev) {

        const { name, value } = ev.target;
      
        setDadosDoMedicamento( { ...dadosDoMedicamento, [name]: value } );
    };

    function onSubmit(ev) {

        ev.preventDefault();
        axios.post( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicamentos", dadosDoMedicamento )
        
            .then( (response) => {

                alert("Medicamento cadastrado com sucesso!!");
                navigate('/gerenciar_medicamentos');

            });
    };

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >
                    <label htmlFor = "nome" > Medicamento </label>
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

export default CadastrarMedicamentos;
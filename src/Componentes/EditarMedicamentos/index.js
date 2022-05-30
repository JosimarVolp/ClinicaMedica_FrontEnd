import axios from "axios";

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css"

const EditarMedicamentos = ( props ) => {

    const tituloDaPagina = "Editar Medicamentos";    

    const navigate = useNavigate();

    const [ dadosDoMedicamento, setDadosDoMedicamento ] = useState( { } );

    useEffect( ( ) => {

        setDadosDoMedicamento(props.medicamento);

    },[props.medicamento]);

    useEffect( ( ) => {

        console.log(dadosDoMedicamento.id);
        console.log(dadosDoMedicamento.nome);
        

    }, [dadosDoMedicamento] );

    function onChange( ev ) {

        const { name, value } = ev.target;

        setDadosDoMedicamento( { ...dadosDoMedicamento, [name]: value } );

    }

    function onSubmit( ev ) {

        ev.preventDefault();

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicamentos', dadosDoMedicamento)
        
        .then( ( res ) => {

            alert("Medicamento atualizado com sucesso");
            navigate('/gerenciar_medicamentos');
        });
    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_medicamentos');

    }

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Medicamento </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChange }  defaultValue = { dadosDoMedicamento.nome }/>

                </div>                

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>

                </div>
                
            </form>
            
        </>

    );
};

export default EditarMedicamentos;
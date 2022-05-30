import axios from "axios";

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css"

const EditarComorbidades = ( props ) => {

    const tituloDaPagina = "Editar Comorbidades";    

    const navigate = useNavigate();

    const [ dadosDaComorbidade, setDadosDaComorbidade ] = useState( { } );

    useEffect( ( ) => {

        setDadosDaComorbidade(props.comorbidade);

    },[props.comorbidade]);

    useEffect( ( ) => {

        console.log(dadosDaComorbidade.id);
        console.log(dadosDaComorbidade.nome);
        

    }, [dadosDaComorbidade] );

    function onChange( ev ) {

        const { name, value } = ev.target;

        console.log( { name, value } );

        setDadosDaComorbidade( { ...dadosDaComorbidade, [name]: value } );

        

    }

    function onSubmit( ev ) {

        ev.preventDefault();

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_comorbidades', dadosDaComorbidade)
        
        .then( ( res ) => {

            alert(`Comorbidade atualizada com sucesso`);
            navigate('/gerenciar_comorbidades');
        });
    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_comorbidades');

    }

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Comorbidade </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChange } defaultValue = { dadosDaComorbidade.nome } />

                </div>                

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>

                </div>
                
            </form>
            
        </>

    );
};

export default EditarComorbidades;
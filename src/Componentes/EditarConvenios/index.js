import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";


import styles from "./styles.module.css";

const CadastrarConvenios = ( props ) => {

    const tituloDaPagina = "Editar Convênios";

    const navigate = useNavigate();

    const [ dadosDoConvenio, setDadosDoConvenio ] = useState( { } );

    useEffect( ( ) => {

        setDadosDoConvenio(props.convenio);

    }, [props.convenio] );

    useEffect( ( ) => {

        console.log(dadosDoConvenio.id);
        console.log(dadosDoConvenio.nome);
        console.log(dadosDoConvenio.desconto);
        console.log(dadosDoConvenio.status);

    }, [dadosDoConvenio]);

    function onChange( ev ) {

        const { name, value } = ev.target;

        setDadosDoConvenio( { ...dadosDoConvenio, [name]: value } );

    }

    function onSubmit( ev ) {

        ev.preventDefault();

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios', dadosDoConvenio)
        
        .then( ( res ) => {

            alert("Convênio atualizado com sucesso");
            navigate('/gerenciar_convenios');
        });

    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_convenios');

    }
    
    return (

        <>

            <TituloDaPagina  tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Convênio </label>
                    <input type = "text"  id = "nome" name = "nome" onChange = { onChange } defaultValue = { dadosDoConvenio.nome } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "desconto" > Desconto </label>
                    <input type = "text"  id = "desconto" name = "desconto" onChange = { onChange } defaultValue = { dadosDoConvenio.desconto } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" onChange = { onChange } defaultValue = { dadosDoConvenio.status } required >

                        <option value = "Ativo"> Ativo </option>
                        <option value = "Inativo" > Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar} > Salvar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { retornaAoGerenciador } > Cancelar </button>

                </div>

            </form>

            
        
        </>

    );
};

export default CadastrarConvenios;
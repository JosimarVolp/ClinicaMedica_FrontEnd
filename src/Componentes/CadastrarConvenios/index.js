import React, { useState } from "react";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import {  useNavigate } from "react-router-dom";


import styles from "./styles.module.css";

function CadastrarConvenios() {

    const tituloDaPagina = "Cadastrar Convênios";

    const navigate = useNavigate();

    const dadosIniciaisDoConvenio = {

        nome: "",
        desconto: 0,
        status: ""
    };

    const [ dadosDoConvenio, setDadosDoConvenio ] = useState( dadosIniciaisDoConvenio );

    function onChange(ev) {

        const { name, value } = ev.target;        

        setDadosDoConvenio( { ...dadosDoConvenio, [name]: value } );

    };

    function onSubmit(ev) {

        ev.preventDefault();

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios', dadosDoConvenio )
        
            .then( ( response ) => {

                alert( "Convênio cadastrado com sucesso!" );
                navigate('/gerenciar_convenios');

            });
    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_convenios');
    }

    return (

        <>

            <TituloDaPagina  tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario }  onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Convênio </label>
                    <input type = "text"  id = "nome" name = "nome" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "desconto" > Desconto </label>
                    <input type = "text"  id = "desconto" name = "desconto" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" required onChange = { onChange } >

                        <option> </option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo" > Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { retornaAoGerenciador} > Cancelar </button>

                </div>

            </form>

            
        
        </>

    );
};

export default CadastrarConvenios;
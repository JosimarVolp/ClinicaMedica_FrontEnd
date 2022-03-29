import React, { useState } from "react";

import axios from 'axios';

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css"

export default function CadastrarCargos() {

    const tituloDaPagina = "Cadastrar Cargos";

    const navigate = useNavigate();

    const [ dadosDoCargo, setDadosDoCargo ] = useState( { } );

    function onChange(ev) {

        const { name, value } = ev.target;
      
        setDadosDoCargo( { ...dadosDoCargo, [name]: value } );
    };

    function onSubmit(ev) {

        ev.preventDefault();
        axios.post( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos", dadosDoCargo )
        
            .then( (response) => {

                alert("Cargo cadastrado com sucesso!!");

            });
    };

    function retornaAoGerenciador() {

        navigate('/gerenciar_cargos');
    }

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Cargo </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "carga_horaria" > Carga Horária </label>
                    <input type = "number" id = "carga_horaria" name = "carga_horaria" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "salario" > Salário </label>
                    <input type = "text" id = "salario" name = "salario" onChange = { onChange } />

                </div>                

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" required  onChange = { onChange } >

                        <option>  </option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>

                </div>
                
            </form>
            
        </>

    );
};


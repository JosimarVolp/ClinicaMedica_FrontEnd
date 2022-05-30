import axios from "axios";

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css"

const EditarCargos = ( props ) => {

    const tituloDaPagina = "Editar Cargos";    

    const navigate = useNavigate();

    const [ dadosDoCargo, setDadosDoCargo ] = useState( { } );

    useEffect( ( ) => {

        setDadosDoCargo(props.cargo);

    },[props.cargo]);

    useEffect( ( ) => {

        console.log(dadosDoCargo.id);
        console.log(dadosDoCargo.nome);
        console.log(dadosDoCargo.carga_horaria);
        console.log(dadosDoCargo.salario);
        console.log(dadosDoCargo.status);

    }, [dadosDoCargo] );

    function onChange( ev ) {

        const { name, value } = ev.target;

        setDadosDoCargo( { ...dadosDoCargo, [name]: value } );

    }

    function onSubmit( ev ) {

        ev.preventDefault();

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos', dadosDoCargo)
        
        .then( ( res ) => {

            alert("Cargo atualizado com sucesso");
            navigate('/gerenciar_cargos');
        });
    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_cargos');

    }

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Cargo </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChange }  defaultValue = { dadosDoCargo.nome }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "carga_horaria" > Carga Horária </label>
                    <input type = "number" id = "carga_horaria" name = "carga_horaria" onChange = { onChange } defaultValue = { dadosDoCargo.carga_horaria } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "salario" > Salário </label>
                    <input type = "text" id = "salario" name = "salario" onChange = { onChange } defaultValue = { dadosDoCargo.salario } />

                </div>                

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" required onChange = { onChange } defaultValue = { dadosDoCargo.status } >

                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>

                </div>
                
            </form>
            
        </>

    );
};

export default EditarCargos;
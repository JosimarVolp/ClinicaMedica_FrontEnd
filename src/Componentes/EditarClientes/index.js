import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

import { contextClientes } from "../../App";

const EditarClientes = ( props ) => {

    const tituloDaPagina = "Editar Cliente";  
    
    const navigate = useNavigate();    

    const { cpfDoClienteParaEditar, setCpfDoClienteParaEditar } = useContext(contextClientes);

    const [ dadosDeLogin, setDadosDeLogin ] = useState({});    

    useEffect( ( ) => {

        if(props.login !== undefined) {

            setDadosDeLogin(props.login);
           

            console.log("Passou aqui 01");

        }

    },[props.login]);    

    function cancelar() {

        navigate('/gerenciar_clientes');

    }      
    
    function onChangeLogin( ev ) {

        const { name, value } = ev.target;

        console.log( { name, value } );

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );        

    };
    

    function onSubmit( ev ) {

        ev.preventDefault();

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins', dadosDeLogin)
        
        .then( ( res ) => {

            alert("Cliente atualizado com sucesso");
            setCpfDoClienteParaEditar("");
            navigate("/gerenciar_clientes")
        });
    }

    //---------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------DEU CERTO ATÉ AQUI--------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className={ styles.formulario } onSubmit = { onSubmit }>

                <h2> Dados Pessoais</h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input type = "text" id = "nome" name = "nome" defaultValue = { dadosDeLogin.nome } onChange = { onChangeLogin } />

                </div>                

                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text" id = "cpf" name = "cpf" defaultValue = { dadosDeLogin.cpf } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup }  >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "text" id = "telefone" name = "telefone" defaultValue = { dadosDeLogin.telefone } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email">  E-mail </label>
                    <input type = "email" id = "email" name = "email" defaultValue = { dadosDeLogin.email } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" defaultValue = { dadosDeLogin.senha } onChange = { onChangeLogin }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repetirSenha"> Repetir Senha </label>
                    <input type = "password" id = "repetirSenha" name = "repetirSenha" defaultValue = { dadosDeLogin.senha } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil"> Perfil </label>
                    <select id = "perfil" name = "perfil" value = { dadosDeLogin.perfil } onChange = { onChangeLogin } >

                        <option > Selecione </option>
                        <option value = "admin" > Administrador </option>
                        <option value = "cliente" > Cliente </option>
                        <option value = "medico" > Médico </option>
                        <option value = "examinador" > Examinador</option>                        

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status"> Status </label>
                    <select id = "status" name = "status" value = { dadosDeLogin.status } onChange = { onChangeLogin } >

                        <option > Selecione </option>
                        <option value = "ativo" > Ativo </option>
                        <option value = "inativo"> Inativo</option>

                    </select>

                </div> 

               

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit"  className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" onClick = { cancelar } className = { styles.botaoVoltar } > Cancelar </button>

                </div>

            </form>            

        </>

    );
};

export default EditarClientes;
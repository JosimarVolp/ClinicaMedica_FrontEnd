import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function CadastrarClientes() {

    const tituloDaPagina = "Cadastrar Cliente";

    //--------------Busca todos os convênios para preencher o campo Convênio --------------------

    

    //-----------------------------------------------------------------------------------------------

    const navigate = useNavigate();

    function cancelar() {

        navigate('/gerenciar_clientes');
    }

    const dadosIniciaisDeLogin = {

        cpf: "",
        nome: "",        
        telefone: "",
        email: "",
        senha: "",
        perfil: "",
        status: ""
    };       
    
    const [ dadosDeLogin, setDadosDeLogin ] = useState(dadosIniciaisDeLogin);
    

    

    
    
    function onChangeLogin( ev ) {

        const { name, value } = ev.target;

        console.log( { name, value } );

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );        

    };    

    function onSubmit( ev ) {

        ev.preventDefault();
        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/cadastrar_login', dadosDeLogin )

        .then( (response) => {

            console.log("Login Cadastrado");
            navigate('/gerenciar_clientes');            

        })
    };      

        



    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className={ styles.formulario } onSubmit = { onSubmit }>

                <h2> Dados Pessoais</h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChangeLogin } />

                </div>                

                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text" id = "cpf" name = "cpf" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "text" id = "telefone" name = "telefone" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email">  E-mail </label>
                    <input type = "email" id = "email" name = "email" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repetirSenha"> Repetir Senha </label>
                    <input type = "password" id = "repetirSenha" name = "repetirSenha" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil"> Perfil </label>
                    <select id = "perfil" name = "perfil" onChange = { onChangeLogin } >

                        <option></option>
                        <option value = "cliente" > Cliente </option>                   

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status"> Status </label>
                    <select id = "status" name = "status" onChange = { onChangeLogin } >

                        <option></option>
                        <option value = "ativo" > Ativo </option>
                        <option value = "inativo"> Inativo</option>

                    </select>

                </div>               

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={ cancelar } > Cancelar </button>

                </div>

            </form>            

        </>

    );
};

export default CadastrarClientes;
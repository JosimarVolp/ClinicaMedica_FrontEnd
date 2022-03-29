import React, { useState } from "react";

//import { useHistory } from "react-router-dom";

//import Botao from "../Botao";

import axios from "axios";

import styles from "./styles.module.css";

function CadastrarLogin() {

    const dadosIniciaisDeLogin = {

        cpf: "",
        nome: "",
        telefone: "",
        email:"",
        senha: "",
        perfil: "",
        status: ""
    };

    const [ dadosDeLogin, setDadosDeLogin ] = useState( dadosIniciaisDeLogin );

    //const history = useHistory();

    function onChange(ev) {

        const { name, value } = ev.target;      

        setDadosDeLogin({ ...dadosDeLogin, [name]: value });
    }

    function onSubmit(ev) {

        //Impede o comportamento default no formulário, que é enviar os dados via get
        ev.preventDefault();

        axios.post("https://clinicamedica-backend.herokuapp.com/api/cadastrar_login", dadosDeLogin)
            .then( (response) => {

                //history.push('/login');
                alert("Login cadastrado com sucesso!!");
            });

    }    

    return (

        <>

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input  type = "text" id = "nome" name = "nome" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text" id = "cpf" name = "cpf" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "tel"  id = "telefone" name = "telefone" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email"> E-mail </label>
                    <input type = "text" id = "email" name = "email" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repitaSenha" > Repita a Senha </label>
                    <input type = "password" id = "repitaSenha" name = "repitaSenha" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil" > Perfil </label>
                    <select id = "perfil" name = "perfil" onChange = { onChange } >
                    
                        <option></option>
                        <option value = "admin" > Administrador </option>
                        <option value = "cliente" > Cliente </option>
                        <option value = "medico" > Médico </option>
                        <option value = "examinador" > Examinador </option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" onChange = { onChange } >

                        <option></option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>
                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                </div>

            </form>           

        </>
        
    );
};

export default CadastrarLogin;
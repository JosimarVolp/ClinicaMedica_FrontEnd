import React, { useState, useEffect } from "react";

import TituloDaPagina from '../TituloDaPagina';


import { useNavigate } from "react-router-dom";

//SE DER RUIM APAGAR ATÉ AQUI AGORA

//import Botao from "../Botao";

import axios from "axios";

import styles from "./styles.module.css";

function CadastrarLogin() {

    const tituloDaPagina = "Cadastrar";


    const navigate = useNavigate();



    const dadosIniciaisDeLogin = {

        cpf: "",
        nome: "",
        telefone: "",
        email:"",
        senha: "",
        perfil: "cliente",
        status: "ativo"
    };

    const [ dadosDeLogin, setDadosDeLogin ] = useState( dadosIniciaisDeLogin );

    const [ conteudoRepitaSenha, setConteudoRepitaSenha ] = useState( [] );

    const [ clientes, setClientes ] = useState( [] );

    const [ cadastrado, setCadastrado ] = useState(0);
    const [ verificaSenha, setVerificaSenha ] = useState(0);

    const [ verificaSenha02, setVerificaSenha02 ] = useState(0);

    //const history = useHistory();

    function onChange(ev) {

        const { name, value } = ev.target;      

        setDadosDeLogin({ ...dadosDeLogin, [name]: value });
    }

    //Pega o conteúdo do input repita a senha e joga no state conteudoRepitaSenha

    function onChangeRepitaSenha(ev) {

        const { name, value } = ev.target;      

        setConteudoRepitaSenha({ ...conteudoRepitaSenha, [name]: value });
    }

    

    function onSubmit(ev) {

        //Impede o comportamento default no formulário, que é enviar os dados via get
        ev.preventDefault();

        if(cadastrado === 1) {

            alert("Este CPF já está cadastrado");
            

        } else if(cadastrado === 2) {

            alert("CPF deve conter 11 dígitos");


        }  else if(verificaSenha === 1) {

            alert("As senhas devem ser iguais");



        } else if(verificaSenha02 === 1) {

            alert("A senha deve ter no mínimo 6 caracteres");



        } else {

        axios.post("https://clinicamedica-backend.herokuapp.com/api/cadastrar_login", dadosDeLogin)
            .then( (response) => {

                //history.push('/login');
                alert("Login cadastrado com sucesso!!");
                navigate('/login');

            });
        }

    }    

    useEffect(() => {

        

        if(dadosDeLogin.cpf.length === 11) {

            setCadastrado(0);

            axios.get("https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins")
            .then( (res) => {

                const clientes01 = res.data;
                setClientes(clientes01);
            });           
          
        } else {

            setCadastrado(2);
        }


    },[dadosDeLogin.cpf]);

    useEffect(() => {

        if(dadosDeLogin.senha === conteudoRepitaSenha.repitaSenha) {

            setVerificaSenha(0);                     
          
        } else {

            setVerificaSenha(1);
        }

    },[conteudoRepitaSenha.repitaSenha]);

    useEffect(() => {

        if(dadosDeLogin.senha.length >= 6) {

            setVerificaSenha02(0);                     
          
        } else {

            setVerificaSenha02(1);
        }

    }, [dadosDeLogin.senha]);

    

    useEffect(() => {

        clientes.forEach(( item ) => {
            
            if(item.cpf === dadosDeLogin.cpf ) {

                setCadastrado(1);
            }
        });

    },[clientes]);



    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />            

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup }>

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input  type = "text" id = "nome" name = "nome" onChange = { onChange } required />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text" id = "cpf" name = "cpf" onChange = { onChange } required placeholder = "Somente números"  />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "tel"  id = "telefone" name = "telefone" onChange = { onChange } required/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email"> E-mail </label>
                    <input type = "text" id = "email" name = "email" onChange = { onChange } required/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" onChange = { onChange } required/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repitaSenha" > Repita a Senha </label>
                    <input type = "password" id = "repitaSenha" name = "repitaSenha" required onChange={onChangeRepitaSenha} />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil" > Perfil </label>
                    <select id = "perfil" name = "perfil" onChange = { onChange } disabled>
                    
                       
                        <option value = "cliente" > Cliente </option>
                        

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" onChange = { onChange } disabled>

                        
                        <option value = "ativo"> Ativo </option>
                       

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
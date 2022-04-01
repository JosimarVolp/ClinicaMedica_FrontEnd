import React, { useState, useEffect,  useContext } from 'react';

import TituloDaPagina from '../TituloDaPagina';

import { Link, useNavigate } from 'react-router-dom';

import styles from './styles.module.css';
import axios from 'axios';

import { contextUsuarioConectado } from '../../App';

import { contextBotaoCadastrar } from '../../App';
import { contextBotaoLogin } from '../../App';

function Login() {

    const tituloDaPagina = "Login";

    const navigate = useNavigate();

    const { setUsuarioConectado } = useContext(contextUsuarioConectado);

    const { setDadosDoBotaoCadastrar } = useContext(contextBotaoCadastrar);
    const { setDadosDoBotaoLogin } = useContext(contextBotaoLogin);

    const dadosIniciaisDeLogin = {

        cpf: "",        
        senha: ""
        
    };

    const [ dadosDeLogin, setDadosDeLogin ] = useState(dadosIniciaisDeLogin);

    const [ clientes, setClientes ] = useState( [] );

    const [ cadastrado, setCadastrado ] = useState(1);

    useEffect(() => {        

        if(dadosDeLogin.cpf.length === 11) {

             axios.get("https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins")
            .then( (res) => {

                const clientes01 = res.data;
                setClientes(clientes01);
            });  
                   
        }
       


    },[dadosDeLogin.cpf]);

    

    useEffect(() => {

        setCadastrado(1);
        

        clientes.map(( item ) => {

            console.log("CPF Salvo: " + item.cpf); 
            console.log("CPF Digitado: " + dadosDeLogin.cpf);            
            
            if(item.cpf == dadosDeLogin.cpf ) {

                setCadastrado(0);
                console.log("São iguais");
                
                
            } 
        });

    },[clientes]);
    
    
    
    function matchLogin() { 

        if(cadastrado === 1) {

            alert("CPF não cadastrado");
        } else {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins/${dadosDeLogin.cpf}`)
            
            .then( ( res ) => {

                let senha = res.data.senha;

                if( senha === dadosDeLogin.senha) {

                    setUsuarioConectado(res.data);

                    navigate('/area_restrita');

                    const dadosDoBotaoCadastrar = {

                        titulo: "Área do Usuário",
                        link:"/area_restrita"
                    }
                    setDadosDoBotaoCadastrar( dadosDoBotaoCadastrar );

                    const dadosDoBotaoLogin = {

                        titulo: "Sair",
                        link:"/"
                    }
                    setDadosDoBotaoLogin( dadosDoBotaoLogin );
                
                } else {

                    alert("Senha Inválida");
                }


            });
        }
            

    };

   

    function onChange( ev ) {

        const { name, value } = ev.target;
        setDadosDeLogin( {...dadosDeLogin, [name]:value } );

    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />            

            <section className={ styles.login }>

                <form  className = {styles.formLogin}>

                    <label htmlFor = "cpf" > CPF </label>
                    <input type="text" id = "cpf" name = "cpf" onChange = { onChange } required/>

                    <label htmlFor = "senha"> Senha </label>
                    <input type="password" id = "senha" name = "senha" onChange = { onChange } required/>

                

                <button type= "button" onClick = { matchLogin } > Entrar </button>
                </form>

                <span> Não tem Login? <Link to = '/cadastrar_login'>Cadastre-se</Link></span>

            </section>

        </>
    );
}

export default Login;
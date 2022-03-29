import React, { useContext} from 'react';

import { Link } from "react-router-dom";

import styles from './styles.module.css';

import { useNavigate } from 'react-router-dom';


import { contextUsuarioConectado } from '../../App';
import { contextBotaoCadastrar } from '../../App';
import { contextBotaoLogin } from '../../App';

function Botao( props ) {

    const { setUsuarioConectado } = useContext(contextUsuarioConectado);

    const { setDadosDoBotaoCadastrar } = useContext(contextBotaoCadastrar);
    const { setDadosDoBotaoLogin } = useContext(contextBotaoLogin);

    const navigate = useNavigate();

    const dadosIniciaisDoUsuarioConectado = {

        cpf: "",
        nome:"",
        telefone:"",
        email:"",
        senha:"",
        perfil:"",
        status:""
    
      }

      const dadosIniciaisDoBotaoCadastrar = {

        titulo: "Cadastrar",
        link:"/cadastrar_login"
    }
    

    const dadosIniciaisDoBotaoLogin = {

        titulo: "Login",
        link:"/login"
    }
    

    function clicaSair() {

        if(props.dadosDoBotao.titulo === "Sair") {            

            setUsuarioConectado(dadosIniciaisDoUsuarioConectado);
            setDadosDoBotaoCadastrar( dadosIniciaisDoBotaoCadastrar );
            setDadosDoBotaoLogin( dadosIniciaisDoBotaoLogin );
            navigate('/');
            
        }
               
    }
    
    return (

        
        <button onClick = { clicaSair } className={ styles.botao }>

            <Link className={ styles.link }to = { props.dadosDoBotao.link } > { props.dadosDoBotao.titulo } </Link>

            </button>
        

    );
};

export default Botao;
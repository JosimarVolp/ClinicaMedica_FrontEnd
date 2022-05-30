import React, {useState, useEffect, useContext} from 'react';

import styles from './styles.module.css';

import TituloPrincipal from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import { contextUsuarioConectado } from "../../App";

import medico from "../../assets/carlos_cardio.jpg";

function DescricaoEspecialista( props ) {

    const tituloDaPagina = props.especialista.nome;

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const [ especialista, setEspecialista ] = useState( {} );

    const navigate = useNavigate();

    useEffect(() => {

        setEspecialista( props.especialista );

    } , [props.especialista]);

    useEffect(() => {

        if(especialista.imagem !== undefined) {

            const nomeImagem = especialista.imagem;
            const numCaracteres = nomeImagem.length;                        
            const nomeImagemEditado = nomeImagem.substring(12, numCaracteres);
            setEspecialista( { ...especialista, imagem: nomeImagemEditado } );

        }

    
    }, [especialista.cpf])

    function onClickConsultas() {

        if(usuarioConectado.cpf !== "") {

            navigate('/gerenciar_consultas_agendadas/agendar');

        } else {

            navigate('/login');
        }
    }

    return(

        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } /> 

            <div className = { styles.container }>            

                <img className = { styles.imagem } src = {`https://clinicamedica-backend.herokuapp.com/files/${especialista.imagem}`}  alt = { especialista.nome } ></img>

                <p>{ especialista.biografia }</p>    

                <button type = "button" onClick = { onClickConsultas } className = { styles.botaoAgendar }> Agendar Consulta </button>    
            
            </div>

        </>
    );

};

export default DescricaoEspecialista;  




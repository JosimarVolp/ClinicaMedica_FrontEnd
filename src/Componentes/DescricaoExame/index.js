import React, {useState, useEffect, useContext} from 'react';

import styles from './styles.module.css';

import TituloPrincipal from "../TituloDaPagina";

import raio_x from "../../assets/raio_x.jpg"

import { useNavigate } from "react-router-dom";

import { contextUsuarioConectado } from "../../App";

function DescricaoExame( props ) {

    const tituloDaPagina = props.exame.nome;

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const [ exame, setExame ] = useState( {} );

    const navigate = useNavigate();

    useEffect(() => {

        setExame( props.exame );

    } , [props.exame]); 

    useEffect(() => {

        if(exame.imagem !== undefined) {

            const nomeImagem = exame.imagem;
            const numCaracteres = nomeImagem.length;                        
            const nomeImagemEditado = nomeImagem.substring(12, numCaracteres);
            setExame( { ...exame, imagem: nomeImagemEditado } );

        }

    
    }, [exame.id])

    function onClickExames() {

        if( usuarioConectado.cpf !== "") {

            navigate('/gerenciar_exames_e_procedimentos_agendados/agendar');

        } else {

            navigate('/login');
        }
    }

    return(

        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } /> 

            <div className = { styles.container }>

                <img className = { styles.imagem } src = {`https://clinicamedica-backend.herokuapp.com/files/${exame.imagem}`} alt = "Neurologia" />

                <p>{ exame.descricao}</p>    

                <button type = "button" onClick = { onClickExames } className = { styles.botaoAgendar } > Agendar Exames </button>    

            </div>

        </>
    );

};

export default DescricaoExame;  
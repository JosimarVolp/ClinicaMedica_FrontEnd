import React, { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import styles from './styles.module.css';

import TituloPrincipal from "../TituloDaPagina";

import { Link, useNavigate } from "react-router-dom";


import { contextEspecialistaSelecionado, contextUsuarioConectado } from "../../App";


function DescricaoEspecialidade( props ) {

    const tituloDaPagina = props.especialidade.nome;

    const { idEspecialistaSelecionado, setIdEspecialistaSelecionado } = useContext(contextEspecialistaSelecionado);

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const [ especialidade, setEspecialidade ] = useState( {} );

    const navigate = useNavigate();

    useEffect(() => {

        setEspecialidade( props.especialidade );

    } , [props.especialidade]);    
    
//var dataEditada = consultaAgendada.data.substring(0, 10);
    useEffect(() => {

        if(especialidade.imagem !== undefined) {

            const nomeImagem = especialidade.imagem;
            const numCaracteres = nomeImagem.length;                        
            const nomeImagemEditado = nomeImagem.substring(12, numCaracteres);
            setEspecialidade( { ...especialidade, imagem: nomeImagemEditado } );

        }

    
    }, [especialidade.id])

    const [ medicos, setMedicos ] = useState([]);

    function onClickConsultas() {

        if(usuarioConectado.cpf !== "") {

            navigate('/gerenciar_consultas_agendadas/agendar');

        } else {

            navigate('/login');
        }
    }

    useEffect(() => {

        if(especialidade.id !== undefined) {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos/especialidades/${especialidade.id}`)

            .then(res => {

                let medicosTemp = res.data;
                setMedicos(  medicosTemp );

            })
            .catch(err => {

                console.log(err);

            });
        }

    
    }, [especialidade.id])

    

    return(

        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />            


        <div className = { styles.container }>

            

            
        <img className = { styles.imagem } src = {`https://clinicamedica-backend.herokuapp.com/files/${especialidade.imagem}`}  alt = { especialidade.nome } ></img>
        

        <p>{especialidade.descricao}</p>        

        <p>Confira abaixo os médicos que atendem essa especialidade.</p>        

        <table className = {styles.tabela}>

            <tbody>

                    {medicos.map((medico) => (

                        <tr key={medico.cpf}><td><Link className = {styles.link} to = {`/especialistas/${medico.cpf}`} onClick = { () => setIdEspecialistaSelecionado(medico.cpf) }  > {medico.nome} </Link></td></tr>
                    ))}
            </tbody>

        </table>

        <button type = "button" onClick = { onClickConsultas } className = { styles.botaoAgendar }> Agendar Consulta </button>
        
        </div>

        

        </>
    );

};

export default DescricaoEspecialidade;  




import React, { useState, useEffect, useContext } from "react";

import TituloDaPagina from "../TituloDaPagina";

import axios from "axios";

import styles from "./styles.module.css";

import { useNavigate, Link } from "react-router-dom";

import { contextUsuarioConectado } from "../../App";

import { contextConsultas } from "../../App";

function GerenciarConsultas() {

    const navigate = useNavigate();

    const tituloDaPagina = "Consultas Agendadas";

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const { setIdDaConsultaParaEditar } = useContext(contextConsultas);

    //pegar dados das consultas

    const [ consultas, setConsultas ] = useState([]);

    useEffect( ( ) => {

        if(usuarioConectado.perfil === "cliente") {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/paciente/${usuarioConectado.cpf}`)
                
            .then( ( res ) => {

                let consultas01 = res.data;
                setConsultas( consultas01 ); 
                               
            });

           
            
        } else if(usuarioConectado.perfil === "admin") {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas`)
                
            .then( ( res ) => {

                let consultas = res.data;
                setConsultas( consultas );
            });
        } else if(usuarioConectado.perfil === "medico") {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/medico/${usuarioConectado.cpf}`)
                
            .then( ( res ) => {

                let consultas = res.data;
                setConsultas( consultas );
            });
        }

    }, []);
   

    function retornaHomeRestrita() {

        navigate('/area_restrita');
    }

    function novaConsulta() {

        navigate('/gerenciar_consultas_agendadas/agendar');

    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

           
            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th className= {styles.header01}> Paciente </th>
                        <th className= {styles.header01}> Especialidade </th>
                        <th> Médico </th>
                        <th> Data </th>
                        <th> Hora </th>
                        <th> </th>
                    </tr>

                </thead>

                <tbody>

                    { consultas.map( ( consulta ) => (   
                        
                        
                        
                        

                        <tr key = { consulta.id } >

                            <td className = { styles.coluna01 }> { consulta.paciente } </td>
                            <td className = { styles.coluna02 }> { consulta.especialidade } </td>
                            <td className = { styles.coluna03 }> { consulta.medico } </td>
                            <td className = { styles.coluna04 }> { consulta.data.substring(0, 10) } </td>
                            <td className = { styles.coluna05 }> { consulta.hora.substring(0, 5) } </td>
                            <td className = { styles.coluna06 }><Link to = { `/gerenciar_consultas_agendadas/editar/${consulta.id}`}  > <button onClick = { () => setIdDaConsultaParaEditar(consulta.id) } className = { styles.botaoEditar } > Editar </button></Link></td>
                            
                        </tr>

                    ))}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "6"> Há {consultas.length} Consultas Agendadas</td>

                    </tr>

                </tfoot>

            </table>
            
            <div className = { styles.caixaDeBotoes }>
            
                
                <button type = "button" className = { styles.botaoAgendar } onClick = { novaConsulta }> Agendar Consulta </button>

                <button type = "button" className = { styles.botaoVoltar } onClick = { retornaHomeRestrita }> Voltar </button>
                
            </div>

        </>
    );
};

export default GerenciarConsultas;
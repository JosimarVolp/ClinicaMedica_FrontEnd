import React, { useState, useEffect, useContext } from "react";

import TituloDaPagina from "../TituloDaPagina";
//import Tabela from "../Tabela";
import Botao from "../Botao";

import styles from "./styles.module.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { contextUsuarioConectado } from "../../App";

import { contextExamesAgendados } from "../../App";


function GerenciarExamesAgendados() {

    const navigate = useNavigate();

    const tituloDaPagina = "Exames / Procedimentos Agendados";

    const dadosDoBotao = [

        {
            titulo: "Novo",
            link: "/gerenciar_exames_e_procedimentos_agendados/agendar"
        }
    ];

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    const { setIdDoExameAgendadoParaEditar } = useContext(contextExamesAgendados);

    //------------------DADOS DE TODAS AS CONSULTAS----------------------------------------------------------------

    const [ exames, setExames ] = useState([]);

    useEffect( ( ) => {

        if(usuarioConectado.perfil === "admin") {
        
            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados`)
            
            .then( ( res ) => {

                let exames = res.data;
                setExames( exames );
            });
        } else if(usuarioConectado.perfil === "cliente") {
        
            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/cliente/${usuarioConectado.cpf}`)
            
            .then( ( res ) => {

                let exames = res.data;
                setExames( exames );
            });
        } else  if(usuarioConectado.perfil === "examinador") {
        
            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/funcionario/${usuarioConectado.cpf}`)
            
            .then( ( res ) => {

                let exames = res.data;
                setExames( exames );
            });
        }         
    
    },[]);

    //---------------------------------------------------------------------------------------------------

    function retornaHomeRestrita() {

        navigate('/area_restrita');

    }

    function novoExame() {

        navigate('/gerenciar_exames_e_procedimentos_agendados/agendar');

    }

    

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />
            
            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Cliente </th>
                        <th> Exame / Procedimento </th>
                        <th> Funcionário </th>                        
                        <th> Data </th>
                        <th> Hora </th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    { exames.map( ( exame ) => (

                        <tr key = { exame.id }>

                            <td className = { styles.coluna01 }> { exame.cliente } </td>
                            <td className = { styles.coluna02 }> { exame.exame } </td>
                            <td className = { styles.coluna03 }> { exame.funcionario } </td>
                            <td className = { styles.coluna04 }> { exame.data } </td>
                            <td className = { styles.coluna05 }> { exame.hora } </td>
                            <td className = { styles.coluna06 }><Link to = {`/gerenciar_exames_e_procedimentos_agendados/editar/${exame.id}`} ><button className = { styles.botaoEditar } onClick = { () => setIdDoExameAgendadoParaEditar(exame.id) } > Editar </button></Link></td>
                            

                        </tr>     
                    
                    ))}

                </tbody>

                <tfoot>

                    <tr>

                    <td colSpan = "6"> Há {exames.length} exames agendados. </td>

                    </tr>

                </tfoot>
            </table>

            <div className = { styles.caixaDeBotoes }>
            
                

                <button type = "button" className = { styles.botaoAgendar } onClick = { novoExame }> Agendar Exame </button>

                <button type = "button" className = { styles.botaoVoltar } onClick = { retornaHomeRestrita }> Voltar </button>
                
            </div>
        </>
    );
};

export default GerenciarExamesAgendados;
import React, { useState, useEffect, useContext } from "react";

import styles from './styles.module.css';

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import { contextUsuarioConectado } from "../../App";


function Resultados() {

    const tituloDaPagina = "Resultados de Exames"

    const navigate = useNavigate();    

    const { usuarioConectado } = useContext(contextUsuarioConectado);    

    //------------------DADOS DE TODOS OS EXAMES----------------------------------------------------------------

    const [ exames, setExames ] = useState([]);

    useEffect( ( ) => {

        if(usuarioConectado.perfil === "cliente") {
        
            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/status/cliente/${usuarioConectado.cpf}`)
            
            .then( ( res ) => {

                let exames = res.data;
                setExames( exames );
            });
        }       
    
    },[]);

    function transformaData( exame ) {

        var ano = exame.data.substring(0, 4);
        var mes = exame.data.substring(5, 7);            
        var dia = exame.data.substring(8, 10);            
                
        return dia+"/"+mes+"/"+ano;

    }

    //---------------------------------------------------------------------------------------------------

    function retornaHomeRestrita() {

        navigate('/area_restrita');

    }
    

    

    return(

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />
            
            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Exame / Procedimento </th>                        
                        <th> Data </th>                        
                        <th> Resultado </th>

                    </tr>

                </thead>

                <tbody>

                    { exames.map( ( exame ) => (

                        <tr key = { exame.id }>

                            <td className = { styles.coluna01 }> { exame.exame } </td>                            
                            <td className = { styles.coluna02 }> { transformaData(exame) } </td>
                            <td className = { styles.coluna03 }><a href = 'https://clinicamedica-backend.herokuapp.com/files/resultado.pdf' target={"_blank"}>Ver </a></td>
                            

                        </tr>   
                        
                    
                    ))}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "6"> Há {exames.length} exames realizados. </td>

                    </tr>

                </tfoot>
            </table>

            <div className = { styles.caixaDeBotoes }>
            
                <button type = "button" className = { styles.botaoVoltar } onClick = { retornaHomeRestrita }> Voltar </button>
                
            </div>

        </>
    );

};

export default Resultados;  
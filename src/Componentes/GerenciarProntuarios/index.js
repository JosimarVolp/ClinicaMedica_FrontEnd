import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import { Link, useNavigate } from "react-router-dom";

import { contextProntuarioSelecionado } from "../../App";



import styles from "./styles.module.css";

function GerenciarProntuarios( ) {

    const tituloDaPagina = "Prontuários";

    const navigate = useNavigate();

    const [ prontuarios, setProntuarios ] = useState([]);

    const { cpfDoProntuarioSelecionado, setCpfDoProntuarioSelecionado } = useContext(contextProntuarioSelecionado);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_prontuarios')
        
        .then( (res) => {

            const prontuariosTemp = res.data;
            setProntuarios( prontuariosTemp );

        });

    }, []);

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoProntuario() {

        navigate('/gerenciar_prontuarios/cadastrar');

    }

    return(

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />
            
            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Paciente </th>
                        <th colSpan={2}>  </th>
                        

                    </tr>

                </thead>

                <tbody>

                    {
                        prontuarios.map( (prontuario) => (

                            <tr key = { prontuario.cpf}>

                                <td className = { styles.coluna01 }> { prontuario.nome } </td>
                                <td className = { styles.coluna02 } > <Link to = {`/prontuarios/${prontuario.cpf}`} > <button onClick = { () => setCpfDoProntuarioSelecionado(prontuario.cpf) }  className = { styles.botaoEditar } > Ver </button></Link></td>                                
                                <td className = { styles.coluna03 } > <Link to = {`/gerenciar_prontuarios/editar/${prontuario.cpf}`} > <button onClick = { () => setCpfDoProntuarioSelecionado(prontuario.cpf) }  className = { styles.botaoEditar } > Editar </button></Link></td>

                            </tr>

                        ))                      

                    }                    

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "3"> Há {prontuarios.length} prontuários cadastrados</td>

                    </tr>

                </tfoot>

            </table>

            <div className = { styles.caixaDeBotoes }>
                
                <button type = "button"  onClick = { novoProntuario } className = { styles.botaoCadastrar}> Novo </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>

            </div>
        </>
    );
};

export default GerenciarProntuarios;
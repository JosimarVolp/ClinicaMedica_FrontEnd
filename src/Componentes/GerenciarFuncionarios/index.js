import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";
//import Tabela from "../Tabela";
import Botao from "../Botao";

import styles from "./styles.module.css";

import { useNavigate } from "react-router-dom";

import { contextFuncionarios } from "../../App";

function GerenciarFuncionarios() {

    const tituloDaPagina = "Funcionários";

    const navigate = useNavigate();

    const [ funcionarios, setFuncionarios ] = useState([]);

    const { cpfDoFuncionarioParaEditar, setCpfDoFuncionarioParaEditar } = useContext(contextFuncionarios);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios')
        
        .then( res => {

            const funcionarios = res.data;
            setFuncionarios(funcionarios);
        });

    }, []);

    const dadosDoBotao = [

        {
            titulo: "Novo",
            link: "/gerenciar_funcionarios/cadastrar"
        }
    ];

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoFuncionario() {

        navigate('/gerenciar_funcionarios/cadastrar');
    }

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <table className = {  styles.tabela }>

                <thead>

                    <tr>

                        <th> Funcionário </th>
                        <th> Cargo </th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    { funcionarios.map( (funcionario) => ( 

                        <tr key = { funcionario.cpf }>

                            <td className = { styles.coluna01 }> { funcionario.nome }  </td>
                            <td className = { styles.coluna02 }> { funcionario.cargo } </td>
                            <td className = { styles.coluna03 }><Link to = {`/gerenciar_funcionarios/editar/${funcionario.cpf}`} ><button onClick = { () => setCpfDoFuncionarioParaEditar(funcionario.cpf) } className = { styles.botaoEditar }> Editar </button></Link></td>

                        </tr>
                    ))}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "3"> Há {funcionarios.length} funcionários cadastrados. </td>

                    </tr>

                </tfoot>

            </table>

            <div className = { styles.caixaDeBotoes }>
            
                <button type = "button" onClick = { novoFuncionario } className = { styles.botaoCadastrar } > Novo </button>

                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar } > Voltar </button>

            </div>
        </>
    );
};

export default GerenciarFuncionarios;
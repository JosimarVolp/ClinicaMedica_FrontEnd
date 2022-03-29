import React, { useState, useEffect, useContext } from "react";

import { Link } from 'react-router-dom';

import TituloDaPagina from "../TituloDaPagina";

import Botao from "../Botao";

import styles from "./styles.module.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { contextClientes } from "../../App";

function GerenciarClientes() {

    const navigate = useNavigate();

    const tituloDaPagina = "Clientes";

    const { cpfDoClienteParaEditar, setCpfDoClienteParaEditar } = useContext(contextClientes);


    const [ clientes, setClientes ] = useState([]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins/perfil/cliente')
        
        .then( res => {

            const clientes = res.data;
            setClientes( clientes );
        });


    }, [] );



    const dadosDoBotao = [

        {
            titulo: "Cadastrar Novo Cliente",
            link: "/gerenciar_clientes/cadastrar"
        }
    ];

    function retornaAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoCliente() {

        navigate('/gerenciar_clientes/cadastrar');
    }

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />            
            
            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Nome </th>
                        <th> CPF </th>
                        <th></th>                        

                    </tr>                    

                </thead>

                <tbody>

                    { clientes.map( (cliente) => (

                        <tr key = { cliente.cpf }> 

                            <td className = { styles.coluna01 }> { cliente.nome } </td>
                            <td className = { styles.coluna02 }> { cliente.cpf } </td>
                            <td className = { styles.coluna03 }><Link to = {`/gerenciar_clientes/editar/${cliente.cpf}`}><button onClick = { () => setCpfDoClienteParaEditar(cliente.cpf) } className = {  styles.botaoEditar } > Editar </button></Link></td>

                        </tr>
                    ))}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "3"> Há {clientes.length} clientes cadastrados</td>

                    </tr>

                </tfoot>

            </table>

            <div className = { styles.caixaDeBotoes }>
                
                <button type = "button" onClick={ novoCliente } className = { styles.botaoCadastrar }> Novo </button>

                <button type = "button" onClick={ retornaAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>
                
            </div>
        </>
    );
};

export default GerenciarClientes;
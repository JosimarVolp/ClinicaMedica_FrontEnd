import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import Botao from "../Botao";

import styles from "./styles.module.css";

import axios from "axios";

import { contextConvenios } from "../../App";

function GerenciarConvenios() {

    const tituloDaPagina = "Convênios";

    const navigate = useNavigate();

    const [ convenios, setConvenios ] = useState([]);

    const { idDoConvenioParaEditar, setIdDoConvenioParaEditar} = useContext(contextConvenios);

    const dadosDoBotao = [

        {
            titulo: "Novo",
            link: "/gerenciar_convenios/cadastrar"
        }
    ]

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios')
      
        .then( res => {
        
        const convenios = res.data;
        setConvenios( convenios );       

      } );


    },[]);

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoConvenio() {

        navigate('/gerenciar_convenios/cadastrar');
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Convênio </th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {convenios.map((convenio) => (

                        <tr key = { convenio.id }>

                            <td className = { styles.coluna01 }> {convenio.nome} </td>
                            <td className = { styles.coluna02 } > <Link to = {`/gerenciar_convenios/editar/${convenio.id}`}><button  onClick = { () => setIdDoConvenioParaEditar(convenio.id) } className = { styles.botaoEditar } > Editar </button></Link></td>

                        </tr>
                    ))}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há {convenios.length} convênio cadastrados </td>

                    </tr>

                </tfoot>

            </table>

            <div className = { styles.caixaDeBotoes } >
                
                <button type = "button" onClick = { novoConvenio } className = { styles.botaoCadastrar}> Novo </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>

            </div>
        </>
    );
};

export default GerenciarConvenios;
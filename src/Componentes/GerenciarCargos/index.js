import React, { useEffect, useState, useContext } from "react";

import axios from "axios";

import TituloPrincipal from "../TituloDaPagina";

import Botao from "../Botao";

import styles from "./styles.module.css";

import { Link, useNavigate } from "react-router-dom";

import { contextCargos } from "../../App";

function GerenciarCargos() {

    const tituloDaPagina = "Cargos";

    const navigate = useNavigate();

    const [ cargos, setCargos ] = useState([]);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos')
        
        .then( (res) => {

            const cargos = res.data;
            setCargos( cargos );

        });

    }, []);

    const { idDoCargoParaEditar, setIdDoCargoParaEditar } = useContext(contextCargos);



    const dadosDoBotao = [

        {
            titulo: "Novo",
            link: "/gerenciar_cargos/cadastrar"
        }
    ];

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoCargo() {

        navigate('/gerenciar_cargos/cadastrar');

    }

    return (

        <>
            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />

            <table className = { styles.tabela } >

                <thead>

                    <tr>

                        <th> Cargo </th>                        
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {cargos.map( cargo => (

                        <tr key = {cargo.id}>

                        <td className = { styles.coluna01 }> {cargo.nome}</td>
                        <td className = { styles.coluna02 } > <Link to = {`/gerenciar_cargos/editar/${cargo.id}`} > <button onClick = { () => setIdDoCargoParaEditar(cargo.id) }  className = { styles.botaoEditar } > Editar </button></Link></td>

                    </tr>
                    ))}

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há {cargos.length} cargos cadastrados</td>

                    </tr>

                </tfoot>


            </table>
            
            <div className = { styles.caixaDeBotoes }>
                
                <button type = "button" onClick = { novoCargo } className = { styles.botaoCadastrar}> Novo </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>

            </div>
        </>
    );
};

export default GerenciarCargos;
import React, {useState, useEffect, useContext} from "react";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import { Link, useNavigate } from "react-router-dom";

import { contextComorbidadeSelecionada } from "../../App";



import styles from "./styles.module.css";

function GerenciarComorbidades( ) {

    const tituloDaPagina = "Comorbidades";

    const navigate = useNavigate();

    const [ comorbidades, setComorbidades ] = useState([]);

    const { idComorbidadeSelecionada, setIdComorbidadeSelecionada } = useContext(contextComorbidadeSelecionada);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_comorbidades')
        
        .then( (res) => {

            const comorbidadesTemp = res.data;
            setComorbidades( comorbidadesTemp );

        });

    }, []);

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novaComorbidade() {

        navigate('/gerenciar_comorbidades/cadastrar');

    }

    return(

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />
            
            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Comorbidade </th>
                        <th>  </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        comorbidades.map( (comorbidade) => (

                            <tr key = { comorbidade.id}>

                                <td className = { styles.coluna01 }> { comorbidade.nome } </td>                                
                                <td className = { styles.coluna02 } > <Link to = {`/gerenciar_comorbidades/editar/${comorbidade.id}`} > <button onClick = { () => setIdComorbidadeSelecionada(comorbidade.id) }  className = { styles.botaoEditar } > Editar </button></Link></td>

                            </tr>

                        ))                      

                    }                    

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há {comorbidades.length} comorbidades cadastradas</td>

                    </tr>

                </tfoot>

            </table>

            <div className = { styles.caixaDeBotoes }>
                
                <button type = "button" onClick = { novaComorbidade } className = { styles.botaoCadastrar}> Novo </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>

            </div>
        </>
    );
};

export default GerenciarComorbidades;
import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";


//import Tabela from "../Tabela";
import Botao from "../Botao";

import styles from "./styles.module.css";

import { contextExames } from "../../App";

function GerenciarExames( props ) {

    const tituloDaPagina = "Exames / Procedimentos";

    const navigate = useNavigate();

    const { idDoExameParaEditar, setIdDoExameParaEditar } = useContext(contextExames);

    const dadosDoBotao = [

        {
            titulo: "Novo",
            link: "/gerenciar_exames_e_procedimentos/cadastrar"
        }
    ];

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoExame() {

        navigate('/gerenciar_exames_e_procedimentos/cadastrar');
    }

    return (

        <>
            
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Exame / Procedimento </th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    { props.exames.map( ( exame ) => ( 


                        <tr key = { exame.id }>

                            <td className = { styles.coluna01 }> { exame.nome }  </td>
                            <td className = { styles.coluna02 } ><Link to = {`/gerenciar_exames_e_procedimentos/editar/${exame.id}`} ><button onClick = { () => setIdDoExameParaEditar(exame.id) } className = { styles.botaoEditar } > Editar </button></Link></td>

                        </tr>

                    ))}                    

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há {props.exames.length} exames cadastrados </td>

                    </tr>

                </tfoot>

            </table>
            

            <div className = { styles.caixaDeBotoes }>
                
            <button type = "button" onClick = { novoExame } className = { styles.botaoCadastrar } > Novo </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar } > Voltar </button>
            
            </div>
        </>
    );
};

export default GerenciarExames;
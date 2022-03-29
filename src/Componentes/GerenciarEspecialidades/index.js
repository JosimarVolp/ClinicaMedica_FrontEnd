import React, { useContext } from "react";

import { idEdicao } from '../../App'

import TituloPrincipal from "../TituloDaPagina";

import Botao from "../Botao";

import styles from "./styles.module.css";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function GerenciarEspecialidades( props ) {

    

    const tituloDaPagina = "Especialidades";  
    
    const navigate = useNavigate();

    const dadosDoBotao = [

        {
            titulo: "Nova",
            link: "/gerenciar_especialidades/cadastrar"
        }
    ];

    const { valorID, setValorID } = useContext(idEdicao);

    //setValorID(0);

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novaEspecialidade() {

        navigate('/gerenciar_especialidades/cadastrar');
    }

    return (

        <>
            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />

            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Especialidade </th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    { props.especialidades.map(( especialidade ) => ( 

                        <tr key = { especialidade.id }>

                            <td className = { styles.coluna01 }> { especialidade.nome }  </td>
                            <td className = { styles.coluna02 } > <Link to = {`/gerenciar_especialidades/editar/${especialidade.id}`} > <button onClick = { () => setValorID(especialidade.id) } className = { styles.botaoEditar } > Editar </button></Link></td>
                        </tr>

                    ))}    

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2" > Há {props.especialidades.length} especialidades cadastradas. </td>

                    </tr>

                </tfoot>

            </table>
            
            <div className = { styles.caixaDeBotoes }>
                
                <button type = "button" onClick = { novaEspecialidade } className = { styles.botaoCadastrar } > Nova </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>

            </div>
        </>
    );
};

export default GerenciarEspecialidades;
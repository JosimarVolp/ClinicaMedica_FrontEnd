import React from "react";

import TituloDaPagina from "../TituloDaPagina";
//import Tabela from "../Tabela";
import Botao from "../Botao";

import styles from "./styles.module.css";

function GerenciarComorbidades() {

    const tituloDaPagina = "Comorbidades";

    const dadosDoBotao = [

        {
            titulo: "Nova",
            link: "/gerenciar_comorbidades/cadastrar"
        }
    ]

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

                    <tr>

                        <td className = { styles.coluna01 }> Diabetes </td>
                        <td className = { styles.coluna02 }><button className = { styles.botaoEditar }> Editar </button></td>

                    </tr>

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há X comorbidades cadastradas</td>

                    </tr>

                </tfoot>

            </table>

            <div className = { styles.botao }>

                <Botao dadosDoBotao = { dadosDoBotao[0] } />

            </div>
        </>
    );
};

export default GerenciarComorbidades;
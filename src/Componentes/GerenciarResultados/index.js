import React from "react";

import TituloDaPagina from "../TituloDaPagina";
//import Tabela from "../Tabela";
//import Botao from "../Botao";

import styles from "./styles.module.css";

function GerenciarResultados() {

    const tituloDaPagina = "Resultados";

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Cliente </th>
                        <th> Exame / Procedimento </th>
                        <th> Funcionário </th>
                        <th> Data </th>
                        <th> Hora </th>
                        <th></th>
                        
                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className = { styles.coluna01 }> José da Silva </td>
                        <td className = { styles.coluna02 }> Raio-X </td>
                        <td className = { styles.coluna03 }> João Paulo </td>
                        <td className = { styles.coluna04 }> 22/11/2021 </td>
                        <td className = { styles.coluna05 }> 17:00:00 </td>
                        <td className = { styles.coluna06 }><button className = { styles.botaoEditar }> Ver </button> </td>

                    </tr>

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "6"> Há X resultados a serem exibidos. </td>

                    </tr>

                </tfoot>

            </table>            
           
        </>
    );
};

export default GerenciarResultados;
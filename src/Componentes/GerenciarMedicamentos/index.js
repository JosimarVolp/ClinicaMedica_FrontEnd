import React from "react";

import TituloDaPagina from "../TituloDaPagina";
//import Tabela from "../Tabela";
import Botao from "../Botao";

import styles from "./styles.module.css";

function GerenciarMedicamentos() {

    const tituloDaPagina = "Medicamentos";

    const dadosDoBotao = [

        {
            titulo: "Novo",
            link: "/gerenciar_medicamentos/cadastrar"
        }
    ]

    return (

        <>
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <table className = { styles.tabela }>

                <thead>

                    <tr>

                        <th> Medicamento </th>
                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    <tr>

                        <td className = { styles.coluna01 }> Atensina </td>
                        <td className = { styles.coluna02 }><button className = { styles.botaoEditar }> Editar </button></td>

                    </tr>

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há X medicamentos cadastrados </td>

                    </tr>

                </tfoot>
            </table>
            
            <div className = { styles.botao }>
                
                <Botao dadosDoBotao = { dadosDoBotao[0] } />

            </div>
        </>
    );
};

export default GerenciarMedicamentos;
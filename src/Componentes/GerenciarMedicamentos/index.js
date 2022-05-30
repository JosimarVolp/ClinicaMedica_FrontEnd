import React, {useState, useEffect, useContext} from "react";

import TituloDaPagina from "../TituloDaPagina";

import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

import { contextMedicamentoSelecionado } from "../../App";

function GerenciarMedicamentos() {

    const tituloDaPagina = "Medicamentos";

    const navigate = useNavigate();

    const [ medicamentos, setMedicamentos ] = useState([]);

    const { idMedicamentoSelecionado, setIdMedicamentoSelecionado } = useContext(contextMedicamentoSelecionado);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicamentos')
        
        .then( (res) => {

            const medicamentosTemp = res.data;
            setMedicamentos( medicamentosTemp );

        });

    }, []);

    function retornaAAreaRestrita() {

        navigate('/area_restrita');
    }

    function novoMedicamento() {

        navigate('/gerenciar_medicamentos/cadastrar');

    }

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

                    {
                        medicamentos.map( (medicamento) => (

                            <tr key = { medicamento.id }>

                                <td className = { styles.coluna01 }> { medicamento.nome } </td>
                                <td className = { styles.coluna02 } > <Link to = {`/gerenciar_medicamentos/editar/${medicamento.id}`} > <button onClick = { () => setIdMedicamentoSelecionado(medicamento.id) }  className = { styles.botaoEditar } > Editar </button></Link></td>

                            </tr>
                        ))
                    }

                    

                </tbody>

                <tfoot>

                    <tr>

                        <td colSpan = "2"> Há {medicamentos.length } medicamentos cadastrados </td>

                    </tr>

                </tfoot>
            </table>
            
            <div className = { styles.caixaDeBotoes }>
                
                <button type = "button" onClick = { novoMedicamento } className = { styles.botaoCadastrar}> Cadastrar </button>
                <button type = "button" onClick = { retornaAAreaRestrita } className = { styles.botaoVoltar}> Voltar </button>

            </div>
        </>
    );
};

export default GerenciarMedicamentos;
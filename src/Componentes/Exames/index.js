import React, {useState, useEffect, useContext} from "react";

import TituloPrincipal from "../TituloDaPagina";

import { Link } from "react-router-dom";

import axios from "axios";

import styles from "./styles.module.css";

import { contextExameSelecionado } from "../../App";


function Exames() {

    const tituloDaPagina = "Exames / Procedimentos"

    const [exames, setExames] = useState([]);

    const { idExameSelecionado, setIdExameSelecionado } = useContext(contextExameSelecionado);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')

        .then(res => {

            let examesTemp = res.data;
            setExames(  examesTemp );

        })
        .catch(err => {

            console.log(err);

        });

    
    }, [])



    return (

        <>
            <TituloPrincipal tituloDaPagina = { tituloDaPagina } /> 

            <div className = {styles.container}>

            <p>Nossa Clínica realiza diversos exames e procedimentos, para melhor atender aos nossos clientes, confira abaixo uma lista de todas os exames e procedimentos atendidos. Selecionando um exame / procedimento o cliente poderá ver mais informações sobre esse exame / procedimento.</p>

            <table className = { styles.tabela } >

            <tbody>

            {exames.map((exame) => (

                 <tr key = {exame.id}><td><Link className = { styles.link } to = {`/exames_e_procedimentos/${exame.id}`} onClick = { () => setIdExameSelecionado(exame.id) } >  {exame.nome}  </Link></td></tr>
            ))}

            </tbody>
            </table>

            

            </div>     

        </>
    );
};

export default Exames;
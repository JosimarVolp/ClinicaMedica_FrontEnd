import React, {useState, useEffect, useContext} from "react";

import TituloPrincipal from "../TituloDaPagina";

import { Link } from "react-router-dom";

import axios from "axios";

import styles from "./styles.module.css";

import { contextEspecialidadeSelecionada } from "../../App";


function Especialidades(  ) {

    const tituloDaPagina = "Especialidades"
    

    const [especialidades, setEspecialidades] = useState([]);

    const { idEspecialidadeSelecionada, setIdEspecialidadeSelecionada } = useContext(contextEspecialidadeSelecionada);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')

        .then(res => {

            let especialidadesTemp = res.data;
            setEspecialidades(  especialidadesTemp );

        })
        .catch(err => {

            console.log(err);

        });

    
    }, [])



    return (

        <>
            <TituloPrincipal tituloDaPagina = { tituloDaPagina } /> 

            

            <div className = {styles.container}>

            <p>Nossa Clínica atende diversas especialidades, para melhor atender aos nossos clientes, confira abaixo uma lista de todas as especialidade atendidas. Selecionando uma especialidade o cliente poderá ver mais informaçãovocê será direcionado para a página de consultas.</p>

            <table className = {styles.tabela}>

                <tbody>

                    {especialidades.map((especialidade) => (

                        <tr key={especialidade.id}><td><Link className = {styles.link} to = {`/especialidades/${especialidade.id}`} onClick = { () => setIdEspecialidadeSelecionada(especialidade.id) }> {especialidade.nome} </Link></td></tr>
                        
                    ))}

                </tbody>            

            </table>

            </div>     

        </>
    );
};

export default Especialidades;
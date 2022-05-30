import React, {useState, useEffect, useContext} from "react";

import TituloPrincipal from "../TituloDaPagina";

import { Link } from "react-router-dom";

import axios from "axios";

import styles from "./styles.module.css";

import { contextEspecialistaSelecionado } from "../../App";


function Especialistas() {

    const tituloDaPagina = "Especialistas"

    const [especialistas, setEspecialistas] = useState([]);

    const { idEspecialistaSelecionado, setIdEspecialistaSelecionado } = useContext(contextEspecialistaSelecionado);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos')

        .then(res => {

            let especialistasTemp = res.data;
            setEspecialistas(  especialistasTemp );

        })
        .catch(err => {

            console.log(err);

        });

    
    }, [])



    return (

        <>
            <TituloPrincipal tituloDaPagina = { tituloDaPagina } /> 

            {especialistas.nome}

            <div className = {styles.container}>

                <p>Nossa Clínica trabalha com os melhores e mais conceituados especialistas do mercado, para melhor atender aos nossos clientes. Confira abaixo uma lista de todos os especialistas que são nossos parceiros. Selecionando um especialista o cliente poderá ver mais informaçãovocê será direcionado para a página de consultas.</p>

                <table className = {styles.tabela}>

                    <tbody>

                    {especialistas.map((especialista) => (

                        <tr key={especialista.cpf}><td><Link className = {styles.link} to = {`/especialistas/${especialista.cpf}`} onClick = { () => setIdEspecialistaSelecionado(especialista.cpf) }  > {especialista.nome} </Link></td></tr>
                    ))}

                    </tbody>

                </table>

                </div>     

        </>
    );
};

export default Especialistas;
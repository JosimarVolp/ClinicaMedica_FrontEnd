import React, { useState, useEffect } from 'react';

import TituloPrincipal from "../TituloDaPagina";

import axios from 'axios';

import styles from './styles.module.css';

function Prontuarios( props ) {

    const tituloDaPagina = "Prontuário"

    const [ prontuario, setProntuario ] = useState({});

    const [ logins, setLogins ] = useState({});

    const [ consultaMedicamento, setConsultaMedicamento ] = useState([]);

    

    const [ consultas, setConsultas ] = useState([]);

    const [ pacienteComorbidade, setPacienteComorbidade ] = useState({});

    const [ pacienteMedicamento, setPacienteMedicamento] = useState({});

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins/${props.cpf}`)
        
        .then( res => {

            let loginTemp = res.data;
            setLogins( loginTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_prontuarios/${props.cpf}`)
        
        .then( res => {

            let prontuarioTemp = res.data;
            setProntuario( prontuarioTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteComorbidades/${props.cpf}`)
        
        .then( res => {

            const pacienteComorbidadeTemp = res.data;
            setPacienteComorbidade( pacienteComorbidadeTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteMedicamentos/${props.cpf}`)
        
        .then( res => {

            const pacienteMedicamentoTemp = res.data;
            setPacienteMedicamento( pacienteMedicamentoTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/realizadas/${props.cpf}`)
        
        .then( res => {

            const consultasTemp = res.data;
            setConsultas( consultasTemp );
        });


    }, [] );

    /*useEffect( () => {

        consultas.map( (consulta) => {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultaMedicamentos/${consulta.id}`)
        
            .then( res => {

                const consultasMedicamentoTemp = res.data;
                setConsultaMedicamento( consultasMedicamentoTemp );
            });



        })

        


    }, [] );*/

    

    
    return (
    
        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />
        
            <div className = { styles.container }>

                <h2>Dados do Paciente</h2>

                <hr></hr>

                <h3> Nome </h3>
                <p> { logins.nome } </p>

                <h3> CPF </h3>
                <p> { logins.cpf } </p>

                <h3> Telefone </h3>
                <p> { logins.telefone } </p>

                <h3> E-mail </h3>
                <p> { logins.email } </p>

                <h3> Altura </h3>
                <p> { prontuario.altura } </p>

                <h3> Peso </h3>
                <p> { prontuario.peso } </p>

                <h3> Data de Nascimento </h3>
                <p> { prontuario.data_nascimento } </p>

                
                <hr></hr>
                <h2> Comorbidades </h2>
                <hr></hr>
                <p> {pacienteComorbidade.nome} </p>

                
                <hr></hr>
                <h2> Medicamentos Utilizados </h2>
                <hr></hr>
                <p> {pacienteMedicamento.nome} </p>
                <hr></hr>
                <h2> Consultas </h2>

                {consultas.map( (consulta) => (

                   
                    <div key = { consulta.id }>
                        
                        <h3> Data </h3>
                        <p> { consulta.data } </p>
                        <h3> Especialidade </h3>
                        <p> { consulta.especialidade } </p>
                        <h3> Médico </h3>
                        <p> { consulta.medico } </p>
                        <h3> Diagnóstico </h3>
                        <p> { consulta.diagnostico } </p>

                    </div>



                ))}     

                

                <h3> Medicamentos Receitados </h3>








                
            </div>

        </>
    );
}

export default Prontuarios;
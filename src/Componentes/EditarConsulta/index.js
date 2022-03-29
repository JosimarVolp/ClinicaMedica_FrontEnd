import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function EditarConsulta( props ) {

    //Título que será mostrado na "Barra de"
    const tituloDaPagina = "Editar Consultas";   

    const navigate = useNavigate();

    //Este array guarda todos os horários possíveis de se ter uma consulta
    var [ horariosTotal, setHorariosTotal ] = useState(["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00"]);

    //Este estado guarda todos os horários já agendados para o médico e o dia escolhido nos inputs "Médico" e "Data"
    var [ horariosMarcados, setHorariosMarcados ] = useState([]);

    //Este estado guarda todos os horários ainda disponíveis para o médico e o dia escolhido nos inputs "Médico" e "Data"
    var [ horariosDisponiveis, setHorariosDisponiveis ] = useState([]);

    /*const dadosIniciaisDaConsulta = {

        "id": 0,
        "especialidade": 0,
        "medico": "",
        "paciente": "",
        "data": '',
        "hora": 0.00,
        "diagnostico": ""

    }*/

    const [ consultaAgendada, setConsultaAgendada] = useState({});

    const [ consultas, setConsultas] = useState([]);

    const [ especialidades, setEspecialidades] = useState([]);

    const [ medicos, setMedicos ] = useState([]);

    const [ pacientes, setPacientes ] = useState([]);
    
    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then( (res) => {

            const especialidades = res.data;
            setEspecialidades( especialidades );
        });

    }, []);

    useEffect( () => {

        if(props.consulta !== undefined) {

            setConsultaAgendada(props.consulta);
            
            
        }

    },[props.consulta]);

    useEffect( () => {

        if(consultaAgendada.data !== undefined) {

            var dataEditada = consultaAgendada.data.substring(0, 10);
            setConsultaAgendada({...consultaAgendada, data: dataEditada});
            
            
        }

    },[consultaAgendada.data]);

    useEffect( () => {

        if((consultaAgendada.especialidade !== 0) && (consultaAgendada.especialidade !== undefined)) {

            //setSelectMedico({...selectMedico, desabilitado: false})

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos/especialidades/${consultaAgendada.especialidade}`)
            
            .then( (res) => {
                
                const medicos = res.data;
                setMedicos( medicos );            
                
            });
        }

    }, [consultaAgendada.especialidade]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_clientes')
        
        .then( (res) => {

            const pacientes = res.data;
            setPacientes( pacientes );
            
        });

    }, []);

    useEffect( ( ) => {

        if(consultaAgendada.medico !== ""){

        //console.log("Teste");

        //setSelectPaciente({...selectPaciente, desabilitado: false  })

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/medico/${consultaAgendada.medico}`)
                
        .then( ( res ) => {

            let consultas = res.data;
            setConsultas( consultas );
        });
    }
    
    }, [consultaAgendada.medico]);

    //Este useEffect prenche os horários disponíveis
    useEffect( () => {

        var teste = [];
        setHorariosMarcados([]);

        consultas.forEach( (consulta) => {

            var dataDB = consulta.data;
            var dataDB = dataDB.substring(0, 10);
                      
            //var dataInput = new Date(dadosDaConsulta.data).toLocaleDateString('pt-BR');

            var dataInput = consultaAgendada.data;
            
            

            if(dataDB ===  dataInput) {

                console.log("Deu Match");       
                
                teste.push(consulta.hora);

                //setHorariosMarcados([...horariosMarcados, consulta.hora]);
                //setSelectHora({...selectHora, desabilitado: false});

                

                console.log("Horários Disponíveis: " +horariosDisponiveis);
                console.log("Horários Marcados: " +teste);
                console.log("Horários Total: " +horariosTotal);
                
               
                
            }           
            
         } )
         
         //console.log(horariosMarcados);
         setHorariosMarcados(teste);
         

    },[consultaAgendada.data]);

    useEffect(() => {

        console.log("Horários Marcados: " +horariosMarcados);

        var horariosTotal01 = horariosTotal;

        //Horario Total: 08 09 10 11 12 

        //Horario Marcado: 09 11

        //Horario Disponiveis: 08 10 12

        var filtro = horariosTotal01.filter( ( horario ) => { 
            
            
            if(!horariosMarcados.includes(horario)) {

                return horariosDisponiveis;
            }
            
            
        
        });

        var horariosDisponiveis01 

        console.log("Horarios Disponiveis 01: " +horariosDisponiveis01);
        console.log("Horarios Total 01: " +horariosTotal01);

        setHorariosDisponiveis( filtro );


    }, [horariosMarcados]);

    function onChange( ev ) {

        const { name, value } = ev.target;
        /*console.log("Name" +name)
        console.log("Length" +value.length)
        if(name === "data" && value.length < 10) {

            return ;
            
            
        }*/
        setConsultaAgendada( { ...consultaAgendada, [name]: value } );

    };

    function onSubmit( ev ) {

        ev.preventDefault();
        console.log("ID" +consultaAgendada.id);
        console.log("Especialidade" +consultaAgendada.especialidade);
        console.log("Medico" +consultaAgendada.medico);
        console.log("Paciente" +consultaAgendada.paciente);
        console.log("Data" +consultaAgendada.data);
        console.log("Hora" +consultaAgendada.hora);
        console.log("Valor" +consultaAgendada.valor);
        console.log("Diagnóstico" +consultaAgendada.diagnostico);

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas', consultaAgendada)


        
        .then( (response) => {

            alert("Consulta salva com sucesso!!!");
            navigate("/gerenciar_consultas_agendadas")
        });
    }



    function cancelaAgendamento() {

        navigate('/gerenciar_consultas_agendadas')
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />      

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "especialidade"> Especialidade </label>
                    <select id = "especialidade" name = "especialidade" value = { consultaAgendada.especialidade } onChange = { onChange } > 

                        <option> Selecione... </option>
                        { especialidades.map( ( especialidade ) => (

                            <option key = { especialidade.id } value = { especialidade.id }> { especialidade.nome } </option>

                        ) )}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "medico"> Médico </label>
                    <select id = "medico" name = "medico" value = { consultaAgendada.medico } onChange = { onChange } >
                    
                        <option> Selecione... </option>
                        {medicos.map( (medico) => (
                            
                            <option key = { medico.cpf } value = { medico.cpf } > { medico.nome } </option>
                        
                        ))}                    

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "paciente"> Paciente </label>
                    <select id = "paciente" name = "paciente" value = { consultaAgendada.paciente } onChange = { onChange } >

                        {pacientes.map( (paciente) => (
                            
                            <option key = { paciente.cpf } value = { paciente.cpf } > { paciente.nome}  </option>
                        
                        ))}

                            

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data"> Data </label>                    
                    <input type = "date" id = "data" name = "data" defaultValue = { consultaAgendada.data } onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "hora" > Hora </label>
                    <select id = "hora" name = "hora" value = { consultaAgendada.hora } onChange = { onChange } >

                        <option> Selecione... </option>
                        { horariosDisponiveis.map( ( hora ) => (

                            <option key = { hora } value = { hora }>{ hora }</option>

                        ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" defaultValue = { consultaAgendada.valor } disabled = {true} />

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button"  onClick = { cancelaAgendamento } className = { styles.botaoVoltar } > Voltar </button>
                    <button type = "button"  onClick = { cancelaAgendamento } className = { styles.botaoCancelar } > Desmarcar </button>

                </div>

            </form>

        </>

    );

};

export default EditarConsulta;
import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

import { contextUsuarioConectado } from "../../App";

//QUALQUER MERDA QUE DER -------------------- VOlTAR AQUI

function AgendarConsultas() {

    const navigate = useNavigate();

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    //-------------------------------------------------------------------------------------------------
    //----------------------------- STATES DOS CAMPOS DE FORMULÁRIO -----------------------------------
    //-------------------------------------------------------------------------------------------------

    //Select Médico
    const [selectMedico, setSelectMedico ] = useState({"desabilitado": true});

    //Select Paciente
    const [selectPaciente, setSelectPaciente ] = useState({"desabilitado": true});

    //Input Data
    const [inputData, setInputData ] = useState({"desabilitado": true});

    //Select Hora
    const [selectHora, setSelectHora ] = useState({"desabilitado": true});

    //Input Valor
    const [inputValor, setInputValor ] = useState({"valorDaConsulta": "", "habilitado": true, "backgroundColor": "rgba(255,255,255)"});

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------------------
    //---------------------- STATES QUE CONTROLAM OS HORÁRIOS DAS CONSULTAS ---------------------------
    //-------------------------------------------------------------------------------------------------

    //Este array guarda todos os horários possíveis de se ter uma consulta
    var [ horariosTotal, setHorariosTotal ] = useState(["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00"]);

    //Este estado guarda todos os horários já agendados para o médico e o dia escolhido nos inputs "Médico" e "Data"
    var [ horariosMarcados, setHorariosMarcados ] = useState([]);

    //Este estado guarda todos os horários ainda disponíveis para o médico e o dia escolhido nos inputs "Médico" e "Data"
    var [ horariosDisponiveis, setHorariosDisponiveis ] = useState([]);

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------

    //Título que será mostrado na "Barra de"
    const tituloDaPagina = "Agendar Consultas";   

    //Este estado guada os dados de todas as especialidades cadastradas no DB    
    const [ especialidades, setEspecialidades ] = useState([]);

    const dadosIniciaisDaConsulta = {

        especialidade: 0,
        medico:"",
        paciente:"",
        data: "",
        hora: "",
        valor: 0
    }

    //Este estado guarda os dados preenchidos nos inputs para salvá-los no DB
    const [ dadosDaConsulta, setDadosDaConsulta ] = useState(dadosIniciaisDaConsulta);

    //Este estado guarda o nome dos médicos para preencher o input "Médico"
    const [ medicos, setMedicos ] = useState([]);

    //Este estado guarda os dados dos pacientes para preencher o input "Paciente"
    const [ pacientes, setPacientes ] = useState([]);

    //Este estado guarda os dados dos pacientes para preencher o input "Paciente"
    const [ paciente, setPaciente ] = useState({});

    //Este estado guarda os dados de todas as consultas do médico selecionado no input "Médico"
    const [ consultas, setConsultas ] = useState([]);    

    //Este useEffect busca todos os pacientes do DB para preencher o select "Paciente"
    useEffect( () => {

        if(usuarioConectado.perfil === "admin") {

                       axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins')
            
            .then( (res) => {

                const pacientes01 = res.data;
                setPacientes( pacientes01 );
            });

        } else {

            setPaciente(usuarioConectado);
        }

    }, []);

   //Este useEffect busca todas as especialidades do DB para preencher o select "Especialidade"
    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then( (res) => {

            const especialidadesTemp = res.data;
            setEspecialidades( especialidadesTemp );
        });

    }, []);

    //Este useEffect busca todos os médicos do DB para preencher o select "Médico" de acordo com a especialidade selecionada
    useEffect( () => {

        if(dadosDaConsulta.especialidade !== 0)

        setSelectMedico({...selectMedico, desabilitado: false})

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos/especialidades/${dadosDaConsulta.especialidade}`)
        
        .then( (res) => {

            
            const medicos = res.data;
            setMedicos( medicos );
            var valor = 0;
        
            especialidades.map( ( especialidade) => {           

            if(especialidade.id == dadosDaConsulta.especialidade) {

                valor = especialidade.valor;   
                
                setInputValor({...inputValor, valorDaConsulta: valor});
            }

        } );   
            
        });

    }, [dadosDaConsulta.especialidade]);


    //Este useEffect busca todas as consultas do DB de acordo com o médico selecionado, dessas consultas sairão os horário possíveis
    useEffect( ( ) => {

        if(dadosDaConsulta.medico !== ""){

        //console.log("Teste");

        setSelectPaciente({...selectPaciente, desabilitado: false  })

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/medico/${dadosDaConsulta.medico}`)
                
        .then( ( res ) => {

            let consultas01 = res.data;
            setConsultas( consultas01 );
        });
    }
    
    }, [dadosDaConsulta.medico]);

    useEffect( () => {

        if(dadosDaConsulta.paciente !== "") {

        setInputData({...inputData, desabilitado: false});
        }

    },[dadosDaConsulta.paciente])


    //Este useEffect prenche os horários disponíveis
    useEffect( () => {

        var teste = [];
        setHorariosMarcados([]);

        consultas.forEach( (consulta) => {

            var dataDB = consulta.data;
            var dataDB = dataDB.substring(0, 10);
                      
            //var dataInput = new Date(dadosDaConsulta.data).toLocaleDateString('pt-BR');

            var dataInput = dadosDaConsulta.data;
            
            

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
         

    },[dadosDaConsulta.data]);

   

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

    //Salva os dados dos inputs no objeto dadosDaConsulta
    function onChange( ev ) {

        const { name, value } = ev.target;
        /*console.log("Name" +name)
        console.log("Length" +value.length)
        if(name === "data" && value.length < 10) {

            return ;
            
            
        }*/
        setDadosDaConsulta( { ...dadosDaConsulta, [name]: value } );

    };

    //Salva os dados dos inputs no objeto dadosDaConsulta
    function onBlur( ev ) {

        
        setDadosDaConsulta( { ...dadosDaConsulta, data: ev.target.value } );

    };

    //Salva os dados do objeto dadosDaConsulta no DB
    function onSubmit( ev ) {

        ev.preventDefault();
        axios.post('https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas', dadosDaConsulta)
        
        .then( (response) => {

            alert("Consulta salva com sucesso!!!");
            navigate("/gerenciar_consultas_agendadas")
        });
    }

    

    function onBlurPaciente() {     
        
        var valorEspecialidade = 0;

        
        
        especialidades.map( ( especialidade) => {           

            if(especialidade.id == dadosDaConsulta.especialidade) {

                valorEspecialidade = especialidade.valorEspecialidade;   
                
                console.log("Valor da Especialidade" +valorEspecialidade)
            }

        } );  
        
        //setDadosDaConsulta( { ...dadosDaConsulta, valor: valorEspecialidade } );

        

        

    setSelectHora({...selectHora, desabilitado: false});

        
    }//,[dadosDaConsulta.paciente])

    useEffect( () => {

        console.log("Valor da Consulta: " +inputValor.valorDaConsulta);

    },[inputValor.valorDaConsulta])

    function exibeEspecialidade(valor) {

        if(valor === 0) {
        
            return <option>Selecione</option>
        }
    }

    function exibeSelectString(valor) {

        if(valor === "") {
        
            return <option>Selecione</option>
        }
    }

    
    function cancelaAgendamento() {

        navigate('/gerenciar_consultas_agendadas')
    }

    function teste() {

        if(usuarioConectado.perfil === "admin") {

            return pacientes.map( ( item) => (
                            
                <option key = { item.cpf } value = { item.cpf } > { item.nome}  </option>
            
            ))


        } else {

            return <option key = { paciente.cpf } value = { paciente.cpf } > { paciente.nome}  </option>
        }

        
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />  

            <h1>{dadosDaConsulta.medico}</h1>{}       

            

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup } >

                    <label htmlFor = "especialidade"> Especialidade </label>
                    <select id = "especialidade" name = "especialidade" onChange = { onChange }> 

                        {exibeEspecialidade(dadosDaConsulta.especialidade)}
                        { especialidades.map( ( especialidade ) => (

                            <option key = { especialidade.id } value = { especialidade.id }> { especialidade.nome } </option>
                            
                        ) )}                       

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "medico"> Médico </label>
                    <select id = "medico" name = "medico" onChange = { onChange } disabled = { selectMedico.desabilitado } >

                        {exibeSelectString(dadosDaConsulta.medico)}
                        {medicos.map( (medico) => (
                        
                            <option key = { medico.cpf } value = { medico.cpf } > { medico.nome } </option>
                        
                        ))}
                        

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "paciente"> Paciente </label>
                    <select id = "paciente" name = "paciente" onChange = { onChange } onBlur = { onBlurPaciente} disabled = { selectPaciente.desabilitado } >

                            {exibeSelectString(dadosDaConsulta.paciente)}
                            {teste()}
                            

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data"> Data </label>
                    
                    <input type = "date" id = "data" name = "data" onBlur = { onBlur } disabled = { inputData.desabilitado } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "hora" > Hora </label>
                    <select id = "hora" name = "hora" onChange = { onChange } disabled = { selectHora.desabilitado } >

                        {exibeSelectString(dadosDaConsulta.hora)}
                        { horariosDisponiveis.map( ( hora ) => (

                            <option key = { hora } value = { hora }>{ hora }</option>

                        ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" value = { inputValor.valorDaConsulta } onChange = { onChange } disabled = { inputValor.habilitado } background = { inputValor.backgroundColor } />

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoAgendar } > Agendar </button>
                    <button type = "button"  onClick = { cancelaAgendamento } className = { styles.botaoVoltar } > Cancelar </button>

                </div>

            </form>

        </>

    );

};

export default AgendarConsultas;
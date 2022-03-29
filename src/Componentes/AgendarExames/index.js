import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

import { contextUsuarioConectado } from "../../App";

function AgendarExames() {

    const navigate = useNavigate();

    const { usuarioConectado } = useContext(contextUsuarioConectado);

    //-------------------------------------------------------------------------------------------------
    //----------------------------- STATES DOS CAMPOS DE FORMULÁRIO -----------------------------------
    //-------------------------------------------------------------------------------------------------

    //Select Médico
    const [selectFuncionario, setSelectFuncionario ] = useState({"desabilitado": true});

    //Select Paciente
    const [selectCliente, setSelectCliente ] = useState({"desabilitado": true});

    //Input Data
    const [inputData, setInputData ] = useState({"desabilitado": true});

    //Select Hora
    const [selectHora, setSelectHora ] = useState({"desabilitado": true});

    //Input Valor
    const [inputValor, setInputValor ] = useState({"valorDoExame": 0, "habilitado": true, "backgroundColor": "rgba(255,255,255)"});

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
    const tituloDaPagina = "Agendar Exames e Procedimentos";   

    //Este estado guada os dados de todas as especialidades cadastradas no DB    
    const [ examesDB, setExamesDB ] = useState([]);

    const dadosIniciaisDoExame = {

        exame: 0,
        funcionario:"",
        cliente:"",
        data: "",
        hora: "",
        valor: 0
    }

    //Este estado guarda os dados preenchidos nos inputs para salvá-los no DB
    const [ dadosDoExame, setDadosDoExame ] = useState(dadosIniciaisDoExame);

    //Este estado guarda o nome dos médicos para preencher o input "Médico"
    const [ funcionarios, setFuncionarios ] = useState([]);

    //Este estado guarda os dados dos pacientes para preencher o input "Paciente"
    const [ clientes, setClientes ] = useState([]);

    //Este estado guarda os dados de todas os exames do funcionario selecionado no input "Funcionário"
    const [ examesFuncionario, setExamesFuncionario ] = useState([]);    

    //Este useEffect busca todos os pacientes do DB para preencher o select "Paciente"
    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_clientes')
        
        .then( (res) => {

            const clientes = res.data;
            setClientes( clientes );
        });

    }, []);

   //Este useEffect busca todas as especialidades do DB para preencher o select "Especialidade"
    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( (res) => {

            const examesDB = res.data;
            setExamesDB( examesDB );
        });

    }, []);

    //Este useEffect busca todos os médicos do DB para preencher o select "Médico" de acordo com a especialidade selecionada
    useEffect( () => {

        if(dadosDoExame.exame !== 0)

        setSelectFuncionario({...selectFuncionario, desabilitado: false})

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios/${dadosDoExame.exame}`)
        
        .then( (res) => {

            
            const funcionarios = res.data;
            setFuncionarios( funcionarios );
            var valor = 0;
        
            examesDB.map( ( exame ) => {           

            if(exame.id == dadosDoExame.exame) {

                valor = exame.valor;   
                
                setInputValor({...inputValor, valorDoExame: valor});
            }

        } );   
            
        });

    }, [dadosDoExame.exame]);


    //Este useEffect busca todas as consultas do DB de acordo com o médico selecionado, dessas consultas sairão os horário possíveis
    useEffect( ( ) => {

        if(dadosDoExame.funcionario !== ""){

        //console.log("Teste");

        setSelectCliente({...selectCliente, desabilitado: false  })

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/funcionario/${dadosDoExame.funcionario}`)
                
        .then( ( res ) => {

            let exames = res.data;
            setExamesFuncionario( exames );
        });
    }
    
    }, [dadosDoExame.funcionario]);

    useEffect( () => {

        if(dadosDoExame.cliente !== "") {

        setInputData({...inputData, desabilitado: false});
        }

    },[dadosDoExame.cliente])


    //Este useEffect prenche os horários disponíveis
    useEffect( () => {

        var teste = [];
        setHorariosMarcados([]);

        examesFuncionario.forEach( ( exame ) => {

            var dataDB = exame.data;
            var dataDB = dataDB.substring(0, 10);
                      
            //var dataInput = new Date(dadosDaConsulta.data).toLocaleDateString('pt-BR');

            var dataInput = dadosDoExame.data;
            
            

            if(dataDB ===  dataInput) {

                console.log("Deu Match");       
                
                teste.push(exame.hora);

                //setHorariosMarcados([...horariosMarcados, consulta.hora]);
                //setSelectHora({...selectHora, desabilitado: false});

                

                console.log("Horários Disponíveis: " +horariosDisponiveis);
                console.log("Horários Marcados: " +teste);
                console.log("Horários Total: " +horariosTotal);
                
               
                
            }           
            
         } )
         
         //console.log(horariosMarcados);
         setHorariosMarcados(teste);
         

    },[dadosDoExame.data]);

   

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
        setDadosDoExame( { ...dadosDoExame, [name]: value } );

    };

    //Salva os dados dos inputs no objeto dadosDaConsulta
    function onBlur( ev ) {

        
        setDadosDoExame( { ...dadosDoExame, data: ev.target.value } );

    };

    //Salva os dados do objeto dadosDaConsulta no DB
    function onSubmit( ev ) {

        ev.preventDefault();
        axios.post('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados', dadosDoExame)
        
        .then( (response) => {

            alert("Exame agendado com sucesso!!!");
            navigate("/gerenciar_exames_e_procedimentos_agendados")
        });
    }

    

    function onBlurCliente() {     
        
        var valor = 0;

        
        
        examesDB.map( ( exame ) => {           

            if(exame.id == dadosDoExame.exame) {

                valor = exame.valor;   
                
                console.log("Valor da Especialidade" +valor)
            }

        } );    
    
        clientes.map( ( cliente ) => {

            if(cliente.cpf === dadosDoExame.cliente) {

                if(cliente.convenio !== null) {

                    axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios/${cliente.convenio}`)
                    
                    .then( ( res ) => {

                        let desconto = (res.data.desconto)/100;

                        valor = (valor - (valor * desconto));
                        
                        setInputValor({...inputValor, valorDoExame: valor});      
                        setDadosDoExame( { ...dadosDoExame, valor: valor});

                        

                        
                        
                    });

                    
                } else {

                    setInputValor({...inputValor, valorDoExame: valor});
                    setDadosDoExame( { ...dadosDoExame, valor: valor});
                }
            }
    })

    setSelectHora({...selectHora, desabilitado: false});

        
    }//,[dadosDaConsulta.paciente])

    /*useEffect( () => {

        console.log("Valor da Consulta: " +inputValor.valorDoExame);

    },[inputValor.valorDaConsulta])*/

    function exibeExame(valor) {

        if(valor === 0) {
        
            return <option>Selecione</option>
        }
    }

    function exibeSelectString(valor) {

        if(valor === "") {
        
            return <option>Selecione</option>
        }
    }

    function exibeSelectString(valor) {

        if(valor === "") {
        
            return <option>Selecione</option>
        }
    }

    function cancelaAgendamento() {

        navigate('/gerenciar_exames_e_procedimentos_agendados')
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />            

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup } >

                    <label htmlFor = "exame"> Exame / Procedimento </label>
                    <select id = "exame" name = "exame" onChange = { onChange }> 

                        {exibeExame(dadosDoExame.exame)}
                        { examesDB.map( ( exame ) => (

                            <option key = { exame.id } value = { exame.id }> { exame.nome } </option>
                            
                        ) )}                       

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "funcionario"> Funcionário </label>
                    <select id = "funcionario" name = "funcionario" onChange = { onChange } disabled = { selectFuncionario.desabilitado } >

                        {exibeSelectString(dadosDoExame.funcionario)}
                        {funcionarios.map( ( funcionario ) => (
                        
                            <option key = { funcionario.cpf } value = { funcionario.cpf } > { funcionario.nome } </option>
                        
                        ))}
                        

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cliente"> Cliente </label>
                    <select id = "cliente" name = "cliente" onChange = { onChange } onBlur = { onBlurCliente} disabled = { selectCliente.desabilitado } >

                            {exibeSelectString(dadosDoExame.cliente)}
                            { clientes.map( ( cliente ) => (
                            
                                <option key = { cliente.cpf } value = { cliente.cpf } > { cliente.nome }  </option>
                            
                            ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data"> Data </label>                    
                    <input type = "date" id = "data" name = "data" onBlur = { onBlur } disabled = { inputData.desabilitado } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "hora" > Hora </label>
                    <select id = "hora" name = "hora" onChange = { onChange } disabled = { selectHora.desabilitado } >

                        {exibeSelectString(dadosDoExame.hora)}
                        { horariosDisponiveis.map( ( hora ) => (

                            <option key = { hora } value = { hora }>{ hora }</option>

                        ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" value = { inputValor.valorDoExame } onChange = { onChange } disabled = { inputValor.habilitado } background = { inputValor.backgroundColor } />

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoAgendar } > Agendar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { cancelaAgendamento }  > Cancelar </button>

                </div>

            </form>

        </>

    );

};

export default AgendarExames;
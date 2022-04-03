import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function EditarExamesAgendados( props ) {

    //Título que será mostrado na "Barra de"
    const tituloDaPagina = "Editar Exames / Procedimentos";   

    const navigate = useNavigate();

    //Este array guarda todos os horários possíveis de se ter uma consulta
    var [ horariosTotal, setHorariosTotal ] = useState(["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00"]);

    //Este estado guarda todos os horários já agendados para o médico e o dia escolhido nos inputs "Médico" e "Data"
    var [ horariosMarcados, setHorariosMarcados ] = useState([]);

    //Este estado guarda todos os horários ainda disponíveis para o médico e o dia escolhido nos inputs "Médico" e "Data"
    var [ horariosDisponiveis, setHorariosDisponiveis ] = useState([]);

    const [ exameAgendado, setExameAgendado] = useState({});

    const [ exames, setExames] = useState([]);

    const [ examesFuncionario, setExamesFuncionario ] = useState([]);

    const [ funcionarios, setFuncionarios ] = useState([]);

    const [ clientes, setClientes ] = useState([]);
    
    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( (res) => {

            const examesTemp = res.data;
            setExames( examesTemp );
        });

    }, []);

    useEffect( () => {

        if(props.exame !== undefined) {

            setExameAgendado(props.exame);
            
            
        }

    },[props.exame]);

    useEffect( () => {

        if(exameAgendado.data !== undefined) {

            var dataEditada = exameAgendado.data.substring(0, 10);
            setExameAgendado({...exameAgendado, funcionario: exameAgendado.funcionario});
            setExameAgendado({...exameAgendado, data: dataEditada});
            
            
        }

    },[exameAgendado.data]);

    useEffect( () => {

        if((exameAgendado.exame !== 0) && (exameAgendado.exame !== undefined)) {

            //setSelectMedico({...selectMedico, desabilitado: false})

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios/${exameAgendado.exame}`)
            
            .then( (res) => {
                
                const funcionariosTemp = res.data;
                setFuncionarios( funcionariosTemp );            
                
            });
        }

    }, [exameAgendado.exame]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins')
        
        .then( (res) => {

            const pacientes = res.data;
            setClientes( pacientes );
            
        });

    }, []);

    useEffect( ( ) => {

        if((exameAgendado.funcionario !== "") && (exameAgendado.funcionario !== undefined)) {

        //console.log("Teste");

        //setSelectPaciente({...selectPaciente, desabilitado: false  })

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/funcionario/${exameAgendado.funcionario}`)
                
        .then( ( res ) => {

            let examesTemp = res.data;
            setExamesFuncionario( examesTemp );
        });
    }
    
    }, [exameAgendado.funcionario]);

    //Este useEffect prenche os horários disponíveis
    useEffect( () => {

        var teste = [];
        setHorariosMarcados([]);

        examesFuncionario.forEach( (exame) => {

            var dataDB = exame.data;
            var dataDB = dataDB.substring(0, 10);
                      
            //var dataInput = new Date(dadosDaConsulta.data).toLocaleDateString('pt-BR');

            var dataInput = exameAgendado.data;
            
            

            if(dataDB ===  dataInput) {

                console.log("Deu Match");       
                
                teste.push(examesFuncionario.hora);

                //setHorariosMarcados([...horariosMarcados, consulta.hora]);
                //setSelectHora({...selectHora, desabilitado: false});

                

                console.log("Horários Disponíveis: " +horariosDisponiveis);
                console.log("Horários Marcados: " +teste);
                console.log("Horários Total: " +horariosTotal);
                
               
                
            }           
            
         } )
         
         //console.log(horariosMarcados);
         setHorariosMarcados(teste);
         

    },[exameAgendado.data]);

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
        setExameAgendado( { ...exameAgendado, [name]: value } );

    };

    function onSubmit( ev ) {

        ev.preventDefault();
        

        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados', exameAgendado)


        
        .then( (response) => {

            alert("Exame / Procedimento alterado com sucesso!!!");
            navigate("/gerenciar_exames_e_procedimentos_agendados")
        });
    }



    function voltaAoGerenciador() {

        navigate('/gerenciar_exames_e_procedimentos_agendados');
    }

    function cancelaAgendamento() {

        axios.delete(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/${exameAgendado.id}`)
            
            .then( ( response ) => {

                alert("Exame / Procedimento desmarcado com sucesso!!!");
                navigate("/gerenciar_exames_e_procedimentos_agendados")
            });
        
    }
    

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />      

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "exame"> Exame </label>
                    <select id = "exame" name = "exame" value = { exameAgendado.exame } onChange = { onChange } disabled required > 

                        <option> Selecione... </option>
                        { exames.map( ( exame ) => (

                            <option key = { exame.id } value = { exame.id }> { exame.nome } </option>

                        ) )}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "funcionario"> Funcionário </label>
                    <select id = "funcionario" name = "funcionario" value = { exameAgendado.funcionario } onChange = { onChange } disabled required >
                    
                        <option> Selecione... </option>
                        {funcionarios.map( (funcionario) => (
                            
                            <option key = { funcionario.cpf } value = { funcionario.cpf } > { funcionario.nome } </option>
                        
                        ))}                    

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cliente"> Cliente </label>
                    <select id = "cliente" name = "cliente" value = { exameAgendado.cliente } onChange = { onChange } disabled required >

                        {clientes.map( (cliente) => (
                            
                            <option key = { cliente.cpf } value = { cliente.cpf } > { cliente.nome}  </option>
                        
                        ))}

                            

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data"> Data </label>                    
                    <input type = "date" id = "data" name = "data" onChange = { onChange } required />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "hora" > Hora </label>
                    <select id = "hora" name = "hora" onChange = { onChange } required >

                        <option> </option>
                        { horariosDisponiveis.map( ( hora ) => (

                            <option key = { hora } value = { hora }>{ hora }</option>

                        ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" defaultValue = { exameAgendado.valor } disabled = {true} required />

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button"  onClick = { voltaAoGerenciador } className = { styles.botaoVoltar } > Voltar </button>
                    <button type = "button"  onClick = { cancelaAgendamento } className = { styles.botaoCancelar } > Desmarcar </button>

                </div>

            </form>

        </>

    );

};

export default EditarExamesAgendados;
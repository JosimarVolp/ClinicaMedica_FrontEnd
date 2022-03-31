import axios from "axios";

import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function EditarExamesAgendados( props ) {

    const navigate = useNavigate();

    const tituloDaPagina = "Editar Exame / Procedimento";

    var [ horariosTotal, setHorariosTotal ] = useState(["08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00", "11:00:00", "11:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00", "16:00:00", "16:30:00", "17:00:00", "17:30:00"]);

    var [ horariosMarcados, setHorariosMarcados ] = useState([]);

    var [ horariosDisponiveis, setHorariosDisponiveis ] = useState([]);
    
    const [exameAgendado, setExameAgendado] = useState({});

    const [ exames, setExames] = useState([]);

    const [ funcionarios, setFuncionarios ] = useState([]);

    const [ clientes, setClientes ] = useState([]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( (res) => {

            const exames = res.data;
            setExames( exames );
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
            setExameAgendado({...exameAgendado, data: dataEditada});
            
            
        }

    },[exameAgendado.data]);

    useEffect( () => {

        if( exameAgendado.exame !== 0 ) {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios/${exameAgendado.exame}`)
            
            .then( ( res ) => {

                let funcionarios = res.data;
                setFuncionarios( funcionarios );
            });
        }
    
    },[ exameAgendado.exame]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_clientes')
        
        .then( (res) => {

            const clientes = res.data;
            setClientes( clientes );
            
        });

    }, []);

    function onChange( ev ) {

        const { name, value } = ev.target;
        setExameAgendado( {...exameAgendado, [ name]:value } )
        console.log({name: value});
    }

    function onSubmit( ev ) {

        ev.preventDefault();
        axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados', exameAgendado)
        
        .then( ( response ) => {

            console.log("ID: "+exameAgendado.id);
            console.log("Exame:" +exameAgendado.exame);
            console.log("Funcionario: "+exameAgendado.funcionario);
            console.log("Cliente "+exameAgendado.cliente);
            console.log("Data: "+exameAgendado.data);
            console.log("Hora: "+exameAgendado.hora);
            console.log("Valor: "+exameAgendado.valor);
            console.log("Resultado: "+exameAgendado.resultado);

            alert("Exame agendado alterado com sucesso");

         });
    }

    const [examesAgendadosPorFuncionario, setExamesAgendadosPorFuncionario] = useState([])

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/funcionario/${exameAgendado.funcionario}`)
        
        .then(( res ) => {
    
            let examesAgendadosPorFuncionario = res.data;
            setExamesAgendadosPorFuncionario( examesAgendadosPorFuncionario );
    
        });
    
       },[exameAgendado.funcionario]);
    
       //--------------------------------------------------------------------------------------------
    
       useEffect( () => {
    
        examesAgendadosPorFuncionario.forEach( (exame) => {
    
            console.log(new Date());
    
            var dataDB = new Date(exame.data).toLocaleDateString('pt-BR');
            console.log("Data que vem do DB: " +dataDB);
    
            console.log("Valor do Input antes de converter: " +exameAgendado.data);
            
            //var dataInput = new Date(dadosDaConsulta.data).toLocaleDateString('pt-BR');
    
            var dataInput = new Date(exame.data).toLocaleDateString('pt-BR');
            
            console.log("Valor do Input depois de Converter: dataInput: " +dataInput);            
    
            if(dataDB ===  dataInput) {
    
                console.log("Deu Match");                
    
                setHorariosMarcados([...horariosMarcados, exame.hora]);
    
                
    
                console.log("Horários Disponíveis: " +horariosDisponiveis);
                console.log("Horários Marcados: " +horariosMarcados);
                console.log("Horários Total: " +horariosTotal);
                
               
                
            }           
            
         } )
    
    
       }, [exameAgendado.data]);

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

        //var horariosDisponiveis01 

        //console.log("Horarios Disponiveis 01: " +horariosDisponiveis01);
        console.log("Horarios Total 01: " +horariosTotal01);

        setHorariosDisponiveis( filtro );

        console.log("Horarios Disponiveis: " +horariosDisponiveis);


    }, [horariosMarcados]);

    function onBlur( ev ) {

             
        setExameAgendado( { ...exameAgendado, data: ev.target.value } );

    };

    

    function voltaAoGerenciador() {

        navigate('/gerenciar_exames_e_procedimentos_agendados');
    }

    function cancelaAgendamento() {

        axios.delete(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/${exameAgendado.id}`)
            
            .then( ( response ) => {

                alert("Exame desmarcado com sucesso!!!");
                navigate('/gerenciar_exames_e_procedimentos_agendados');
            });
        
    }
    
    return (
        
        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario }  onSubmit={ onSubmit }>

                <div className = { styles.formGroup } >

                    <label htmlFor = "exame" > Exame / Procedimento </label>
                    <select id = "exame" name = "exame" value = { exameAgendado.exame } onChange = { onChange } >

                        {exames.map(( item ) => (

                            <option key = { item.id } value = { item.id } > { item.nome } </option>
                        ))}
                        

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "funcionario">  Funcionário </label>
                    <select id = "funcionario" name = "funcionario" value = { exameAgendado.funcionario } onChange = { onChange } >

                        {funcionarios.map(( item ) => (

                            <option key = { item.cpf } value = { item.cpf } > { item.nome } </option>

                        ))}
                        
                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cliente">  Cliente </label>
                    <select id = "cliente" name = "cliente" value = { exameAgendado.cliente } onChange = { onChange } >

                        {clientes.map(( item ) => (

                            <option key = { item.cpf } value = { item.cpf } > { item.nome } </option>

                        ))}  

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data"> Data </label>
                    <input type = "date" id = "data" name = "data" defaultValue = { exameAgendado.data } onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "hora" > Hora </label>
                    <select id = "hora" name = "hora" value = { exameAgendado.hora } onBlur = { onBlur } >
                            
                        { horariosDisponiveis.map( ( horario ) => (

                            <option key = { horario } value = { horario } > { horario } </option>

                        )) }                        

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" defaultValue = { exameAgendado.valor }  disabled = {true} />

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
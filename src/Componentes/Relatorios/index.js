import React, { useState, useEffect } from "react";

import TituloPrincipal from "../TituloDaPagina";

import axios from "axios";

import { Chart } from "react-google-charts"

import styles from "./styles.module.css";

function Relatorios() {

    const tituloDaPagina = "Relatórios";

    //Inicializando o total de consultas agendadas por mês

    const mesesConsultasAgendadas = {
        janeiro: 0,
        fevereiro: 0,
        marco: 0,
        abril: 0,
        maio: 0,
        junho: 0,
        julho: 0,
        agosto: 0,
        setembro: 0,
        outubro: 0,
        novembro: 0,
        dezembro: 0
    }

    const mesesConsultasRealizadas = {
        janeiro: 0,
        fevereiro: 0,
        marco: 0,
        abril: 0,
        maio: 0,
        junho: 0,
        julho: 0,
        agosto: 0,
        setembro: 0,
        outubro: 0,
        novembro: 0,
        dezembro: 0
    }

    const mesesExamesAgendados = {
        janeiro: 0,
        fevereiro: 0,
        marco: 0,
        abril: 0,
        maio: 0,
        junho: 0,
        julho: 0,
        agosto: 0,
        setembro: 0,
        outubro: 0,
        novembro: 0,
        dezembro: 0
    }

    const mesesExamesRealizados = {
        janeiro: 0,
        fevereiro: 0,
        marco: 0,
        abril: 0,
        maio: 0,
        junho: 0,
        julho: 0,
        agosto: 0,
        setembro: 0,
        outubro: 0,
        novembro: 0,
        dezembro: 0
    }

    // Estado que guardará todas as consultas agendadas

    const [ consultasAgendadas , setConsultasAgendadas ] = useState([]);    

    // Estado que guardará o total de consultas agendadas por mês
    
    const [consultasAgendadasPorMes, setConsultasAgendadasPorMes] = useState(mesesConsultasAgendadas);

    // Estado que guardará todas as consultas agendadas

    const [ consultasRealizadas , setConsultasRealizadas ] = useState([]);

    // Estado que guardará o total de consultas realizadas por mês

    const [consultasRealizadasPorMes, setConsultasRealizadasPorMes] = useState(mesesConsultasRealizadas);

    const [ examesAgendados , setExamesAgendados ] = useState([]);

    const [ examesAgendadosPorMes, setExamesAgendadosPorMes] = useState(mesesExamesAgendados);     
    
    const [ examesRealizados , setExamesRealizados ] = useState([]);

    const [ examesRealizadosPorMes, setExamesRealizadosPorMes] = useState(mesesExamesRealizados);

    

    const [ especialistas , setEspecialistas ] = useState([]);

    

    
    
    



    





    useEffect( ( ) => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/status/agendada`)
                
        .then( ( res ) => {

            let consultasTemp = res.data;
            setConsultasAgendadas( consultasTemp );
        });
       

    }, []);    

    useEffect( ( ) => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/status/agendado`)
                
        .then( ( res ) => {

            let examesTemp = res.data;
            setExamesAgendados( examesTemp );
        });
       

    }, []);    
    
    useEffect( ( ) => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/status/realizada`)
                
        .then( ( res ) => {

            let consultasTemp = res.data;
            setConsultasRealizadas( consultasTemp );
        });
       

    }, []);
    
    useEffect( ( ) => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/status/realizado`)
                
        .then( ( res ) => {

            let examesTemp = res.data;
            setExamesRealizados( examesTemp );
        });
       

    }, []);
    
    useEffect( ( ) => {

        {consultasAgendadas.map((consulta) => {

            
            var mes = consulta.data.substring(5, 7);                        

            switch(mes) {
                case "01":
                    consultasAgendadasPorMes.janeiro = consultasAgendadasPorMes.janeiro + 1;  
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, janeiro: consultasAgendadasPorMes.janeiro} );
                    break;
                case "02":
                    consultasAgendadasPorMes.fevereiro = consultasAgendadasPorMes.fevereiro + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, fevereiro: consultasAgendadasPorMes.fevereiro} );
                    break;
                case "03":
                    consultasAgendadasPorMes.marco = consultasAgendadasPorMes.marco + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, marco: consultasAgendadasPorMes.marco} );
                    break;
                case "04":
                    consultasAgendadasPorMes.abril = consultasAgendadasPorMes.abril + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, abril: consultasAgendadasPorMes.abril} );
                    break;
                case "05":
                    consultasAgendadasPorMes.maio = consultasAgendadasPorMes.maio + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, maio: consultasAgendadasPorMes.maio} );
                    break;
                case "06":
                    consultasAgendadasPorMes.junho = consultasAgendadasPorMes.junho + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, junho: consultasAgendadasPorMes.junho} );
                    break;
                case "07":
                    consultasAgendadasPorMes.julho = consultasAgendadasPorMes.julho + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, julho: consultasAgendadasPorMes.julho} );
                    break;
                case "08":
                    consultasAgendadasPorMes.agosto = consultasAgendadasPorMes.agosto + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, agosto: consultasAgendadasPorMes.agosto} );
                    break;
                case "09":
                    consultasAgendadasPorMes.setembro = consultasAgendadasPorMes.setembro + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, setembro: consultasAgendadasPorMes.setembro} );
                    break;
                case "10":
                    consultasAgendadasPorMes.outubro = consultasAgendadasPorMes.outubro + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, outubro: consultasAgendadasPorMes.outubro} );
                    break;
                case "11":
                    consultasAgendadasPorMes.novembro = consultasAgendadasPorMes.novembro + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, novembro: consultasAgendadasPorMes.novembro} );
                    break;
                case "12":
                    consultasAgendadasPorMes.dezembro = consultasAgendadasPorMes.dezembro + 1;
                    setConsultasAgendadasPorMes( {...consultasAgendadasPorMes, dezembro: consultasAgendadasPorMes.dezembro} );
                    break;
            }

        })}       

    }, [consultasAgendadas]);  

    useEffect( ( ) => {

        {consultasRealizadas.map((consulta) => {

            var mes = consulta.data.substring(5, 7);            
            
            switch(mes) {                
                case "01":
                    consultasRealizadasPorMes.janeiro = consultasRealizadasPorMes.janeiro + 1;  
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, janeiro: consultasRealizadasPorMes.janeiro } );
                    break;
                case "02":
                    consultasRealizadasPorMes.fevereiro = consultasRealizadasPorMes.fevereiro + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, fevereiro: consultasRealizadasPorMes.fevereiro } );
                    break;
                case "03":
                    consultasRealizadasPorMes.marco = consultasRealizadasPorMes.marco + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, marco: consultasRealizadasPorMes.marco } );
                    break;
                case "04":
                    consultasRealizadasPorMes.abril = consultasRealizadasPorMes.abril + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, abril: consultasRealizadasPorMes.abril } );
                    break;
                case "05":
                    consultasRealizadasPorMes.maio = consultasRealizadasPorMes.maio + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, maio: consultasRealizadasPorMes.maio } );
                    break;
                case "06":
                    consultasRealizadasPorMes.junho = consultasRealizadasPorMes.junho + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, junho: consultasRealizadasPorMes.junho } );
                    break;
                case "07":
                    consultasRealizadasPorMes.julho = consultasRealizadasPorMes.julho + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, julho: consultasRealizadasPorMes.julho } );
                    break;
                case "08":
                    consultasRealizadasPorMes.agosto = consultasRealizadasPorMes.agosto + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, agosto: consultasRealizadasPorMes.agosto } );
                    break;
                case "09":
                    consultasRealizadasPorMes.setembro = consultasRealizadasPorMes.setembro + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, setembro: consultasRealizadasPorMes.setembro } );
                    break;
                case "10":
                    consultasRealizadasPorMes.outubro = consultasRealizadasPorMes.outubro + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, outubro: consultasRealizadasPorMes.outubro } );
                    break;
                case "11":
                    consultasRealizadasPorMes.novembro = consultasRealizadasPorMes.novembro + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, novembro: consultasRealizadasPorMes.novembro } );
                    break;
                case "12":
                    consultasRealizadasPorMes.dezembro = consultasRealizadasPorMes.dezembro + 1;
                    setConsultasRealizadasPorMes( {...consultasRealizadasPorMes, dezembro: consultasRealizadasPorMes.dezembro } );
                    break;                    
            }

        })}       

    }, [consultasRealizadas]);  


    useEffect( ( ) => {

        {examesAgendados.map((exame) => {

            var mes = exame.data.substring(5, 7);            

            switch(mes) {                                
                case "01":
                    examesAgendadosPorMes.janeiro = examesAgendadosPorMes.janeiro + 1;  
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, janeiro:examesAgendadosPorMes.janeiro } );
                    break;
                case "02":
                    examesAgendadosPorMes.fevereiro = examesAgendadosPorMes.fevereiro + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, fevereiro:examesAgendadosPorMes.fevereiro } );
                    break;
                case "03":
                    examesAgendadosPorMes.marco = examesAgendadosPorMes.marco + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, marco:examesAgendadosPorMes.marco } );
                    break;
                case "04":
                    examesAgendadosPorMes.abril = examesAgendadosPorMes.abril + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, abril:examesAgendadosPorMes.abril } );
                    break;
                case "05":
                    examesAgendadosPorMes.maio = examesAgendadosPorMes.maio + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, maio:examesAgendadosPorMes.maio } );
                    break;
                case "06":
                    examesAgendadosPorMes.junho = examesAgendadosPorMes.junho + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, junho:examesAgendadosPorMes.junho } );
                    break;
                case "07":
                    examesAgendadosPorMes.julho = examesAgendadosPorMes.julho + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, julho:examesAgendadosPorMes.julho } );
                    break;
                case "08":
                    examesAgendadosPorMes.agosto = examesAgendadosPorMes.agosto + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, agosto:examesAgendadosPorMes.agosto } );
                    break;
                case "09":
                    examesAgendadosPorMes.setembro = examesAgendadosPorMes.setembro + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, setembro:examesAgendadosPorMes.setembro } );
                    break;
                case "10":
                    examesAgendadosPorMes.outubro = examesAgendadosPorMes.outubro + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, outubro:examesAgendadosPorMes.outubro } );
                    break;
                case "11":
                    examesAgendadosPorMes.novembro = examesAgendadosPorMes.novembro + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, novembro:examesAgendadosPorMes.novembro } );
                    break;
                case "12":
                    examesAgendadosPorMes.dezembro = examesAgendadosPorMes.dezembro + 1;
                    setExamesAgendadosPorMes( {...examesAgendadosPorMes, dezembro:examesAgendadosPorMes.dezembro } );
                    break;
            }

        })}
       
    }, [examesAgendados]);  



    

    useEffect( ( ) => {

        {examesRealizados.map((exame) => {

            var mes = exame.data.substring(5, 7);            

            switch(mes) {                
                case "01":
                    examesRealizadosPorMes.janeiro = examesRealizadosPorMes.janeiro + 1;  
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, janeiro: examesRealizadosPorMes.janeiro } );
                    break;
                case "02":
                    examesRealizadosPorMes.fevereiro = examesRealizadosPorMes.fevereiro + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, fevereiro: examesRealizadosPorMes.fevereiro } );
                    break;
                case "03":
                    examesRealizadosPorMes.marco = examesRealizadosPorMes.marco + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, marco: examesRealizadosPorMes.marco } );
                    break;
                case "04":
                    examesRealizadosPorMes.abril = examesRealizadosPorMes.abril + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, abril: examesRealizadosPorMes.abril } );
                    break;
                case "05":
                    examesRealizadosPorMes.maio = examesRealizadosPorMes.maio + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, maio: examesRealizadosPorMes.maio } );
                    break;
                case "06":
                    examesRealizadosPorMes.junho = examesRealizadosPorMes.junho + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, junho: examesRealizadosPorMes.junho } );
                    break;
                case "07":
                    examesRealizadosPorMes.julho = examesRealizadosPorMes.julho + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, julho: examesRealizadosPorMes.julho } );
                    break;
                case "08":
                    examesRealizadosPorMes.agosto = examesRealizadosPorMes.agosto + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, agosto: examesRealizadosPorMes.agosto } );
                    break;
                case "09":
                    examesRealizadosPorMes.setembro = examesRealizadosPorMes.setembro + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, setembro: examesRealizadosPorMes.setembro } );
                    break;
                case "10":
                    examesRealizadosPorMes.outubro = examesRealizadosPorMes.outubro + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, outubro: examesRealizadosPorMes.outubro } );
                    break;
                case "11":
                    examesRealizadosPorMes.novembro = examesRealizadosPorMes.novembro + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, novembro: examesRealizadosPorMes.novembro } );
                    break;
                case "12":
                    examesRealizadosPorMes.dezembro = examesRealizadosPorMes.dezembro + 1;
                    setExamesRealizadosPorMes( {...examesRealizadosPorMes, dezembro: examesRealizadosPorMes.dezembro } );
                    break;
            }

        })}
       
    }, [examesRealizados]);  

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

    const dadosConsultasAgendadas = [

        ["Mês", "Consultas Agendadas"],
        ["Janeiro", consultasAgendadasPorMes.janeiro],
        ["Fevereiro", consultasAgendadasPorMes.fevereiro],
        ["Março", consultasAgendadasPorMes.marco],
        ["Abril", consultasAgendadasPorMes.abril],
        ["Maio", consultasAgendadasPorMes.maio],
        ["Junho", consultasAgendadasPorMes.junho],
        ["Julho", consultasAgendadasPorMes.julho],
        ["Agosto", consultasAgendadasPorMes.agosto],
        ["Setembro", consultasAgendadasPorMes.setembro],
        ["Outubro", consultasAgendadasPorMes.outubro],
        ["Novembro", consultasAgendadasPorMes.novembro],
        ["Dezembro", consultasAgendadasPorMes.dezembro]

    ]

    const dadosConsultasRealizadas = [

        ["Mês", "Consultas Realizadas"],
        ["Janeiro", consultasRealizadasPorMes.janeiro],
        ["Fevereiro", consultasRealizadasPorMes.fevereiro],
        ["Março", consultasRealizadasPorMes.marco],
        ["Abril", consultasRealizadasPorMes.abril],
        ["Maio", consultasRealizadasPorMes.maio],
        ["Junho", consultasRealizadasPorMes.junho],
        ["Julho", consultasRealizadasPorMes.julho],
        ["Agosto", consultasRealizadasPorMes.agosto],
        ["Setembro", consultasRealizadasPorMes.setembro],
        ["Outubro", consultasRealizadasPorMes.outubro],
        ["Novembro", consultasRealizadasPorMes.novembro],
        ["Dezembro", consultasRealizadasPorMes.dezembro]
    ]

    const dadosExamesAgendados = [

        ["Mês", "Exames Agendados"],
        ["Janeiro", examesAgendadosPorMes.janeiro],
        ["Fevereiro", examesAgendadosPorMes.fevereiro],
        ["Março", examesAgendadosPorMes.marco],
        ["Abril", examesAgendadosPorMes.abril],
        ["Maio", examesAgendadosPorMes.maio],
        ["Junho", examesAgendadosPorMes.junho],
        ["Julho", examesAgendadosPorMes.julho],
        ["Agosto", examesAgendadosPorMes.agosto],
        ["Setembro", examesAgendadosPorMes.setembro],
        ["Outubro", examesAgendadosPorMes.outubro],
        ["Novembro", examesAgendadosPorMes.novembro],
        ["Dezembro", examesAgendadosPorMes.dezembro]
    ]

    const dadosExamesRealizados = [

        ["Mês", "Exames Agendados"],
        ["Janeiro", examesRealizadosPorMes.janeiro],
        ["Fevereiro", examesRealizadosPorMes.fevereiro],
        ["Março", examesRealizadosPorMes.marco],
        ["Abril", examesRealizadosPorMes.abril],
        ["Maio", examesRealizadosPorMes.maio],
        ["Junho", examesRealizadosPorMes.junho],
        ["Julho", examesRealizadosPorMes.julho],
        ["Agosto", examesRealizadosPorMes.agosto],
        ["Setembro", examesRealizadosPorMes.setembro],
        ["Outubro", examesRealizadosPorMes.outubro],
        ["Novembro", examesRealizadosPorMes.novembro],
        ["Dezembro", examesRealizadosPorMes.dezembro]
    ]

    const options01 = {

        title:"Consultas Agendadas Por Mês"
    }  

    const options02 = {

        title:"Consultas Realizadas Por Mês"
    }  

    const options03 = {

        title:"Exames Agendados Por Mês"
    }  

    const options04 = {

        title:"Exames Realizados Por Mês"
    }      

   
    return (

        <>

        <TituloPrincipal tituloDaPagina = { tituloDaPagina} />

        <div className = { styles.container } >

            <h2> Relação de Consultas Agendadas Por Mês </h2>


            <table className = { styles.tabela }>

                <thead>
                    <tr>
                        <th colSpan={2} >Consultas Agendadas Por Mês</th>
                    </tr>
                    <tr>
                        <th>Mês</th>
                        <th>Número de Consultas</th>                
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td className = { styles.coluna01 }>Janeiro</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.janeiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Fevereiro</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.fevereiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Março</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.marco}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Abril</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.abril}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Maio</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.maio}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 } >Junho</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.junho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Julho</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.julho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Agosto</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.agosto}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Setembro</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.setembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Outubro</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.outubro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Novembro</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.novembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Dezembro</td>
                        <td className = { styles.coluna02 }>{consultasAgendadasPorMes.dezembro}</td>
                    </tr>

                </tbody>

                <tfoot>

                    <tr>
                        <td colSpan={2}>Existem {consultasAgendadas.length} consultas agendadas</td>
                    </tr>

                </tfoot>

            </table>       

              

            <Chart
                chartType="PieChart"
                data={dadosConsultasAgendadas}
                options={options01}
                width="100%"
                height="480px"
                legendToggle
            />

            <hr />
            

            <h2> Relação de Consultas Realizadas Por Mês </h2>

            <table className = { styles.tabela }>

                <thead>
                    <tr>
                        <th colSpan={2}>Consultas Realizadas Por Mês</th>
                    </tr>
                    <tr>
                    <th>Mês</th>
                    <th>Número de Consultas</th>                
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td className = { styles.coluna01 }>Janeiro</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.janeiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Fevereiro</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.fevereiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Março</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.marco}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Abril</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.abril}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Maio</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.maio}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Junho</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.junho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Julho</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.julho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Agosto</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.agosto}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Setembro</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.setembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Outubro</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.outubro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Novembro</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.novembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Dezembro</td>
                        <td className = { styles.coluna02 }>{consultasRealizadasPorMes.dezembro}</td>
                    </tr>

                </tbody>

                <tfoot>

                    <tr>
                        <td colSpan={2}>Existem {consultasRealizadas.length} consultas realizadas</td>
                    </tr>

                </tfoot>

            </table>    

            

            

                

            <Chart
            chartType="PieChart"
            data={dadosConsultasRealizadas}
            options={options02}
            width="100%"
            height="480px"
            legendToggle
            />

            <hr />   
             

            <h2> Relação de Exames Agendados Por Mês </h2>

            <table className = { styles.tabela }>

                <thead>
                    <tr>
                        <th colSpan={2}>Exames Agendados Por Mês</th>
                    </tr>
                    <tr>
                    <th>Mês</th>
                    <th>Número de Exames</th>                
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td className = { styles.coluna01 }>Janeiro</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.janeiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Fevereiro</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.fevereiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Março</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.marco}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Abril</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.abril}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Maio</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.maio}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Junho</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.junho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Julho</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.julho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Agosto</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.agosto}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Setembro</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.setembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Outubro</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.outubro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Novembro</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.novembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Dezembro</td>
                        <td className = { styles.coluna02 }>{examesAgendadosPorMes.dezembro}</td>
                    </tr>

                </tbody>

                <tfoot>

                    <tr>
                        <td colSpan={2}>Existem {examesAgendados.length} exames agendados</td>
                    </tr>

                </tfoot>

            </table>  
            

            <Chart
            chartType="PieChart"
            data={dadosExamesAgendados}
            options={options03}
            width="100%"
            height="480px"
            legendToggle
            />

            <hr />
            

            <h2> Relação de Exames Realizados Por Mês </h2>

            

            <table className = { styles.tabela }>

                <thead>
                    <tr>
                        <th colSpan={2}>Exames Realizados Por Mês</th>
                    </tr>
                    <tr>
                    <th>Mês</th>
                    <th>Número de Exames</th>                
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td className = { styles.coluna01 }>Janeiro</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.janeiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Fevereiro</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.fevereiro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Março</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.marco}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Abril</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.abril}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Maio</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.maio}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Junho</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.junho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Julho</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.julho}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Agosto</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.agosto}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Setembro</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.setembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Outubro</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.outubro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Novembro</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.novembro}</td>
                    </tr>
                    <tr>
                        <td className = { styles.coluna01 }>Dezembro</td>
                        <td className = { styles.coluna02 }>{examesRealizadosPorMes.dezembro}</td>
                    </tr>

                </tbody>

                <tfoot>

                    <tr>
                        <td colSpan={2}>Existem {consultasRealizadas.length} consultas realizadas</td>
                    </tr>

                </tfoot>

            </table>   

                

            <Chart
                
                chartType="PieChart"
                data={dadosExamesRealizados}
                options={options04}
                width="100%"
                height="480px"
                legendToggle
            />

            <hr />
            

            <h2> Relação de Consultas Agendadas Por Médico </h2>



            <table className = { styles.tabela }>

            <thead>
                <tr>
                    <th colSpan={2}>Consultas Agendadas Por Médico</th>
                </tr>
                <tr>
                <th>Médico</th>
                <th>Número de Consultas</th>                
                </tr>
            </thead>

            <tbody>
            {
                especialistas.map((especialista) => {

                    var numeroConsultasAgendadas = 0;                

                    //console.log("Especialista: " +especialista.cpf)

                    
                                
                    consultasAgendadas.map((consulta) => {

                        //console.log("Especialista Consulta: " +consulta.cpfMedico)
                                
                        if(especialista.cpf === consulta.cpfMedico) {

                            numeroConsultasAgendadas = numeroConsultasAgendadas + 1;
                        }
                    })

                    return <tr key = {especialista.cpf}> <td className = { styles.coluna01 }>{especialista.nome}</td> <td className = { styles.coluna02 }> {numeroConsultasAgendadas} </td></tr>
                
                })

            }

                

            </tbody>

            <tfoot>

                <tr>
                    <td colSpan={2}>Existem {consultasAgendadas.length} consultas agendadas</td>
                </tr>

            </tfoot>

            </table> 

            <hr />
            

            <h2> Relação de Consultas Realizadas Por Médico </h2>

            <table className = { styles.tabela }>

            <thead>
                <tr>
                    <th colSpan={2}>Consultas Realizadas Por Médico</th>
                </tr>
                <tr>
                <th>Médico</th>
                <th>Número de Consultas</th>                
                </tr>
            </thead>

            <tbody>
                {
                    especialistas.map((especialista) => {

                        var numeroConsultasRealizadas = 0;                                    
                                    
                        consultasRealizadas.map((consulta) => {

                            if(especialista.cpf === consulta.cpfMedico) {

                                numeroConsultasRealizadas = numeroConsultasRealizadas + 1;

                            }
                        })

                        return <tr key = {especialista.cpf}> <td className = { styles.coluna01 }>{especialista.nome}</td> <td className = { styles.coluna02 }>{numeroConsultasRealizadas}</td></tr>
                        
                        
                        

                    
                    })
                }

                

            </tbody>

            <tfoot>

                <tr>
                    <td colSpan={2}>Existem {consultasRealizadas.length} consultas realizadas</td>
                </tr>

            </tfoot>

            </table> 




        </div>

        

        </>
    )
}

export default Relatorios;
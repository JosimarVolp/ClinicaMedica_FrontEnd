import React, { useState, useEffect} from "react";

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';

import axios from "axios";

function EditarProntuarios( props ) {

    const tituloDaPagina = "Editar Prontuários";

    const navigate = useNavigate();

    const [ prontuario, setProntuario ] = useState([]);

    const [ logins, setLogins ] = useState([]);

    const [ medicamentos, setMedicamentos] = useState([]);

    const [ comorbidades, setComorbidades] = useState([]);

    const dadosIniciaisComorbidade = {

        cpf:"",
        comorbidade:0
    };

    const [ comorbidadeSalva, setComorbidadeSalva] = useState({});

    const dadosIniciaisMedicamento = {

        cpf:"",
        id_medicamento:0
    };

    const [ medicamentoSalvo, setMedicamentoSalvo ] = useState({});

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicamentos')
        
        .then( res => {

            const medicamentosTemp = res.data;
            setMedicamentos( medicamentosTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_prontuarios/${props.cpf}`)
        
        .then( res => {

            const prontuarioTemp = res.data;
            setProntuario( prontuarioTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteComorbidades/${props.cpf}`)
        
        .then( res => {

            const pacienteComorbidadeTemp = res.data;
            setComorbidadeSalva( pacienteComorbidadeTemp );
        });


    }, [] );

    useEffect(() => {

        if((comorbidadeSalva.cpf !== undefined) && (comorbidadeSalva.cpf !== "")) {
    
            console.log("CPF Comorbidade: " + comorbidadeSalva.cpf); 
            
                     
        }
    
      }, [comorbidadeSalva.cpf]);

      useEffect( () => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteMedicamentos/${props.cpf}`)
        
        .then( res => {

            const pacienteMedicamentoTemp = res.data;
            setMedicamentoSalvo( pacienteMedicamentoTemp );
        });


    }, [] );

    useEffect(() => {

        if((prontuario.cpf !== undefined) && (prontuario.cpf !== "")) {
    
            console.log("CPF: " + prontuario.cpf); 
            console.log("Altura: " + prontuario.altura); 
            console.log("Peso: " + prontuario.peso);
            console.log("Nascimento: " + prontuario.data_nascimento);           
            prontuario.data_nascimento = prontuario.data_nascimento.substring(0, 10);
                       
            setProntuario(prontuario);  
                     
        }
    
      }, [prontuario.cpf]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_comorbidades')
        
        .then( res => {

            const comorbidadesTemp = res.data;
            setComorbidades( comorbidadesTemp );
        });


    }, [] );

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins')
        
        .then( res => {

            const loginsTemp = res.data;
            setLogins( loginsTemp );
        });


    }, [] );

    

    function onChange(ev) {

        const { name, value } = ev.target;

        console.log({ name, value });
      
        setProntuario( { ...prontuario, [name]: value } );
    };

    function onChangeMedicamento(ev) {

        const { name, value } = ev.target;

        console.log({ name, value });
      
        setMedicamentoSalvo( { ...medicamentoSalvo, [name]: value } );
    };

    function onChangeComorbidade(ev) {

        const { name, value } = ev.target;

        console.log({ name, value });
      
        setComorbidadeSalva( { ...comorbidadeSalva, [name]: value } );
    };

    function onChangeCPF(ev) {

        const { name, value } = ev.target;

        console.log({ name, value });
      
        setProntuario( { ...prontuario, [name]: value } );
        setComorbidadeSalva( { ...comorbidadeSalva, [name]: value } );
        setMedicamentoSalvo( { ...medicamentoSalvo, [name]: value } );
    };

    function onSubmit(ev) {

        ev.preventDefault();
        axios.put( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_prontuarios", prontuario )
        
            .then( (response) => {

                alert("Prontuario cadastrado com sucesso!!");

            });

        axios.put( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteMedicamentos", medicamentoSalvo )
        
        .then( (response) => {

            alert("Medicamento associado ao paciente!!");

        })

        setTimeout( () => {

            axios.put( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteComorbidades", comorbidadeSalva )
            
            .then( (response) => {

                alert("Comorbidade associada ao paciente!!");

                navigate('/gerenciar_prontuarios');

            })
        }, 3000 );
    };

    function retornaAoGerenciador() {

        navigate('/gerenciar_prontuarios');
    }
  
    return (
        
        <>
        
            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup } >
                
                <label htmlFor = "cpf"> Nome </label>
                <select id = "cpf" name = "cpf" onChange = { onChangeCPF } value = {prontuario.cpf}>

                    <option > Selecione </option>
                    { logins.map( ( login ) => (

                        <option key = { login.cpf } value = { login.cpf }> { login.nome } </option>

                    ))}  
                                         

                </select>

            </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "altura" > Altura </label>
                    <input type = "text" id = "altura" name = "altura" onChange = { onChange } defaultValue = {prontuario.altura}/>

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "peso"> Peso </label>
                    <input type = "text" id = "peso" name = "peso" onChange = { onChange } defaultValue = {prontuario.peso}/>

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "data_nascimento"> Data de Nascimento </label>
                    <input type = "date" id = "data_nascimento" name = "data_nascimento" onChange = { onChange } defaultValue = {prontuario.data_nascimento}/>

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "comorbidade"> Comorbidade </label>
                    <select id = "comorbidade" name = "comorbidade"  onChange = { onChangeComorbidade } value = {comorbidadeSalva.comorbidade}>

                        <option > Selecione </option>
                        { comorbidades.map( ( comorbidade ) => (

                            <option key = { comorbidade.id } value = { comorbidade.id } > { comorbidade.nome } </option>

                        ))}  
                                             

                    </select>

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "id_medicamento"> Medicamento </label>
                    <select id = "id_medicamento" name = "id_medicamento"  onChange = { onChangeMedicamento } value = {medicamentoSalvo.id_medicamento}>

                        <option > Selecione </option>                        
                        { medicamentos.map( ( medicamento ) => (

                            <option key = { medicamento.id } value = { medicamento.id }> { medicamento.nome } </option>
                            
                        ) )}  
                                             

                    </select>

                </div>

                

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>  
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>                  

                </div>

            </form>
            

        </>
  
    )
}

export default EditarProntuarios;
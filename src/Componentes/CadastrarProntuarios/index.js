import React, { useState, useEffect} from "react";

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from './styles.module.css';

import axios from "axios";

function CadastrarProntuarios() {

    const tituloDaPagina = "Cadastrar Prontuários";

    const navigate = useNavigate();

    const [ prontuarios, setProntuarios ] = useState([]);

    const [ logins, setLogins ] = useState([]);

    const [ medicamentos, setMedicamentos] = useState([]);

    const [ comorbidades, setComorbidades] = useState([]);

    const dadosIniciaisComorbidade = {

        cpf:"",
        comorbidade:0
    };

    const [ comorbidadeSalva, setComorbidadeSalva] = useState(dadosIniciaisComorbidade);

    const dadosIniciaisMedicamento = {

        cpf:"",
        id_medicamento:0
    };

    const [ medicamentoSalvo, setMedicamentoSalvo ] = useState(dadosIniciaisMedicamento);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicamentos')
        
        .then( res => {

            const medicamentosTemp = res.data;
            setMedicamentos( medicamentosTemp );
        });


    }, [] );

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
      
        setProntuarios( { ...prontuarios, [name]: value } );
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
      
        setProntuarios( { ...prontuarios, [name]: value } );
        setComorbidadeSalva( { ...comorbidadeSalva, [name]: value } );
        setMedicamentoSalvo( { ...medicamentoSalvo, [name]: value } );
    };

    function onSubmit(ev) {

        ev.preventDefault();
        axios.post( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_prontuarios", prontuarios )
        
            .then( (response) => {

                alert("Prontuario cadastrado com sucesso!!");

            });

        axios.post( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteMedicamentos", medicamentoSalvo )
        
        .then( (response) => {

            alert("Medicamento associado ao paciente!!");

        })

        setTimeout( () => {

            axios.post( "https://clinicamedica-backend.herokuapp.com/api/gerenciar_pacienteComorbidades", comorbidadeSalva )
            
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
                <select id = "cpf" name = "cpf" onChange = { onChangeCPF } >

                    <option > Selecione </option>
                    { logins.map( ( login ) => (

                        <option key = { login.cpf } value = { login.cpf }> { login.nome } </option>

                    ))}  
                                         

                </select>

            </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "altura" > Altura </label>
                    <input type = "text" id = "altura" name = "altura" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "peso"> Peso </label>
                    <input type = "text" id = "peso" name = "peso" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "data_nascimento"> Data de Nascimento </label>
                    <input type = "date" id = "data_nascimento" name = "data_nascimento" onChange = { onChange }/>

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "comorbidade"> Comorbidade </label>
                    <select id = "comorbidade" name = "comorbidade"  onChange = { onChangeComorbidade }>

                        <option > Selecione </option>
                        { comorbidades.map( ( comorbidade ) => (

                            <option key = { comorbidade.id } value = { comorbidade.id }> { comorbidade.nome } </option>

                        ))}  
                                             

                    </select>

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "id_medicamento"> Medicamento </label>
                    <select id = "id_medicamento" name = "id_medicamento"  onChange = { onChangeMedicamento }>

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

export default CadastrarProntuarios;
import React, { useState, useEffect } from "react";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

import { useNavigate } from "react-router-dom";

function CadastrarFuncionarios() {

    const tituloDaPagina = "Cadastrar Funcionários";

    const navigate = useNavigate();

    //---------------------------- Carrega o select de Exame Que Realiza ----------------------

    const [ exames, setExames ] = useState([]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( ( res ) => {

            const exames = res.data;
            setExames( exames );
        });

    }, []);

    //-----------------------------------------------------------------------------------------------

    //---------------------------- Carrega o select de Especialidade ----------------------

    const [ especialidades, setEspecialidades] = useState([]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then(( res ) => {

            let especialidades = res.data;
            setEspecialidades( especialidades );
        });


    }, []);

    //----------------------------------------------------------------------------------------

    //---------------------------- Carrega o select Cargo ----------------------

    const [ cargos, setCargos ] = useState([]);

    useEffect(() => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos')
        
        .then( ( res ) => {

            let cargos = res.data;
            setCargos( cargos );
        });

    }, []);

    //-----------------------------------------------------------------------------------
    
    const dadosIniciaisDeLogin = {

        cpf: "",
        nome: "",
        telefone: "",
        email: "",
        senha: "",
        perfil: "",
        status: ""
    };


    const dadosIniciaisDoFuncionario = {

        endereco: 0
    }

    

    const dadosIniciaisDoMedico = {

        cpf: "",
        crm: "",
        especialidade: "0",
        biografia: "",
        foto: ""
    };

    const dadosIniciaisDoEndereco = {

        logradouro: "",
        numero: 0,
        complemento: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: ""
    };

    const [ dadosDeLogin, setDadosDeLogin ] = useState(dadosIniciaisDeLogin);
    const [ dadosDoFuncionario, setDadosDoFuncionario ] = useState(dadosIniciaisDoFuncionario);
    const [ dadosDoMedico, setDadosDoMedico ] = useState(dadosIniciaisDoMedico);
    const [ dadosDoEndereco, setDadosDoEndereco ] = useState(dadosIniciaisDoEndereco);

    useEffect(() => {
        

        /*function teste(cpfMedico) {

            console.log("Ver se passou aqui");

            setDadosDoMedico( { ...dadosDoMedico, cpf: cpfMedico } );
        }*/
        
        if( (dadosDoFuncionario.endereco !== 0)  ) {

            axios.post('https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios', dadosDoFuncionario)
              
            .then( (response) => {
    
                console.log("Funcionário Cadastrado");

                dadosDoFuncionario.endereco = 0;

                //let cpfMedico = response.data.cpf;  
                
                //teste(cpfMedico);                
                
            });            
        }
        
    }, [dadosDoFuncionario]);

    /*useEffect(() => {
        
        if( dadosDoMedico.cpf !== '' ) {

            axios.post('http://localhost:4000/api/gerenciar_medicos', dadosDoMedico)
              
            .then( (response) => {
    
                console.log("Médico Cadastrado");
                
            });
        }
    }, [dadosDoMedico]);*/

    


    function onChangeCPF( ev ) {

        const { name, value } = ev.target;

        console.log({ name, value });

        setDadosDeLogin( { ...dadosDeLogin, [name]:value } );
        setDadosDoFuncionario( { ...dadosDoFuncionario, [name]:value } );        
        setDadosDoMedico( { ...dadosDoMedico, [name]:value } );        
    };

    function onChangeLogin( ev ) {

        const { name, value } = ev.target;

        console.log({ name, value });

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );
    };

    function onChangeFuncionario( ev ) {

        const { name, value } = ev.target;

        console.log({ name, value });

        setDadosDoFuncionario( { ...dadosDoFuncionario, [name]: value } );
    };

    function onChangeMedico( ev ) {

        const { name, value } = ev.target;

        console.log({ name, value });

        setDadosDoMedico( { ...dadosDoMedico, [name]: value } );
    };

    function onChangeEndereco( ev ) {

        const { name, value } = ev.target;

        console.log({ name, value });

        setDadosDoEndereco( { ...dadosDoEndereco, [name]: value } );
    };

    function addLogin( dados ) {

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/cadastrar_login', dados )
        
        .then((response) => {

            console.log("Login Cadastrado");
        });
    };

    function addMedico( dados ) {

        
        setTimeout(() => {

            if(dadosDoMedico.crm !== "") {
            
                axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos', dados)
        
                .then(( response ) => {

                    console.log("Medico Cadastrado");
                });
            }
        }, 5000);
    };

    function addEndereco( dados ) {

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_enderecos', dados )
        
        .then(( response ) => {

            console.log( "Endereço Cadastrado" );

            let idEndereco = response.data.id;

            console.log("O id do endereço é" + idEndereco );

            setDadosDoFuncionario( { ...dadosDoFuncionario, endereco: idEndereco } );

            console.log("O ID a ser cadastrado é:" + dadosDoFuncionario.endereco );


        });

    };

    function onSubmit( ev ) {

        ev.preventDefault();
        addLogin(dadosDeLogin);
        addEndereco(dadosDoEndereco);
        addMedico(dadosDoMedico);
        



    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_funcionarios');
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChangeLogin }/>

                </div>    
                
                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text"  id = "cpf" name = "cpf" onChange = { onChangeCPF } />

                </div>                           

                <div className = { styles.formGroup } >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "tel" id = "telefone" name = "telefone" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email"> E-mail </label>
                    <input type = "email"  id = "email" name = "email" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repitaSenha"> Repita a Senha </label>
                    <input type = "password" id = "rapitaSenha" name = "repitaSenha" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil" > Perfil </label>
                    <select id = "perfil" name = "perfil" onChange = { onChangeLogin }>                

                        <option></option>
                        <option value = "admin"> Administrador </option>
                        <option value = "cliente"> Cliente </option>
                        <option value = "medico"> Médico </option>
                        <option value = "examinador"> Examinador</option>
                        <option value = "funcionario"> Funcionário</option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status"> Status </label>
                    <select id = "status" name = "status" onChange = { onChangeLogin }>

                        <option></option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_nascimento" > Data de Nascimento </label>
                    <input type = "text" id = "data_nascimento" name = "data_nascimento" onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_admissao"> Data de Admissão </label>
                    <input type = "text" id = "data_admissao" name = "data_admissao" onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_demissao"> Data de Demissão </label>
                    <input type = "text" id = "data_demissao" name = "data_demissao" onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cargo"> Cargo </label>
                    <select id = "cargo" name = "cargo" onChange = { onChangeFuncionario } >
                        
                        <option></option>
                        { cargos.map( ( cargo ) => ( 

                            <option key = { cargo.id } value = { cargo.id } > { cargo.nome } </option>
                        ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "crm" > CRM </label>
                    <input type = "text" id = "crm" name = "crm" onChange = { onChangeMedico }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "especialidade"> Especialidade </label>
                    <select id = "especialidade" name = "especialidade" onChange = { onChangeMedico } > 

                        <option></option>
                        { especialidades.map( ( especialidade ) => ( 

                            <option key = { especialidade.id } value = { especialidade.id } > { especialidade.nome } </option>
                        ))}

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "biografia" > Biografia </label>
                    <input type = "text" id = "biografia" name = "biografia" onChange = { onChangeMedico } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "foto"> Foto </label>
                    <input type = "text" id = "foto" name = "foto" onChange = { onChangeMedico } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "exame_que_realiza" > Exame que Realiza </label>
                    <select id = "exame_que_realiza" name = "exame_que_realiza" onChange = { onChangeFuncionario }>

                        <option> </option>

                        { exames.map( (exame) => (

                            <option key = {exame.id} value = { exame.id }> { exame.nome }</option>

                        ))}
                        

                    </select>

                </div>                

                <h2> Endereço </h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "logradouro" > Logradouro </label>
                    <input type = "text" id = "logradouro" name = "logradouro" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "numero" > Número </label>
                    <input type = "number" id = "numero" name = "numero" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "complemento" > Complemento </label>
                    <input type = "text" id = "complemento" name = "complemento" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cep" > CEP </label>
                    <input type = "text" id = "cep" name = "cep" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "bairro" > Bairro </label>
                    <input  type = "text" id = "bairro" name = "bairro" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cidade" > Cidade </label>
                    <input type = "text" id = "cidade" name = "cidade" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "uf" > UF </label>
                    <select id = "uf" name = "uf" onChange = { onChangeEndereco }>
                    
                        <option></option>
                        <option value = "AC"> AC </option>
                        <option value = "AL"> AL </option>
                        <option value = "AP"> AP </option>
                        <option value = "AM"> AM </option>
                        <option value = "BA"> BA </option>
                        <option value = "CE"> CE </option>
                        <option value = "DF"> DF </option>
                        <option value = "ES"> ES </option>
                        <option value = "GO"> GO </option>
                        <option value = "MA"> MA </option>
                        <option value = "MS"> MS </option>
                        <option value = "MT"> MT </option>
                        <option value = "MG"> MG </option>
                        <option value = "PA"> PA </option>
                        <option value = "PB"> PB </option>
                        <option value = "PE"> PE </option>
                        <option value = "PI"> PI </option>
                        <option value = "PR"> PR </option>
                        <option value = "RJ"> RJ </option>
                        <option value = "RN"> RN </option>
                        <option value = "RO"> RO </option>
                        <option value = "RR"> RR </option>
                        <option value = "RS"> RS </option>
                        <option value = "SC"> SC </option>
                        <option value = "SE"> SE </option>
                        <option value = "SP"> SP </option>
                        <option value = "TO"> TO </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { retornaAoGerenciador }> Cancelar </button>

                </div>

            </form>           

        </>
    );
};

export default CadastrarFuncionarios;
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

        cpf: "",
        data_nascimento: "",
        data_admissao: "",
        data_demissao: "",
        cargo: "",
        //exame_que_realiza: "NULL"
        
    };    

    const dadosIniciaisDoMedico = {

        cpf: "",
        crm: "",
        especialidade: "0",
        biografia: "",
        imagem: ""
    };

    const [ dadosDeLogin, setDadosDeLogin ] = useState(dadosIniciaisDeLogin);
    const [ dadosDoFuncionario, setDadosDoFuncionario ] = useState(dadosIniciaisDoFuncionario);
    const [ dadosDoMedico, setDadosDoMedico ] = useState(dadosIniciaisDoMedico);  
    const [ imagem, setImagem] = useState("");
  

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

    function onChangeFile(ev) {

        const { name, value } = ev.target;          

        setDadosDoMedico( { ...dadosDoMedico, [name]: value } ); 

        setImagem(ev.target.files[0]);

        
    };

    

    /*function addLogin( dados ) {

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/cadastrar_login', dados )
        
        .then((res) => {

            console.log("Login Cadastrado");

            let cpf = res.data.cpf;
            setDadosDoFuncionario( { ...dadosDoFuncionario, cpf: cpf } );

        });
    };

    useEffect(() => {

        if(dadosDoFuncionario.cpf !== "") {

            axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios', dadosDoFuncionario)
        
            .then(( res ) => {

                console.log("Funcionario Cadastrado");

                let cpf = res.data.cpf;
                setDadosDoMedico( { ...dadosDoMedico, cpf: cpf } );
            });
        }
    }, [dadosDoFuncionario.cpf]);

    useEffect(() => {

        if(dadosDoMedico.cpf !== "") {

            axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos', dadosDoMedico)
        
            .then(( res ) => {

                console.log("Funcionario Cadastrado");
                
            });
        }
    }, [dadosDoMedico.cpf]);*/

    /*function addFuncionario( dados ) {

        setTimeout(() => {

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios', dados)
    
        .then(( response ) => {

            console.log("Funcionario Cadastrado");
        });

    }, 5000);
               
    };*/

    /*function addMedico( dados ) {
        
        setTimeout(() => {

            if(dadosDoMedico.crm !== "") {
            
                axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos', dados)
        
                .then(( response ) => {

                    console.log("Medico Cadastrado");
                });
            }
        }, 10000);
    };*/

    

    async function onSubmit( ev ) {

        ev.preventDefault();

        const formData = new FormData();
        formData.append('imagem', imagem);

        const headers = {

            "headers": {
                "Content-Type": "application/json",
            }
        }
        //addLogin(dadosDeLogin); 
        //addFuncionario(dadosDoFuncionario)      
        //addMedico(dadosDoMedico);

        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/cadastrar_login', dadosDeLogin )
        
        .then((res) => {

            console.log("Login Cadastrado");            

        });

        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios', dadosDoFuncionario)
        
            .then(( res ) => {

                console.log("Funcionario Cadastrado");

                
            });

        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos', dadosDoMedico)
        
            .then(( res ) => {

                console.log("Medico Cadastrado");
                
            });

        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/upload_image', formData, headers )
        
        .then(( response ) => {

            console.log("Funcionário Cadastrado");
            navigate('/gerenciar_funcionarios');
        });


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
                    <input type = "date" id = "data_nascimento" name = "data_nascimento" onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_admissao"> Data de Admissão </label>
                    <input type = "date" id = "data_admissao" name = "data_admissao" onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_demissao"> Data de Demissão </label>
                    <input type = "date" id = "data_demissao" name = "data_demissao" onChange = { onChangeFuncionario } />

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

                    <label htmlFor = "imagem"> Foto </label>
                    <input type = "file" id = "imagem" name = "imagem" onChange = { onChangeFile } required/>

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

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { retornaAoGerenciador }> Cancelar </button>

                </div>

            </form>           

        </>
    );
};

export default CadastrarFuncionarios;
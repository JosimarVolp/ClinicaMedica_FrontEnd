import axios from "axios";
import React, { useState, useEffect } from "react";

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

function EditarFuncionarios( props ) {

    const tituloDaPagina = "Editar Funcionários";

    const navigate = useNavigate();

    const [ dadosDeLogin, setDadosDeLogin ] = useState({});
    
    const [ dadosDoFuncionario, setDadosDoFuncionario ] = useState({});

    const [ dadosDoMedico, setDadosDoMedico ] = useState({});

    const [ cargos, setCargos ] = useState( [] );

    const [ exames, setExames ] = useState( [] );

    const [ especialidades, setEspecialidades ] = useState( [] );

    useEffect(() => {   

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios/${props.cpf}`)
            
            .then( (res) => {

                const dadosDoFuncionarioTemp = res.data;
                setDadosDoFuncionario(  dadosDoFuncionarioTemp  );                
    
            } );  
            
            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins/${props.cpf}`)
            
            .then( (res) => {

                const dadosDeLoginTemp = res.data;
                setDadosDeLogin(  dadosDeLoginTemp  );                
    
            } );      

      }, [props.cpf]);

      useEffect(()=> {

        if(dadosDoFuncionario.cargo === 1 ) {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos/${props.cpf}`)
        
            .then( (res) => {

            const dadosDoMedicoTemp = res.data;
            setDadosDoMedico(  dadosDoMedicoTemp  );                

            }    ); 
        }

      },[dadosDoFuncionario.cargo])

      useEffect(()=> {

        console.log("Campos de Médicos" + dadosDoMedico.data_nascimento);
        

      },[dadosDoMedico.cpf])

    useEffect(() => {

        if((dadosDoFuncionario.cpf !== undefined) && (dadosDoFuncionario.cpf !== "")) {
    
            console.log("CPF Passado: " + dadosDoFuncionario.cpf); 
            console.log("Nascimento: " + dadosDoFuncionario.data_nascimento); 
            console.log("Nascimento: " + dadosDoFuncionario.data_admissao);
            console.log("Nascimento: " + dadosDoFuncionario.data_demissao);
            console.log("Cargo: " + dadosDoFuncionario.cargo);
            console.log("Exame Que Realliza: " + dadosDoFuncionario.exame_que_realiza);
            dadosDoFuncionario.data_nascimento = dadosDoFuncionario.data_nascimento.substring(0, 10);
            dadosDoFuncionario.data_admissao = dadosDoFuncionario.data_admissao.substring(0, 10);
            if((dadosDoFuncionario.data_demissao !== undefined) && (dadosDoFuncionario.data_demissao !== null)) {
                dadosDoFuncionario.data_demissao = dadosDoFuncionario.data_demissao.substring(0, 10);
            }
            
            setDadosDoFuncionario(dadosDoFuncionario);
            
           
          
        }
    
      }, [dadosDoFuncionario.cpf]);

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos')
        
        .then( ( res ) => {

            let cargos = res.data;
            setCargos( cargos );
        });

    }, []);

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then( ( res ) => {

            let especialidadesTemp = res.data;
            setEspecialidades( especialidadesTemp );

        });

    }, [] );
    
    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( ( res ) => {

            let exames = res.data;
            setExames( exames );

        });

    }, []);

    function onChangeLogin(ev) {

        const { name, value } = ev.target;        

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );
    };    
    
    function onChangeFuncionario(ev) {

        const { name, value } = ev.target;        

        setDadosDoFuncionario( { ...dadosDoFuncionario, [name]: value } );
    };

    function onChangeMedico(ev) {

        const { name, value } = ev.target;        

        setDadosDoMedico( { ...dadosDoMedico, [name]: value } );
    };

    function retornaAoGerenciador() {

        navigate('/gerenciar_funcionarios');

    }

    useEffect( () => {

        if(dadosDoFuncionario.cargo == 1) {
        
            document.getElementById('crmDiv').style.display = 'flex';
            document.getElementById('especialidadeDiv').style.display = 'flex';
            document.getElementById('biografiaDiv').style.display = 'flex';
            document.getElementById('fotoDiv').style.display = 'flex';
            document.getElementById('exame_que_realizaDiv').style.display = 'flex';
            
           

        } else if(dadosDoFuncionario.cargo == 3) {

            document.getElementById('crmDiv').style.display = 'none';
            document.getElementById('especialidadeDiv').style.display = 'none';
            document.getElementById('biografiaDiv').style.display = 'none';
            document.getElementById('fotoDiv').style.display = 'none';
            document.getElementById('exame_que_realizaDiv').style.display = 'flex';
            
        } else {

            document.getElementById('crmDiv').style.display = 'none';
            document.getElementById('especialidadeDiv').style.display = 'none';
            document.getElementById('biografiaDiv').style.display = 'none';
            document.getElementById('fotoDiv').style.display = 'none';
            document.getElementById('exame_que_realizaDiv').style.display = 'none';

        }


    }, [dadosDoFuncionario.cargo]);  

    async function onSubmit( ev ) {

        ev.preventDefault();

        await axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins', dadosDeLogin)
        
        .then( ( res ) => {

            alert("Login atualizado com sucesso");
            
        });

        await axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios', dadosDoFuncionario)
        
        .then( ( res ) => {

            alert("Funcionario atualizado com sucesso");
            
        });

        await axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos', dadosDoMedico)
        
        .then( ( res ) => {

            alert("Medico atualizado com sucesso");
            
        });

        //setCpfDoClienteParaEditar("");
        navigate("/gerenciar_funcionarios")

    }
    

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit } >

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input type = "text" id = "nome" name = "nome" defaultValue = { dadosDeLogin.nome } onChange = { onChangeLogin } />

                </div>    
                
                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text"  id = "cpf" name = "cpf" defaultValue = { dadosDeLogin.cpf } onChange = { onChangeLogin } />

                </div>                           

                <div className = { styles.formGroup } >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "tel" id = "telefone" name = "telefone" defaultValue = { dadosDeLogin.telefone } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email"> E-mail </label>
                    <input type = "email"  id = "email" name = "email" defaultValue = { dadosDeLogin.email } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" defaultValue = { dadosDeLogin.senha } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repitaSenha"> Repita a Senha </label>
                    <input type = "password" id = "rapitaSenha" name = "repitaSenha" defaultValue = { dadosDeLogin.senha } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil" > Perfil </label>
                    <select id = "perfil" name = "perfil" value = { dadosDeLogin.perfil} onChange = { onChangeLogin } >  

                    <option> Selecione... </option>              

                        <option value = "admin"> Administrador </option>
                        <option value = "cliente"> Cliente </option>
                        <option value = "medico"> Médico </option>
                        <option value = "examinador"> Examinador</option>
                        <option value = "funcionario"> Funcionário </option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status"> Status </label>
                    <select id = "status" name = "status" value = { dadosDeLogin.status } onChange = { onChangeLogin } >

                        <option> Selecione... </option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_nascimento" > Data de Nascimento </label>
                    <input type = "date" id = "data_nascimento" name = "data_nascimento"  defaultValue = { dadosDoFuncionario.data_nascimento } onChange = { onChangeFuncionario }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_admissao"> Data de Admissão </label>
                    <input type = "date" id = "data_admissao" name = "data_admissao" defaultValue = { dadosDoFuncionario.data_admissao} onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_demissao"> Data de Demissão </label>
                    <input type = "date" id = "data_demissao" name = "data_demissao" defaultValue = { dadosDoFuncionario.data_demissao } onChange = { onChangeFuncionario }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cargo"> Cargo </label>
                    <select id = "cargo" name = "cargo" required value = { dadosDoFuncionario.cargo } onChange = { onChangeFuncionario } >
                        
                        <option> Selecione... </option>
                        {cargos.map( ( item ) => (
                        <option value = { item.id } key = { item.id } > { item.nome } </option>
                        ))}

                    </select>

                </div>

                <div id = "crmDiv" className = { styles.formGroup01 }>

                    <label htmlFor = "crm" > CRM </label>
                    <input type = "text" id = "crm" name = "crm"  defaultValue = { dadosDoMedico.crm } onChange = { onChangeMedico } />

                </div>

                <div id = "especialidadeDiv" className = { styles.formGroup01 }>

                    <label htmlFor = "especialidade"> Especialidade </label>
                    <select id = "especialidade" name = "especialidade" value = { dadosDoMedico.especialidade } onChange = { onChangeMedico }> 

                        <option> Selecione... </option>
                        {especialidades.map( ( item ) => (

                            <option value = { item.id } key = { item.id } > { item.nome } </option>
                        ))}

                    </select>

                </div>

                <div id = "biografiaDiv" className = { styles.formGroup01 } >

                    <label htmlFor = "biografia" > Biografia </label>
                    <input type = "text" id = "biografia" name = "biografia" defaultValue = { dadosDoMedico.biografia } onChange = { onChangeMedico } />

                </div>

                <div id = "fotoDiv" className = { styles.formGroup01 }>

                    <label htmlFor = "imagem"> Foto </label>
                    <input type = "file" id = "imagem" name = "imagem" defaultValue = { dadosDoMedico.imagem } onChange = { onChangeMedico } />

                </div>

                <div id = "exame_que_realizaDiv" className = { styles.formGroup01 } >

                    <label htmlFor = "exame_que_realiza" > Exame que Realiza </label>
                    <select id = "exame_que_realiza" name = "exame_que_realiza" value = { dadosDoFuncionario.exame_que_realiza } onChange = { onChangeFuncionario}>

                    <option> Selecione... </option>


                    {exames.map( ( item )=>(

                        <option value={ item.id } key = { item.id } > { item.nome } </option>
                    ))}

                    </select>

                </div>                    

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { retornaAoGerenciador } > Cancelar </button>

                </div>

            </form>           

        </>
    );
};

export default EditarFuncionarios;
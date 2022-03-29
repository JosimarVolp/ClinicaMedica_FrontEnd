import axios from "axios";
import React, { useState, useEffect } from "react";

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

function EditarFuncionarios( props ) {

    const tituloDaPagina = "Editar Funcionários";

    const navigate = useNavigate();

    const dadosIniciaisDoFuncionario = {

        
    }

    const [ dadosDoFuncionario, setDadosDoFuncionario ] = useState(dadosIniciaisDoFuncionario);

    useEffect(() => {

        setDadosDoFuncionario(props.funcionario)

    }, [props.funcionario]);    

    useEffect(() => {

        
        setValor_padrao_exame_que_realiza(dadosDoFuncionario.exame_que_realiza)
        console.log("Exames que Realiza: " +dadosDoFuncionario.exame_que_realiza);

    }, [dadosDoFuncionario.exame_que_realiza])

    const [ dadosDeLogin, setDadosDeLogin ] = useState( { } );

    useEffect( ( ) => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins/${dadosDoFuncionario.cpf}`)
        
        .then( ( res ) => {

            let dadosDeLogin = res.data;
            setDadosDeLogin( dadosDeLogin );

        });

    }, [dadosDoFuncionario.cpf] );
   
    const dadosIniciaisDoMedico = {

        cpf: "",
        crm:"",
        especialidade: 0,
        biografia: "",
        foto: ""
    }

    const [ dadosDoMedico, setDadosDoMedico ] = useState( dadosIniciaisDoMedico );

    useEffect( () => {

        if(dadosDoFuncionario.cargo == 1) {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos/${dadosDoFuncionario.cpf}`)
            
            .then( ( res ) => {

                let dadosDoMedico = res.data;

                setDadosDoMedico( dadosDoMedico );
            });
        }

    }, [dadosDoFuncionario.cargo]);

    useEffect( ( ) => {

        console.log("CPF do Médico: " +dadosDoMedico.cpf);
        console.log("CRM do Médico: " +dadosDoMedico.crm);
        console.log("Especialidade do Médico: " +dadosDoMedico.especialidade);
        

    }, [dadosDoMedico] );

    const [ cargoAtual, setCargoAtual ] = useState({});

   /* useEffect(() => {

        axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos/${dadosDoFuncionario.cargo}`)
        
        .then( (res) => {

            let cargoAtual = res.data;
            setCargoAtual(cargoAtual);
        });

    }, [dadosDoFuncionario.cargo]);*/

    const [ dadosDoEndereco, setDadosDoEndereco ] = useState( {} );

    useEffect( ( ) => {

        if(dadosDoFuncionario.endereco !== undefined) {

            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_enderecos/${dadosDoFuncionario.endereco}`)
            
            .then( ( res ) => {

                let dadosDoEndereco = res.data;

                setDadosDoEndereco( dadosDoEndereco);

            });
        }


    }, [dadosDoFuncionario.endereco] );

    const [ cargos, setCargos ] = useState( [] );

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos')
        
        .then( ( res ) => {

            let cargos = res.data;
            setCargos( cargos );
        });

    }, []);

    const [ especialidades, setEspecialidades ] = useState( [] );

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then( ( res ) => {

            let especialidades = res.data;
            setEspecialidades( especialidades );

        });

    }, [] );

    const [ exames, setExames ] = useState( [] );

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( ( res ) => {

            let exames = res.data;
            setExames( exames );

        });

    }, []);

    const [ valor_padrao_exame_que_realiza, setValor_padrao_exame_que_realiza] = useState(0);

    useEffect( () => {

        if(dadosDoFuncionario.cargo == 1) {
        
            document.getElementById('crmDiv').style.display = 'flex';
            document.getElementById('especialidadeDiv').style.display = 'flex';
            document.getElementById('biografiaDiv').style.display = 'flex';
            document.getElementById('fotoDiv').style.display = 'flex';
            document.getElementById('exame_que_realizaDiv').style.display = 'flex';
            setValor_padrao_exame_que_realiza(0);
           

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
    
    function carregaExames() {

        if(dadosDoFuncionario.exame_que_realiza != null) {
        
            return <>
        
                

                    {exames.map( ( item )=>(

                        <option value={ item.id } key = { item.id } > { item.nome } </option>
                    ))}

                
            </>
        }
    }
    
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

    function onChangeEndereco(ev) {

        const { name, value } = ev.target;        

        setDadosDoEndereco( { ...dadosDoEndereco, [name]: value } );
    };

    function retornaAoGerenciador() {

        navigate('/gerenciar_funcionarios');

    }


    

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } >

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

                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_nascimento" > Data de Nascimento </label>
                    <input type = "text" id = "data_nascimento" name = "data_nascimento"  defaultValue = { dadosDoFuncionario.data_nascimento } onChange = { onChangeFuncionario }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_admissao"> Data de Admissão </label>
                    <input type = "text" id = "data_admissao" name = "data_admissao" defaultValue = { dadosDoFuncionario.data_admissao} onChange = { onChangeFuncionario } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_demissao"> Data de Demissão </label>
                    <input type = "text" id = "data_demissao" name = "data_demissao" defaultValue = { dadosDoFuncionario.data_demissao } onChange = { onChangeFuncionario }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cargo"> Cargo </label>
                    <select id = "cargo" name = "cargo" required value = { dadosDoFuncionario.cargo } onChange = { onChangeFuncionario } >
                        
                        {cargos.map( ( item ) => (
                        <option value = { item.id } key = { item.id } > { item.nome } </option>
                        ))}

                    </select>

                </div>

                <div id = "crmDiv" className = { styles.formGroup01 }>

                    <label htmlFor = "crm" > CRM </label>
                    <input type = "text" id = "crm" name = "crm"  />

                </div>

                <div id = "especialidadeDiv" className = { styles.formGroup01 }>

                    <label htmlFor = "especialidade"> Especialidade </label>
                    <select id = "especialidade" name = "especialidade"  > 

                        {especialidades.map( ( item ) => (

                            <option value = { item.id } key = { item.id } > { item.nome } </option>
                        ))}

                    </select>

                </div>

                <div id = "biografiaDiv" className = { styles.formGroup01 } >

                    <label htmlFor = "biografia" > Biografia </label>
                    <input type = "text" id = "biografia" name = "biografia" />

                </div>

                <div id = "fotoDiv" className = { styles.formGroup01 }>

                    <label htmlFor = "foto"> Foto </label>
                    <input type = "text" id = "foto" name = "foto" />

                </div>

                <div id = "exame_que_realizaDiv" className = { styles.formGroup01 } >

                    <label htmlFor = "exame_que_realiza" > Exame que Realiza </label>
                    <select id = "exame_que_realiza" name = "exame_que_realiza" value = { valor_padrao_exame_que_realiza } onChange = { onChangeLogin}>

                    {exames.map( ( item )=>(

                        <option value={ item.id } key = { item.id } > { item.nome } </option>
                    ))}

                    </select>

                </div>                

                <h2> Endereço </h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "logradouro" > Logradouro </label>
                    <input type = "text" id = "logradouro" name = "logradouro"  defaultValue = { dadosDoEndereco.logradouro }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "numero" > Número </label>
                    <input type = "number" id = "numero" name = "numero"  defaultValue = { dadosDoEndereco.numero }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "complemento" > Complemento </label>
                    <input type = "text" id = "complemento" name = "complemento" defaultValue = { dadosDoEndereco.complemento }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cep" > CEP </label>
                    <input type = "text" id = "cep" name = "cep" defaultValue = { dadosDoEndereco.cep} />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "bairro" > Bairro </label>
                    <input  type = "text" id = "bairro" name = "bairro" defaultValue = { dadosDoEndereco.bairro }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cidade" > Cidade </label>
                    <input type = "text" id = "cidade" name = "cidade" defaultValue = { dadosDoEndereco.cidade }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "uf" > UF </label>
                    <select id = "uf" name = "uf" value = { dadosDoEndereco.uf } onChange = { onChangeEndereco } >
                    
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

                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick = { retornaAoGerenciador } > Cancelar </button>

                </div>

            </form>           

        </>
    );
};

export default EditarFuncionarios;
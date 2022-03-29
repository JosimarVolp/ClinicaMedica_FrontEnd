import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

function CadastrarClientes() {

    const tituloDaPagina = "Cadastrar Cliente";

    //--------------Busca todos os convênios para preencher o campo Convênio --------------------

    const [ convenios, setConvenios ] = useState([]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios')
        
        .then( ( res ) => {

            let convenios = res.data;
            setConvenios(convenios);
        });

    }, []);

    //-----------------------------------------------------------------------------------------------

    const navigate = useNavigate();

    function cancelar() {

        navigate('/gerenciar_clientes');
    }

    const dadosIniciaisDeLogin = {

        cpf: "",
        nome: "",        
        telefone: "",
        email: "",
        senha: "",
        perfil: "",
        status: ""
    };        

    const dadosIniciaisDoCliente = {

        cpf: "",
        data_nascimento: '',
        nome_responsavel: "",
        cpf_responsavel: "",
        
        endereco: 0    
    };

    const dadosIniciaisDoEndereco = {

        logradouro: "",
        numero: 0,
        complemento: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: ""
    }

    
    
    const [ dadosDeLogin, setDadosDeLogin ] = useState(dadosIniciaisDeLogin);
    const [ dadosDoCliente, setDadosDoCliente ] = useState(dadosIniciaisDoCliente);  
    const [ dadosDoEndereco, setDadosDoEndereco ] = useState(dadosIniciaisDoEndereco);

    useEffect(() => {

        if(dadosDoCliente.endereco !== 0) {
        
            axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_clientes', dadosDoCliente )
              
            .then( (response) => {
    
                console.log("Cliente Cadastrado");
                dadosDoCliente.endereco = 0;
                
            });
            
        }        
    
    }, [dadosDoCliente]);    

    function onChangeCPF( ev ) {
        
        const {name, value} = ev.target;

        console.log( { name, value } );

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );
        setDadosDoCliente( { ...dadosDoCliente, [name]: value } );
    }
    
    function onChangeLogin( ev ) {

        const { name, value } = ev.target;

        console.log( { name, value } );

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );        

    };
    
    function onChangeCliente( ev ) {

        const { name, value } = ev.target;

        console.log( { name, value } );

        setDadosDoCliente( { ...dadosDoCliente, [name]: value } );

    };

    function onChangeEndereco( ev ) {

        const { name, value } = ev.target;

        console.log( { name, value } );

        setDadosDoEndereco( { ...dadosDoEndereco, [name]: value } );

    };

    function onBlur() {

        var dataAtual = new Date();
        var diaAtual = String(dataAtual.getDate()).padStart(2, '0');
        var mesAtual = String(dataAtual.getMonth() + 1).padStart(2, '0');
        var anoAtual = dataAtual.getFullYear();
        var dataAtual = diaAtual + '/' + mesAtual + '/' + anoAtual;
       
        var diaNascimento = dadosDoCliente.data_nascimento.substring(8, 10);
        var mesNascimento = dadosDoCliente.data_nascimento.substring(5, 7);
        var anoNascimento = dadosDoCliente.data_nascimento.substring(0, 4);
        
        if((anoAtual - anoNascimento) > 18) {

            document.getElementById('div_nome_responsavel').style.display = 'none';
            document.getElementById('div_cpf_responsavel').style.display = 'none';

        } else if((anoAtual - anoNascimento) < 18) {

            document.getElementById('div_nome_responsavel').style.display = 'flex';
            document.getElementById('div_cpf_responsavel').style.display = 'flex';
        
        } else if((anoAtual - anoNascimento) === 18) {

            if(mesAtual > mesNascimento) {

                document.getElementById('div_nome_responsavel').style.display = 'none';
                document.getElementById('div_cpf_responsavel').style.display = 'none';

            } else if(mesAtual < mesNascimento) {

                document.getElementById('div_nome_responsavel').style.display = 'flex';
                document.getElementById('div_cpf_responsavel').style.display = 'flex';
            
            } else if(mesAtual === mesNascimento) {

                if(diaAtual >= diaNascimento) {

                    document.getElementById('div_nome_responsavel').style.display = 'none';
                    document.getElementById('div_cpf_responsavel').style.display = 'none';

                } else {

                    document.getElementById('div_nome_responsavel').style.display = 'flex';
                    document.getElementById('div_cpf_responsavel').style.display = 'flex';
                }
                
            }
        }
    }

    function addLogin( dados ) {

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/cadastrar_login', dados )

        .then( (response) => {

            console.log("Login Cadastrado");            

        })

    }

    function addEndereco( dados ) {        
                 
            axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_enderecos', dados )
            
            .then( (response) => {

                console.log("Endereço Cadastrado");

                let idEndereco = response.data.id;

                console.log("O id do endereço é:" + idEndereco);

                //const endereco = 0;
                
                setDadosDoCliente( { ...dadosDoCliente, endereco: idEndereco });

                

                console.log("O id a ser cadastrado é:" + dadosDoCliente.endereco);
                    
                

                //return dadosDoCliente;                
        })
        
    }

    

    function onSubmit( ev ) {

        ev.preventDefault();
        addLogin(dadosDeLogin);
        addEndereco(dadosDoEndereco);
        //addCliente(dadosDoCliente); 
    };      

        



    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className={ styles.formulario } onSubmit = { onSubmit }>

                <h2> Dados Pessoais</h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input type = "text" id = "nome" name="nome" onChange = { onChangeLogin } />

                </div>                

                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text" id = "cpf" name = "cpf" onChange = { onChangeCPF } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "text" id = "telefone" name = "telefone" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email">  E-mail </label>
                    <input type = "email" id = "email" name = "email" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repetirSenha"> Repetir Senha </label>
                    <input type = "password" id = "repetirSenha" name = "repetirSenha" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil"> Perfil </label>
                    <select id = "perfil" name = "perfil" onChange = { onChangeLogin } >

                        <option></option>
                        <option value = "cliente" > Cliente </option>                   

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status"> Status </label>
                    <select id = "status" name = "status" onChange = { onChangeLogin } >

                        <option></option>
                        <option value = "ativo" > Ativo </option>
                        <option value = "inativo"> Inativo</option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_nascimento"> Data de Nascimento </label>
                    <input type = "date" id = "data_nascimento" name = "data_nascimento" onChange = { onChangeCliente } onBlur = { onBlur } />

                </div>

                <div id = "div_nome_responsavel" className = { styles.formGroup_01 } >

                    <label htmlFor = "nome_responsavel"> Nome do Responsável </label>
                    <input type="text" id = "nome_responsavel" name = "nome_responsavel" onChange = { onChangeCliente } />

                </div>

                <div id = "div_cpf_responsavel" className = { styles.formGroup_01 } >

                    <label htmlFor = "cpf_responsavel"> CPF do Responsável </label>
                    <input type="text" id = "cpf_responsavel" name = "cpf_responsavel" onChange = { onChangeCliente } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "convenio"> Convênio </label>
                    <select id = "convenio" name = "convenio" onChange = { onChangeCliente } >

                        <option></option>
                        { convenios.map( ( convenio ) => (

                            <option  key = { convenio.id } value = { convenio.id }> { convenio.nome } </option>
                        ))}

                    </select>

                </div>

                <hr />

                <h2> Endereço </h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "logradouro"> Logradouro </label>
                    <input type = "text" id = "logradouro" name = "logradouro" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "numero"> Número </label>
                    <input type = "number" id = "numero" name = "numero" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "complemento">Complemento </label>
                    <input type = "text" id = "complemento" name = "complemento" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cep"> CEP </label>
                    <input type = "text" id = "cep" name = "cep" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "bairro"> Bairro </label>
                    <input type = "text" id = "bairro" name = "bairro" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cidade"> Cidade </label>
                    <input type = "text" id = "cidade" name = "cidade" onChange = { onChangeEndereco } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "uf"> UF </label>
                    <select id = "uf" name = "uf" onChange = { onChangeEndereco }>                
                    
                        <option>  </option>
                        <option value = "AC"> AC </option>
                        <option value = "AL"> AL </option>
                        <option value = "AM"> AM </option>
                        <option value = "AP"> AP </option>
                        <option value = "BA"> BA </option>
                        <option value = "CE"> CE </option>
                        <option value = "DF"> DF </option>
                        <option value = "ES"> ES </option>
                        <option value = "GO"> GO </option>
                        <option value = "MA"> MA </option>
                        <option value = "MG"> MG </option>
                        <option value = "MS"> MS </option>
                        <option value = "MT"> MT </option>
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
                    <button type = "button" className = { styles.botaoVoltar } onClick={ cancelar } > Cancelar </button>

                </div>

            </form>            

        </>

    );
};

export default CadastrarClientes;
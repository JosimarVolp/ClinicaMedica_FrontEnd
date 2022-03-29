import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

const EditarClientes = ( props ) => {

    const tituloDaPagina = "Editar Cliente";  
    
    const navigate = useNavigate();

    const dadosIniciaisDoCliente = {

        cpf: "",
        data_nascimento: "",
        nome_responsavel:"",
        cpf_responsavel:"",
        convenio: 0,
        endereco: 0
    }

    const dadosIniciaisDoEndereco = {

        id: 0,
        logradouro: "",
        numero:"",
        complemento: "",
        cep: "",
        bairro: "",
        cidade: "",
        uf: ""
    }

    const [ convenios, setConvenios ] = useState([]);

    const [ dadosDeLogin, setDadosDeLogin ] = useState({});

    const [ dadosDoCliente, setDadosDoCliente ] = useState({});

    const [ dadosDoEndereco, setDadosDoEndereco ] = useState({});

    useEffect( ( ) => {

        if(props.login !== undefined) {

            setDadosDeLogin(props.login);

            console.log("Passou aqui 01");

        }

    },[props.login]);

    function cancelar() {

        navigate('/gerenciar_clientes');

    }

    useEffect( () => {

        if(dadosDeLogin.cpf !== undefined) {
        
            axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_clientes/${dadosDeLogin.cpf}`)
            
            .then( ( res ) => {

                let dadosDoCliente = res.data;

                if(dadosDoCliente.cpf === undefined) {

                    setDadosDoCliente(dadosIniciaisDoCliente);
                    
                    console.log("CPF IGUAL UNDEFINED");
                } else {

                    console.log("CPF é DIFERENTE DE VAZIO");
                    setDadosDoCliente(dadosDoCliente);
                    var dataEditada = dadosDoCliente.data_nascimento.substring(0, 10);
                    setDadosDoCliente({...dadosDoCliente, data_nascimento: dataEditada});
                }


            });

        }

        return function limpa() {

            setDadosDoCliente(dadosIniciaisDoCliente);
                    


        }

    },[dadosDeLogin.cpf]);

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios')
        
        .then( ( res ) => {

            let convenios = res.data;
            setConvenios(convenios);

        });

    }, [] );    

    function onChangeCPF( ev ) {
        
        const {name, value} = ev.target;

        console.log( { name, value } );

        setDadosDeLogin( { ...dadosDeLogin, [name]: value } );
        //setDadosDoCliente( { ...dadosDoCliente, [name]: value } );
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

    useEffect( () => {

        document.getElementById('div_nome_responsavel').style.display = 'none';
            document.getElementById('div_cpf_responsavel').style.display = 'none';

        if((dadosDoCliente.nome_responsavel !== undefined) && (dadosDoCliente.nome_responsavel !== "")) {

            document.getElementById('div_nome_responsavel').style.display = 'flex';
            document.getElementById('div_cpf_responsavel').style.display = 'flex';

        } else {

            document.getElementById('div_nome_responsavel').style.display = 'none';
            document.getElementById('div_cpf_responsavel').style.display = 'none';

        }

     }, [dadosDoCliente.nome_responsavel]);

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

    //---------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------DEU CERTO ATÉ AQUI--------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------------------------------------

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className={ styles.formulario } >

                <h2> Dados Pessoais</h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome"> Nome Completo </label>
                    <input type = "text" id = "nome" name = "nome" defaultValue = { dadosDeLogin.nome } onChange = { onChangeLogin } />

                </div>                

                <div className = { styles.formGroup } >

                    <label htmlFor = "cpf"> CPF </label>
                    <input type = "text" id = "cpf" name = "cpf" defaultValue = { dadosDeLogin.cpf } onChange = { onChangeCPF } />

                </div>

                <div className = { styles.formGroup }  >

                    <label htmlFor = "telefone"> Telefone </label>
                    <input type = "text" id = "telefone" name = "telefone" defaultValue = { dadosDeLogin.telefone } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "email">  E-mail </label>
                    <input type = "email" id = "email" name = "email" defaultValue = { dadosDeLogin.email } onChange = { onChangeLogin } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "senha"> Senha </label>
                    <input type = "password" id = "senha" name = "senha" defaultValue = { dadosDeLogin.senha } onChange = { onChangeLogin }/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "repetirSenha"> Repetir Senha </label>
                    <input type = "password" id = "repetirSenha" name = "repetirSenha" defaultValue = { dadosDeLogin.senha } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "perfil"> Perfil </label>
                    <select id = "perfil" name = "perfil" value = { dadosDeLogin.perfil } onChange = { onChangeLogin } >

                        <option > Selecione </option>
                        <option value = "admin" > Administrador </option>
                        <option value = "cliente" > Cliente </option>
                        <option value = "medico" > Médico </option>
                        <option value = "examinador" > Examinador</option>
                        <option value = "examinador" > Examinador</option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status"> Status </label>
                    <select id = "status" name = "status" value = { dadosDeLogin.status } onChange = { onChangeLogin } >

                        <option > Selecione </option>
                        <option value = "ativo" > Ativo </option>
                        <option value = "inativo"> Inativo</option>

                    </select>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "data_nascimento"> Data de Nascimento </label>
                    <input type = "date" id = "data_nascimento" name = "data_nascimento" defaultValue = { dadosDoCliente.data_nascimento } onBlur = { onBlur } onChange = { onChangeCliente } />

                </div>

                <div id = "div_nome_responsavel" className = { styles.formGroup_01 } >

                    <label htmlFor = "nome_responsavel"> Nome do Responsável </label>
                    <input type="text" id = "nome_responsavel" name = "nome_responsavel" defaultValue = { dadosDoCliente.nome_responsavel } onChange = { onChangeCliente } />

                </div>

                <div id = "div_cpf_responsavel" className = { styles.formGroup_01 } >

                    <label htmlFor = "cpf_responsavel"> CPF do Responsável </label>
                    <input type="text" id = "cpf_responsavel" name = "cpf_responsavel" defaultValue = { dadosDoCliente.cpf_responsavel } onChange = { onChangeCliente } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "convenio"> Convênio </label>
                    <select id = "convenio" name = "convenio" value = { dadosDoCliente.convenio } onChange = { onChangeCliente } >

                    <option> Selecione </option>
                    { convenios.map( ( item ) => (
                        
                        <option value = { item.id} key = { item.id }> {item.nome} </option>

                    ))}
                        

                    </select>

                </div>

                <hr />

                <h2> Endereço </h2>

                <div className = { styles.formGroup } >

                    <label htmlFor = "logradouro"> Logradouro </label>
                    <input type = "text" id = "logradouro" name = "logradouro" defaultValue = { dadosDoEndereco.logradouro } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "numero"> Número </label>
                    <input type = "number" id = "numero" name = "numero" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "complemento">Complemento </label>
                    <input type = "text" id = "complemento" name = "complemento"/>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cep"> CEP </label>
                    <input type = "text" id = "cep" name = "cep" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "bairro"> Bairro </label>
                    <input type = "text" id = "bairro" name = "bairro" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "cidade"> Cidade </label>
                    <input type = "text" id = "cidade" name = "cidade" />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "uf"> UF </label>
                    <select id = "uf" name = "uf" >                
                    
                        <option> Selecione </option>
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

                    <button type = "submit"  className = { styles.botaoCadastrar } > Salvar </button>
                    <button type = "button" onClick = { cancelar } className = { styles.botaoVoltar } > Cancelar </button>

                </div>

            </form>            

        </>

    );
};

export default EditarClientes;
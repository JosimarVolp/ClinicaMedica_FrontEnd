import React, { useState, useEffect, createContext } from "react";

import axios from "axios";

//import api from './services/api';

import "./app.css";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


import Especialidades from "./Componentes/Especialidades";
import DescricaoEspecialidade from "./Componentes/DescricaoEspecialidade";
import Especialistas from "./Componentes/Especialistas";
import DescricaoEspecialista from "./Componentes/DescricaoEspecialista";
import Exames from "./Componentes/Exames";
import DescricaoExame from "./Componentes/DescricaoExame";
import Resultados from "./Componentes/Resultados";
import Agendamento from "./Componentes/Agendamento";
import NotFound from "./Componentes/NotFound";
import CadastrarLogin from "./Componentes/CadastrarLogin"
import Relatorios from "./Componentes/Relatorios";

import SobreNos from "./Componentes/SobreNos"; 
import Contato from "./Componentes/Contato"; 
import Localizacao from "./Componentes/Localizacao";

import Botao from "./Componentes/Botao";
import Footer from "./Componentes/Footer"
import Header from "./Componentes/Header";
import Home from "./Componentes/Home";
import AgendarConsultas from "./Componentes/AgendarConsultas";
import AgendarExames from "./Componentes/AgendarExames";
import Login from "./Componentes/Login";

import HomeRestrita from "./Componentes/HomeRestrita";

import GerenciarProntuarios from "./Componentes/GerenciarProntuarios";
import CadastrarProntuarios from "./Componentes/CadastrarProntuarios";
import EditarProntuarios from "./Componentes/EditarProntuarios";
import Prontuarios from "./Componentes/Prontuarios";


import GerenciarClientes from "./Componentes/GerenciarClientes";
import GerenciarExamesAgendados from "./Componentes/GerenciarExamesAgendados"
import EditarExamesAgendados from "./Componentes/EditarExamesAgendados";
import GerenciarConsultas from "./Componentes/GerenciarConsultas";
import EditarConsulta from "./Componentes/EditarConsulta";
import GerenciarConvenios from "./Componentes/GerenciarConvenios";
import GerenciarExames from "./Componentes/GerenciarExames";
import GerenciarFuncionarios from "./Componentes/GerenciarFuncionarios";
import GerenciarCargos from "./Componentes/GerenciarCargos";
import GerenciarResultados from "./Componentes/GerenciarResultados";
import GerenciarEspecialidades from "./Componentes/GerenciarEspecialidades";
import GerenciarComorbidades from "./Componentes/GerenciarComorbidades";
import GerenciarMedicamentos from "./Componentes/GerenciarMedicamentos";

import CadastrarClientes from "./Componentes/CadastrarClientes";
import CadastrarEspecialidades from "./Componentes/CadastrarEspecialidades";
import CadastrarFuncionarios from "./Componentes/CadastrarFuncionarios";
import CadastrarExames from "./Componentes/CadastrarExames";
import CadastrarCargos from "./Componentes/CadastrarCargos";
import CadastrarConvenios from "./Componentes/CadastrarConvenios";
import CadastrarComorbidades from "./Componentes/CadastrarComorbidades";
import CadastrarMedicamentos from "./Componentes/CadastrarMedicamentos";
import EditarEspecialidades from "./Componentes/EditarEspecialidades";
import EditarCargos from "./Componentes/EditarCargos";
import EditarExames from "./Componentes/EditarExames";
import EditarConvenios from "./Componentes/EditarConvenios";
import EditarClientes from "./Componentes/EditarClientes";
import EditarFuncionarios from "./Componentes/EditarFuncionarios";
import EditarComorbidades from "./Componentes/EditarComorbidades";
import EditarMedicamentos from "./Componentes/EditarMedicamentos";


export const idEdicao = createContext({});

export const contextCargos = createContext({});

export const contextExames = createContext({});

export const contextConvenios = createContext({});

export const contextConsultas = createContext({});

export const contextExamesAgendados = createContext({});

export const contextClientes = createContext({});

export const contextFuncionarios = createContext({});

export const contextUsuarioConectado = createContext({});

export const contextBotaoCadastrar = createContext({});

export const contextBotaoLogin = createContext({});

export const contextEspecialidadeSelecionada = createContext({});

export const contextEspecialistaSelecionado = createContext({});

export const contextExameSelecionado = createContext({});

export const contextMedicamentoSelecionado = createContext({});

export const contextComorbidadeSelecionada = createContext({});

export const contextProntuarioSelecionado = createContext({});

export default function App() {

  const dadosDoUsuarioConectado = {

    cpf: "",
    nome:"",
    telefone:"",
    email:"",
    senha:"",
    perfil:"",
    status:""

  }
  
  const [ usuarioConectado, setUsuarioConectado ] = useState(dadosDoUsuarioConectado);

  //Armazena todos os exames do DB para mostrar na tela de gerenciamento de exames.  
  const [exames, setExames] = useState([]);

  //Armazena todos as especialidades do DB para mostrar na tela de gerenciamento de especialidades.
  const [especialidades, setEspecialidades] = useState([]);

  //Armazena a especialidade que será editada para mostrar na tela de edição de especialidade.
  const [especialidade, setEspecialidade] = useState({});

  //Armazena o cargo que será editado para mostrar na tela de edição de cargos

  const [ cargoParaEditar, setCargoParaEditar ] = useState({});

  const [ idDoCargoParaEditar, setIdDoCargoParaEditar ] = useState(0);

  //Armazena o convênio que será editado para mostrar na tela de edição de convênios

  const [ convenioParaEditar, setConvenioParaEditar ] = useState({});

  const [ idDoConvenioParaEditar, setIdDoConvenioParaEditar ] = useState(0);

  //Armazena a consulta que será editada para mostrar na tela de edição de consultas

  const [ consultaParaEditar, setConsultaParaEditar ] = useState({});

  const [ idDaConsultaParaEditar, setIdDaConsultaParaEditar ] = useState(0);

  //Armazena o exame agendado que será editado para mostrar na tela de edição de exames agendados

  const [ exameAgendadoParaEditar, setExameAgendadoParaEditar ] = useState({});

  const [ idDoExameAgendadoParaEditar, setIdDoExameAgendadoParaEditar ] = useState(0);

  //Armazena o cliente que será editado para mostrar na tela de edição de clientes

  const [ clienteParaEditar, setClienteParaEditar ] = useState({});

  const [ cpfDoClienteParaEditar, setCpfDoClienteParaEditar ] = useState("");

  //Armazena o cliente que será editado para mostrar na tela de edição de clientes

  const [ loginDoClienteParaEditar, setLoginDoClienteParaEditar ] = useState({});

  //Armazena o cliente que será editado para mostrar na tela de edição de clientes

  const [ funcionarioParaEditar, setFuncionarioParaEditar ] = useState({});

  const [ cpfDoFuncionarioParaEditar, setCpfDoFuncionarioParaEditar ] = useState("");

  //Armazena o id a ser editado
  const [ valorID, setValorID ] = useState(0);

  const [ exameParaEditar, setExameParaEditar ] = useState({});

  const [ idDoExameParaEditar, setIdDoExameParaEditar ] = useState(0);

  const [ idEspecialidadeSelecionada, setIdEspecialidadeSelecionada] = useState(0);

  const [ especialidadeSelecionada, setEspecialidadeSelecionada ] = useState({});

  const [ idEspecialistaSelecionado, setIdEspecialistaSelecionado] = useState("aaaa");

  const [ especialistaSelecionado, setEspecialistaSelecionado ] = useState({});

  const [ idExameSelecionado, setIdExameSelecionado] = useState(0);

  const [ exameSelecionado, setExameSelecionado ] = useState({});

  const [ idMedicamentoSelecionado, setIdMedicamentoSelecionado] = useState(0);

  const [ medicamentoSelecionado, setMedicamentoSelecionado ] = useState({});

  const [ idComorbidadeSelecionada, setIdComorbidadeSelecionada] = useState(0);

  const [ comorbidadeSelecionada, setComorbidadeSelecionada ] = useState({});

  const [ cpfDoProntuarioSelecionado, setCpfDoProntuarioSelecionado] = useState("");

  
  //Captura o valor da especialidade a ser editada
  useEffect(() => {

    

    if(valorID !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades/${valorID}`)
        
        .then( res => {

          const especialidade = res.data;
          setEspecialidade(  especialidade  );

        } ); 
    }

  }, [valorID]);

  //Captura o valor da especialidade a ser editada
  useEffect(() => {

    

    if(idEspecialidadeSelecionada !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades/${idEspecialidadeSelecionada}`)
        
        .then( res => {

          const especialidadeTemp = res.data;
          setEspecialidadeSelecionada(  especialidadeTemp  );

        } ); 
    }

  }, [idEspecialidadeSelecionada]);

  useEffect(() => {

    

    if(idExameSelecionado !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos/${idExameSelecionado}`)
        
        .then( res => {

          const exameTemp = res.data;
          setExameSelecionado(  exameTemp  );

        } ); 
    }

  }, [idExameSelecionado]);

  //Captura o valor da especialidade a ser editada
  useEffect(() => {

    if(idEspecialistaSelecionado !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos/${idEspecialistaSelecionado}`)
        
        .then( res => {

          const especialistaTemp = res.data;
          setEspecialistaSelecionado(  especialistaTemp  );

        } ); 
    }

  }, [idEspecialistaSelecionado]);

  //Captura o valor do cargo a ser editado
  useEffect(() => {

    if(idDoCargoParaEditar !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_cargos/${idDoCargoParaEditar}`)
        
        .then( res => {

          const cargoParaEditar = res.data;
          setCargoParaEditar(  cargoParaEditar  );

        } ); 
    }

  }, [idDoCargoParaEditar]);

  //Captura os dados do exames a ser editado
  useEffect(() => {

    if(idDoExameParaEditar !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos/${idDoExameParaEditar}`)
        
        .then( res => {

          const exameParaEditar = res.data;
          setExameParaEditar(  exameParaEditar  );

        } ); 
    }

  }, [idDoExameParaEditar]);
  
  //Captura os dados do convênio a ser editado
  useEffect(() => {

    if(idDoConvenioParaEditar !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_convenios/${idDoConvenioParaEditar}`)
        
        .then( res => {

          const convenioParaEditar = res.data;
          setConvenioParaEditar(  convenioParaEditar  );

        } ); 
    }

  }, [idDoConvenioParaEditar]);

  //Captura os dados do cliente a ser editado
  useEffect(() => {

    if(cpfDoClienteParaEditar !== "") {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_clientes/${cpfDoClienteParaEditar}`)
        
        .then( res => {

          const clienteParaEditar = res.data;
          setClienteParaEditar(  clienteParaEditar  );

        } ); 
    }

  }, [cpfDoClienteParaEditar]);

  //Captura o valor da consulta a ser editada
  useEffect(() => {    

    if(idDaConsultaParaEditar !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_consultas/${idDaConsultaParaEditar}`)
        
        .then( res => {

          let consultaParaEditar = res.data;
          setConsultaParaEditar(  consultaParaEditar  );

        } ); 
    }

  }, [idDaConsultaParaEditar]);

  //Captura o valor do exame agendado a ser editado
  useEffect(() => {    

    if(idDoExameAgendadoParaEditar !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos_agendados/${idDoExameAgendadoParaEditar}`)
        
        .then( res => {

          let exameAgendadoParaEditar = res.data;
          setExameAgendadoParaEditar(  exameAgendadoParaEditar  );

        } ); 
    }

  }, [idDoExameAgendadoParaEditar]);

  //Captura os dados de login do cliente a ser editado
  useEffect(() => {

    if(cpfDoClienteParaEditar !== "") {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_logins/${cpfDoClienteParaEditar}`)
        
        .then( res => {

          const loginDoClienteParaEditar = res.data;
          setLoginDoClienteParaEditar(  loginDoClienteParaEditar  );

        } ); 
    }

  }, [cpfDoClienteParaEditar]);

  
 
  //Captura os dados do funcionario a ser editado
  useEffect(() => {

    if(cpfDoFuncionarioParaEditar !== "") {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_funcionarios/${cpfDoFuncionarioParaEditar}`)
        
        .then( res => {

          const funcionarioParaEditar = res.data;
          setFuncionarioParaEditar(  funcionarioParaEditar  );

        } ); 
    }

  }, [cpfDoFuncionarioParaEditar]);

  //captura os dados da comorbidade a ser editada

  useEffect(() => {

    if(idComorbidadeSelecionada !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_comorbidades/${idComorbidadeSelecionada}`)
        
        .then( res => {

          const comorbidadeSelecionadaTemp = res.data;
          setComorbidadeSelecionada(  comorbidadeSelecionadaTemp  );

        } ); 
    }

  }, [idComorbidadeSelecionada]);

  //captura os dados do medicamento a ser editado

  useEffect(() => {

    if(idMedicamentoSelecionado !== 0) {

      axios.get(`https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicamentos/${idMedicamentoSelecionado}`)
        
        .then( res => {

          const medicamentoSelecionadoTemp = res.data;
          setMedicamentoSelecionado(  medicamentoSelecionadoTemp  );

        } ); 
    }

  }, [idMedicamentoSelecionado]);

  //Busca todos os exames 

  useEffect(() => {

    axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
      
      .then( res => {
        
        const exames = res.data;
        setExames( exames );       

      } );

  }, []);

  //busca todas as especialidades

  useEffect(() => {

    axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
      
      .then( res => {

        const especialidades = res.data;
        setEspecialidades(  especialidades  );

      } );  
  }, []);

  //const [ dadosDoBotao, setDadosDoBotao ] = useState(dadosIniciaisDoBotao);

  const dadosIniciaisDoBotaoCadastrar = {

      titulo: "Cadastrar",
      link: "/cadastrar_login"
  }
  
  const dadosIniciaisDoBotaoLogin = {

      titulo: "Login",
      link: "/login"
  }

  const [ dadosDoBotaoCadastrar, setDadosDoBotaoCadastrar ] = useState(dadosIniciaisDoBotaoCadastrar);
  
  const [ dadosDoBotaoLogin, setDadosDoBotaoLogin ] = useState(dadosIniciaisDoBotaoLogin);

  
      
  
  return (

    <Router>

      <>       
        
         <contextUsuarioConectado.Provider value = { { usuarioConectado, setUsuarioConectado } }>
         <contextBotaoCadastrar.Provider value = { {dadosDoBotaoCadastrar, setDadosDoBotaoCadastrar} }>
         <contextBotaoLogin.Provider value = { {dadosDoBotaoLogin, setDadosDoBotaoLogin} }>
         <idEdicao.Provider value = { { valorID, setValorID } }>
         <contextCargos.Provider value = { { idDoCargoParaEditar, setIdDoCargoParaEditar } }>
         <contextExames.Provider value = { { idDoExameParaEditar, setIdDoExameParaEditar } }>
         <contextConvenios.Provider value = { { idDoConvenioParaEditar, setIdDoConvenioParaEditar } }>
         <contextConsultas.Provider value = { { idDaConsultaParaEditar, setIdDaConsultaParaEditar } }>
         <contextExamesAgendados.Provider value = { { idDoExameAgendadoParaEditar, setIdDoExameAgendadoParaEditar } }>
         <contextClientes.Provider value = { { cpfDoClienteParaEditar, setCpfDoClienteParaEditar } }>
         <contextFuncionarios.Provider value = { { cpfDoFuncionarioParaEditar, setCpfDoFuncionarioParaEditar } }>
         <contextEspecialidadeSelecionada.Provider value = { { idEspecialidadeSelecionada, setIdEspecialidadeSelecionada } }>
         <contextEspecialistaSelecionado.Provider value = { { idEspecialistaSelecionado, setIdEspecialistaSelecionado } }>
         <contextExameSelecionado.Provider value = { { idExameSelecionado, setIdExameSelecionado } }>
         <contextComorbidadeSelecionada.Provider value = { { idComorbidadeSelecionada, setIdComorbidadeSelecionada } }>
         <contextMedicamentoSelecionado.Provider value = { { idMedicamentoSelecionado, setIdMedicamentoSelecionado } }>
         <contextProntuarioSelecionado.Provider value = { { cpfDoProntuarioSelecionado, setCpfDoProntuarioSelecionado } }>


         <div className = "containerSuperior">
               
               <Botao dadosDoBotao =  { dadosDoBotaoCadastrar } />
               <Botao dadosDoBotao = { dadosDoBotaoLogin } />
                   
        </div>
     
        <Header />          

        
          
          <Routes>            

              <Route exact path = "/" element = { <Home /> } />
              <Route exact path = "/especialidades" element = { <Especialidades /> } />
              <Route exact path = { `/especialidades/${idEspecialidadeSelecionada}`} element = { <DescricaoEspecialidade especialidade = { especialidadeSelecionada } /> } />
              
              <Route exact path = "/especialistas" element = { <Especialistas /> } />
              <Route exact path = { `/especialistas/${idEspecialistaSelecionado}`} element = { <DescricaoEspecialista  especialista = { especialistaSelecionado }/> } />
              
              
              <Route exact path = "/exames_e_procedimentos" element = { <Exames /> } />
              <Route exact path = { `/exames_e_procedimentos/${idExameSelecionado}`} element = { <DescricaoExame exame = { exameSelecionado } /> } />
              <Route exact path = "/resultados" element = { <Resultados /> } />
              <Route exact path = "/agendamento" element = { <Agendamento /> } />
              <Route exact path = "/cadastrar_login" element = { <CadastrarLogin /> } />
              <Route exact path = "/login" element = { <Login /> } />
              <Route exact path = "/area_restrita" element = { <HomeRestrita /> } />

              <Route exact path = "/sobre_nos" element = { <SobreNos /> } />
              <Route exact path = "/contato" element = { <Contato /> } />
              <Route exact path = "/localizacao" element = { <Localizacao /> } />

              <Route exact path = "/relatorios" element = { <Relatorios /> } />

              <Route exact path = "/gerenciar_prontuarios" element = { <GerenciarProntuarios /> } />
              <Route exact path = "/gerenciar_prontuarios/cadastrar" element = { <CadastrarProntuarios /> } />
              <Route exact path = { `/gerenciar_prontuarios/editar/${cpfDoProntuarioSelecionado}`} element = { <EditarProntuarios cpf = { cpfDoProntuarioSelecionado } /> } />
              <Route exact path = { `/prontuarios/${cpfDoProntuarioSelecionado}`} element = { <Prontuarios cpf = { cpfDoProntuarioSelecionado } /> } />

              
              
          
              
              <Route exact path = "/gerenciar_clientes"  element = { <GerenciarClientes /> } />            
              <Route exact path = "/gerenciar_clientes/cadastrar" element = { <CadastrarClientes /> } />
              <Route exact path = { `/gerenciar_clientes/editar/${cpfDoClienteParaEditar}`} element = { <EditarClientes login = { loginDoClienteParaEditar } /> } />
              
              <Route exact path = "/gerenciar_consultas_agendadas/agendar"  element = { <AgendarConsultas /> } />
              <Route exact path = "/gerenciar_exames_e_procedimentos_agendados/agendar" element = { <AgendarExames /> } />
              <Route exact path = { `/gerenciar_exames_e_procedimentos_agendados/editar/${idDoExameAgendadoParaEditar}`} element = { <EditarExamesAgendados exame = { exameAgendadoParaEditar } /> } />
              
                <Route exact path  ="/gerenciar_especialidades" element = { <GerenciarEspecialidades especialidades = { especialidades }/> } />
              
              <Route exact path = "/gerenciar_especialidades/cadastrar" element = { <CadastrarEspecialidades /> } />
              <Route exact path = {`/gerenciar_especialidades/editar/${valorID}`} element = { <EditarEspecialidades especialidade = { especialidade } /> } />
              
              
              <Route exact path = "/gerenciar_exames_e_procedimentos_agendados" element = { <GerenciarExamesAgendados /> } />
              
              <Route exact path = "/gerenciar_consultas_agendadas" element = { <GerenciarConsultas /> } />
              <Route exact path = {`/gerenciar_consultas_agendadas/editar/${idDaConsultaParaEditar}`} element = { <EditarConsulta consulta = { consultaParaEditar } /> } />
              
              <Route exact path = "/gerenciar_convenios" element = { <GerenciarConvenios /> } />
              <Route exact path = "/gerenciar_convenios/cadastrar" element = { <CadastrarConvenios /> } />
              <Route exact path = {`/gerenciar_convenios/editar/${idDoConvenioParaEditar}`} element = { <EditarConvenios convenio = { convenioParaEditar }  /> } />
              
              <Route exact path = "/gerenciar_cargos" element = { <GerenciarCargos /> } />
              <Route exact path = "/gerenciar_cargos/cadastrar" element = { <CadastrarCargos /> } />
              <Route exact path = {`/gerenciar_cargos/editar/${idDoCargoParaEditar}`} element = { <EditarCargos cargo = { cargoParaEditar } /> } />
              
              <Route exact path = "/gerenciar_exames_e_procedimentos" element = { <GerenciarExames exames = { exames } /> } />
              <Route exact path = "/gerenciar_exames_e_procedimentos/cadastrar" element = { <CadastrarExames /> } />
              <Route exact path = {`/gerenciar_exames_e_procedimentos/editar/${idDoExameParaEditar}`} element = { <EditarExames exame = { exameParaEditar } /> } />

              <Route exact path = "/gerenciar_funcionarios" element = { <GerenciarFuncionarios /> } />
              <Route exact path = "/gerenciar_funcionarios/cadastrar" element = { <CadastrarFuncionarios /> } />
              <Route exact path = { `/gerenciar_funcionarios/editar/${cpfDoFuncionarioParaEditar}` } element = { <EditarFuncionarios cpf = { cpfDoFuncionarioParaEditar } /> } />
              
              
              <Route exact path = "/gerenciar_resultados" element = { <GerenciarResultados /> } />
              <Route exact path = "/gerenciar_comorbidades" element = { <GerenciarComorbidades /> } />
              <Route exact path = "/gerenciar_comorbidades/cadastrar" element = { <CadastrarComorbidades /> } />
              <Route exact path = { `/gerenciar_comorbidades/editar/${idComorbidadeSelecionada}`} element = { <EditarComorbidades comorbidade = { comorbidadeSelecionada } /> } />
              

              <Route exact path = "/gerenciar_medicamentos" element = { <GerenciarMedicamentos /> } />
              <Route exact path = "/gerenciar_medicamentos/cadastrar" element = { <CadastrarMedicamentos /> } />
              <Route exact path = {`/gerenciar_medicamentos/editar/${idMedicamentoSelecionado}`} element = { <EditarMedicamentos medicamento = { medicamentoSelecionado } /> } />
              <Route component = { NotFound } />

              

          </Routes>

          <Footer  dados = { especialidades }/>      

          </contextProntuarioSelecionado.Provider> 
          </contextMedicamentoSelecionado.Provider>   
          </contextComorbidadeSelecionada.Provider>        
          </contextExameSelecionado.Provider>
          </contextEspecialistaSelecionado.Provider>
          </contextEspecialidadeSelecionada.Provider>
          </contextFuncionarios.Provider>
          </contextClientes.Provider>
          </contextExamesAgendados.Provider>  
          </contextConsultas.Provider>  
          </contextConvenios.Provider>
          </contextExames.Provider>
          </contextCargos.Provider>
          </idEdicao.Provider>
          </contextBotaoLogin.Provider>
          </contextBotaoCadastrar.Provider>
          </contextUsuarioConectado.Provider>
          
                  
      </>
    </Router>      
  );
};
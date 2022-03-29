import React, { useState } from "react";

import axios from 'axios';

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom"

import styles from "./styles.module.css";

function CadastrarEspecialidades() {

    const tituloDaPagina = "Cadastrar Especialidades";

    const navigate = useNavigate();

    const dadosIniciaisDaEspecialidade = {

        nome: "",
        descricao: "",
        valor: 0,
        imagem: "",
        status: ""
    }

    const [ dadosDaEspecialidade, setDadosDaEspecialidade ] = useState( dadosIniciaisDaEspecialidade );

    function onChange(ev) {

        const { name, value } = ev.target;        

        setDadosDaEspecialidade( { ...dadosDaEspecialidade, [name]: value } );
    };

    function onSubmit(ev) {

        ev.preventDefault();

        axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades', dadosDaEspecialidade )
        
            .then( (response) => {

                alert("Especialidade cadastrada com sucesso!!");
            });
    };

    function retornaAoGerenciador() {

        navigate('/gerenciar_especialidades');
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup } >

                    <label htmlFor = "nome" > Especialidade </label>
                    <input type = "text" id = "nome" name = "nome" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "descricao"> Descrição </label>
                    <textarea id = "descricao" name = "descricao" cols = "100%" rows = "20" onChange = { onChange } >
                    
                    </textarea>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "imagem"> Imagem </label>
                    <input type = "text" id = "imagem" name = "imagem" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" onChange = { onChange } required>                    

                        <option> </option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo"> Inativo </option>                    

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type = "submit" className = { styles.botaoCadastrar } > Cadastrar </button>
                    <button type = "button" className = { styles.botaoVoltar } onClick={retornaAoGerenciador} > Cancelar </button>

                </div>

            </form>

            



        </>


    );
};

export default CadastrarEspecialidades;
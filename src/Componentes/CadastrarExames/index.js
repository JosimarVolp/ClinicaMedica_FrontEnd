import React, { useState } from "react";

import axios from 'axios';

import TituloDaPagina from "../TituloDaPagina";

import { useNavigate } from "react-router-dom";

import styles from "./styles.module.css";

function CadastrarExames() {

    const tituloDaPagina = "Cadastrar Exames / Procedimentos";

    const navigate = useNavigate();

    const dadosIniciaisDoExame = {

        nome: "",
        descricao: "",
        valor: 0,
        observacoes: "",
        imagem: "",
        status: ""
    }  
    
    const [ dadosDoExame, setDadosDoExame ] = useState( dadosIniciaisDoExame );

    const [ imagem, setImagem] = useState("");

    function onChange(ev) {

        const { name, value } = ev.target;

        setDadosDoExame( { ...dadosDoExame, [name]: value } );
    }

    function onChangeFile(ev) {

        const { name, value } = ev.target;          

        setDadosDoExame( { ...dadosDoExame, [name]: value } ); 

        setImagem(ev.target.files[0]);

        
    };

    async function onSubmit(ev) {

        ev.preventDefault();

        const formData = new FormData();
        formData.append('imagem', imagem);

        const headers = {

            "headers": {
                "Content-Type": "application/json",
            }
        }
        
        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos', dadosDoExame )
            .then( ( response ) => {
                
                //alert("Exame cadastrado com sucesso!!")

            });

        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/upload_image', formData, headers )
            .then( ( response ) => {
                    
                alert("Exame cadastrado com sucesso!!")
                navigate('/gerenciar_exames_e_procedimentos');
                
            });
    }

    function retornaAoGerenciador() {

        navigate('/gerenciar_exames_e_procedimentos');
    }

    return (

        <>

            <TituloDaPagina tituloDaPagina = { tituloDaPagina } />

            <form className = { styles.formulario } onSubmit = { onSubmit }>

                <div className = { styles.formGroup }>

                    <label htmlFor = "nome" > Nome do Exame </label>
                    <input type = "text"  id = "nome" name = "nome" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "descricao" > Descrição </label>
                    <textarea id = "descricao" name = "descricao" rows = "20" cols = "100%" onChange = { onChange }>                        

                    </textarea>

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" onChange = { onChange } />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "observacoes" >  Observações </label>
                    <textarea id = "observacoes" name = "observacoes" rows = "20" cols = "100%" onChange = { onChange }>                         

                    </textarea>

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "imagem" > Imagem </label>
                    <input type = "file" alt = "Imagem do Exame" id = "imagem" name = "imagem" onChange = { onChangeFile } required />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" onChange = { onChange }>
                
                        <option></option>
                        <option value = "ativo"> Ativo </option>
                        <option value = "inativo" > Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type="submit" className = { styles.botaoCadastrar }> Cadastrar </button>
                    <button type="button" onClick={ retornaAoGerenciador } className = { styles.botaoVoltar }> Cancelar </button>

                </div>

            </form>           

        </>
    );

};

export default CadastrarExames;
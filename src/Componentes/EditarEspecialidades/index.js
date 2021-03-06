import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";


const EditarEspecialidades = ( props ) => {

    const tituloDaPagina = "Editar Especialidade";

    const navigate = useNavigate();
   
    const [ dadosDaEspecialidade, setDadosDaEspecialidade ] = useState( {} );
        
    useEffect(() => {

        setDadosDaEspecialidade(props.especialidade);                     

    },[props.especialidade]);

    useEffect(() => {

            console.log(dadosDaEspecialidade.id);
            console.log(dadosDaEspecialidade.nome);
            console.log(dadosDaEspecialidade.descricao);
            console.log(dadosDaEspecialidade.valor);
            console.log(dadosDaEspecialidade.imagem);
            console.log(dadosDaEspecialidade.status);

    },[dadosDaEspecialidade]);

    function onChange(ev) {

        const { name, value } = ev.target;        

        setDadosDaEspecialidade( { ...dadosDaEspecialidade, [name]: value } );
    };

    const [ imagem, setImagem] = useState("");

    function onChangeFile(ev) {

        const { name, value } = ev.target;          

        setDadosDaEspecialidade( { ...dadosDaEspecialidade, [name]: value } ); 

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

        await axios.put( 'https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades', dadosDaEspecialidade )
        
            .then( (response) => {                
                
                //alert("Especialidade atualizada com sucesso!!");                         
               
            });
        
        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/upload_image', formData, headers )
            .then( (response) => {
    
                alert("Especialidade atualizada com sucesso!!");
                navigate('/gerenciar_especialidades');
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
                    <input type = "text" id = "nome" name = "nome" defaultValue = { dadosDaEspecialidade.nome} onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >
                
                    <label htmlFor = "descricao"> Descri????o </label>
                    <textarea id = "descricao" name = "descricao" cols = "100%" rows = "20" defaultValue = { dadosDaEspecialidade.descricao || '' } onChange = { onChange } >
                    
                    </textarea>

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "text" id = "valor" name = "valor" defaultValue = { dadosDaEspecialidade.valor || ''}  onChange = { onChange } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "imagem"> Imagem </label>
                    <input type = "file" id = "imagem" name = "imagem" defaultValue = { dadosDaEspecialidade.imagem }  onChange = { onChangeFile } />

                </div>

                <div className = { styles.formGroup } >

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" required value = { dadosDaEspecialidade.status } onChange = { onChange } >  

                        <option value = "ativo"> Ativo </option>                            
                        <option value = "inativo"> Inativo </option>
                        
                    
                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>
                    
                    <button type = "submit" className = { styles.botaoCadastrar } > Salvar </button>                    
                    <button type = "button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>                    

                </div>

            </form>
        </>
    );
};

export default EditarEspecialidades;
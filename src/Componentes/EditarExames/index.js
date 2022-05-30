import React, { useState, useEffect } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import TituloDaPagina from "../TituloDaPagina";

import styles from "./styles.module.css";

const EditarExames = ( props ) => {

    const tituloDaPagina = "Editar Exames / Procedimentos";  
    
    const navigate = useNavigate();

    const [ dadosDoExame, setDadosDoExame ] = useState( {} );

    const [ imagem, setImagem] = useState("");

    useEffect( ( ) => { 

        setDadosDoExame(props.exame);

    }, [props.exame]);

    useEffect( ( ) => {

        console.log(dadosDoExame.id);
        console.log(dadosDoExame.nome);
        console.log(dadosDoExame.descricao);
        console.log(dadosDoExame.observacoes);
        console.log(dadosDoExame.valor);
        console.log(dadosDoExame.status);


    }, [dadosDoExame])

    function onChange( ev ){

        const { name, value } = ev.target;

        setDadosDoExame( { ...dadosDoExame, [name]: value } );
    }

    function onChangeFile(ev) {

        const { name, value } = ev.target;          

        setDadosDoExame( { ...dadosDoExame, [name]: value } ); 

        setImagem(ev.target.files[0]);

        
    };

    async function onSubmit( ev ) {

        ev.preventDefault();

        const formData = new FormData();
        formData.append('imagem', imagem);

        const headers = {

            "headers": {
                "Content-Type": "application/json",
            }
        }

        await axios.put('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos', dadosDoExame)
        
        .then( ( res ) => {

            //alert("Exame atualizado com sucesso");
        });

        await axios.post( 'https://clinicamedica-backend.herokuapp.com/api/upload_image', formData, headers )
            .then( ( response ) => {
                    
                alert("Exame atualizado com sucesso!!")
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
                    <input type = "text"  id = "nome" name = "nome" defaultValue = { dadosDoExame.nome || ''} onChange = { onChange } />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "descricao" > Descrição </label>
                    <textarea id = "descricao" name = "descricao" rows = "20" cols = "100%" defaultValue = { dadosDoExame.descricao || '' } onChange = { onChange } >                        

                    </textarea>

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "valor" > Valor </label>
                    <input type = "number" id = "valor" name = "valor" defaultValue = { dadosDoExame.valor || '' } onChange = { onChange } />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "observacoes" >  Observações </label>
                    <textarea id = "observacoes" name = "observacoes" rows = "20" cols = "100%" defaultValue = { dadosDoExame.observacoes || '' } onChange = { onChange } >                         

                    </textarea>

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "imagem" > Imagem </label>
                    <input type = "file" alt = "Imagem do Exame" id = "imagem" name = "imagem" onChange = { onChangeFile } />

                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "status" > Status </label>
                    <select id = "status" name = "status" defaultValue = { dadosDoExame.status } onChange = { onChange } >
                
                        <option value = "Ativo" > Ativo </option>
                        <option value = "Inativo" > Inativo </option>

                    </select>

                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button type="submit" className = { styles.botaoCadastrar }> Salvar </button>
                    <button type="button" className = { styles.botaoVoltar } onClick={ retornaAoGerenciador } > Cancelar </button>

                </div>

            </form>           

        </>
    );

};

export default EditarExames;


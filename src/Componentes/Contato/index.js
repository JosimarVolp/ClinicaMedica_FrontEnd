import React from 'react';

import TituloPrincipal from "../TituloDaPagina";

import styles from './styles.module.css';

function Contato() {

    const tituloDaPagina = "Contato"
    
    return (
    
        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />

            <div className = { styles.container } >

                <p>Para entrar em contato com nossa clínica, utilize o formulário abaixo ou entre em contato através do e-mail ou pelos telefones:</p>

                <div className = {styles.contatos}>

                    <div className = { styles.telefones } >
                    
                        <p className = { styles.title }>Telefones</p>
                        
                        <ul>
                            <li>(32) 3333-3333</li>
                            <li>(32) 93333-3333 (WhatsApp)</li>
                            <li>(32) 3333-4444 (Fax)</li>
                        </ul>

                    </div>

                    <div className = { styles.email } >

                        <p className = { styles.title }>E-mail</p>

                        <ul>
                            <li>contato@clinicamedica.com</li>
                        </ul>

                    </div>

                </div>


                

            </div>
        
            <form className = { styles.formulario }>

                <div className = { styles.formGroup }>

                    <label htmlFor = "nome_completo"> Nome Completo </label>
                    <input type = "text" name = "nome_completo" id = "nome_completo" />
                 
                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "tel_contato"> Telefone </label>
                    <input type = "text" name = "tel_contato" id = "tel_contato" />
                 
                </div>

                <div className = { styles.formGroup }>

                    <label htmlFor = "email_contato"> E-mail </label>
                    <input type = "text" name = "email_contato" id = "email_contato" />
                 
                </div>

                <div className = { styles.formGroup }>

                    <textarea name="msg" rows="20" cols="100%" defaultValue = "Escreva sua mensagem aqui..." >
                    
                        

                    </textarea>
                 
                </div>

                <div className = { styles.caixaDeBotoes }>

                    <button className = { styles.botaoCadastrar } > Enviar </button>                    

                </div>




            </form>            

        </>
    );
}

export default Contato;
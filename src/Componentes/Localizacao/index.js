import React from 'react';

import TituloPrincipal from "../TituloDaPagina";

import styles from './styles.module.css';

import mapa from "../../assets/mapa.jpg";

function Localizacao() {

    const tituloDaPagina = "Localização";
    
    return (
    
        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />
        
            <div className = { styles.container }>

                <p>Nossa clínica está localizada na região central de Belo Horizonte, de fácil acesso para melhor atender nossos clientes. Confira no mapa abaixo.</p>
            
               <img className= {styles.mapa} src = {mapa} alt = "Mapa de Localização da Clínica" />

               <p><strong>Endereço:</strong></p>
               <p>Rua da Clínica Médica, 15</p>
               <p>Bairro da Clínica Médica</p>
               <p>CEP: 36000-000</p>
               <p>Belo Horizonte / MG</p>
            
            </div>

        </>
    );
}

export default Localizacao;
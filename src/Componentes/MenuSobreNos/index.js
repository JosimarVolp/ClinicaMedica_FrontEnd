import React from 'react';

import { Link } from 'react-router-dom'; 

import styles from './styles.module.css';

function MenuSobreNos( props ) { 

    return (

        <section className = { styles.menuRodape} >            

            <ul>
                
                <li className = { styles.title } > Conheça a Clínica </li>               
                
                <Link to = { "/sobre_nos" } className = { styles.link } ><li> Sobre Nós </li></Link>
                <Link to = { "/contato" } className = { styles.link } ><li> Contato </li></Link>
                <Link to = { "/localizacao" } className = { styles.link } ><li> Localização </li></Link>

            </ul>

        </section>        
    );
};

export default MenuSobreNos;
import React from 'react';

import { Link } from "react-router-dom";

import styles from './styles.module.css';

function AtalhoAgenda( props ) {

    return (

        <Link to = { props.dadosDoCard.link } className = { styles.link }>
            
            <section className={ styles.agendamento }>

                <img src = { props.dadosDoCard.imagem } alt = { props.dadosDoCard.altImagem }></img>

                <span className = { styles.tituloCard }> { props.dadosDoCard.titulo } </span>


            </section>
            
        </Link>
    );

};

export default AtalhoAgenda;


import React from 'react';

import { Link } from "react-router-dom";

import styles from "./styles.module.css";

function Card( props ) {

    return (

        

            <section className={ styles.cartao }>

                <Link className={styles.link} to = { props.dadosDoCard.link }>

                <img src= { props.dadosDoCard.imagem } alt= { props.dadosDoCard.altImagem }></img>

                </Link>
                <Link className={styles.link} to = { props.dadosDoCard.link }>

                <h2> {props.dadosDoCard.titulo } </h2>

                </Link>

            </section>

               );
};

export default Card;
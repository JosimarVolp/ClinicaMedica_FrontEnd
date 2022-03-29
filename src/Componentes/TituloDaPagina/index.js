import React from 'react';
import styles from './styles.module.css';

function TituloDaPagina( props ) {

    return (

        <div className = { styles.caixaDoTitulo }>

            <h1> { props.tituloDaPagina } </h1>

        </div>
    );
};

export default TituloDaPagina;
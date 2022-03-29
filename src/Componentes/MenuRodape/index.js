import React from 'react';

import styles from './styles.module.css';

function MenuRodape( props ) { 

    return (

        <section className = { styles.menuRodape} >            

            <ul>

                <li> { props.tituloDoMenu } </li>

                {props.itensDeMenu.map((itemDeMenu)=>(

                    <li key = { itemDeMenu.nome}> { itemDeMenu.nome } </li>
                ))}        

            </ul>

        </section>        
    );
};

export default MenuRodape;
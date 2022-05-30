import React, { useContext } from 'react';

import { Link } from 'react-router-dom'; 

import styles from './styles.module.css';

import { contextExameSelecionado } from "../../App";

function MenuExames( props ) { 

    const { idExameSelecionado, setIdExameSelecionado } = useContext(contextExameSelecionado);

    return (

        <section className = { styles.menuRodape} >            

            <ul>

                <li className = {styles.title} > Exames e Procedimentos </li>               

                {props.itensDeMenu.map((exame)=>(

                    <Link className = {styles.link} to = { `/exames_e_procedimentos/${exame.id}`} onClick = { () => setIdExameSelecionado(exame.id) } key = { exame.id}><li > { exame.nome } </li></Link>
                ))}        

            </ul>

        </section>        
    );
};

export default MenuExames;
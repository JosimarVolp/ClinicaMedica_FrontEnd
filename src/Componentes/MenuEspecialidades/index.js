import React, { useContext } from 'react';

import { Link } from 'react-router-dom'; 

import styles from './styles.module.css';

import { contextEspecialidadeSelecionada } from "../../App";

function MenuEspecialidades( props ) { 

    const { idEspecialidadeSelecionada, setIdEspecialidadeSelecionada } = useContext(contextEspecialidadeSelecionada);

    return (

        <section className = { styles.menuRodape} >            

            <ul>

                <li className={styles.title}> Especialidades </li>               

                {props.itensDeMenu.map((especialidade)=>(

                    <Link className = { styles.link } to = {`/especialidades/${especialidade.id}`} onClick = { () => setIdEspecialidadeSelecionada(especialidade.id)  } key = { especialidade.id} ><li> { especialidade.nome } </li></Link>
                ))}        

            </ul>

        </section>        
    );
};

export default MenuEspecialidades;
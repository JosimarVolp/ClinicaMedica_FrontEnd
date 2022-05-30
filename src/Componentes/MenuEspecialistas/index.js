import React, { useContext } from 'react';

import { Link } from 'react-router-dom'; 

import styles from './styles.module.css';

import { contextEspecialistaSelecionado } from "../../App";

function MenuEspecialistas( props ) { 

    const { idEspecialistaSelecionado, setIdEspecialistaSelecionado } = useContext(contextEspecialistaSelecionado);

    return (

        <section className = { styles.menuRodape} >            

            <ul>

            <li className={styles.title}> Especialistas </li>             

            {props.itensDeMenu.map((especialista)=>(

                <Link className = { styles.link } to = {`/especialistas/${especialista.cpf}`} onClick = { () => setIdEspecialistaSelecionado(especialista.cpf) } key = { especialista.cpf}><li> { especialista.nome } </li></Link>
                ))}        

            </ul>

        </section>        
    );
};

export default MenuEspecialistas;
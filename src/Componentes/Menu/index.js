import React from 'react';

import { NavLink } from "react-router-dom";

import styles from './styles.module.css';

function Menu() {

    return (

        <ul className={ styles.menu }>

            <li> 
                <NavLink className = { styles.link } to = "/"> Home </NavLink>
            </li>
            <li> 
                Especialidades
            </li>
            <li> 
                Especialistas
            </li>
            <li> 
                Exames e Procedimentos
            </li>
            <li> 
                <NavLink className = { styles.link } to = "/agendamento"> Agendamento </NavLink>
            </li>
        </ul>

    );
};

export default Menu;
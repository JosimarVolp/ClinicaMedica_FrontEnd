import React from 'react';

import { Link, NavLink } from "react-router-dom";

import Menu from '../Menu';
import styles from './styles.module.css';

function Header() {

    return (

        <header className = { styles.faixaCabecalho }>

            <nav>

            

                <Link to = "/" >
                
                    <img src = "../logo.png" alt = "Logo"></img>

                </Link>

                <div className = { styles.mobileMenu }>

                    <div className = { styles.line01 }></div>
                    <div className = { styles.line02 }></div>
                    <div className = { styles.line03 }></div>

                </div>

                <ul className={ styles.navList }>

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


            
            </nav>

        </header>

    );
};

export default Header;
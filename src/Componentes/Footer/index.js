import React, { useState, useEffect } from 'react';

import axios from 'axios';
import MenuRodape from '../MenuRodape';
import styles from './styles.module.css';

function Footer( props ) {

    const [ especialidades, setEspecialidades ] = useState([]);    

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then( ( res )=>{

            let especialidades = res.data;            
            setEspecialidades(especialidades);

        });


    }, []);

    const [ especialistas, setEspecialistas ] = useState([]);

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_medicos')
        
        .then( ( res )=> {

            let especialistas = res.data;
            setEspecialistas(especialistas);
        });

    },[]);

    const [ exames, setExames ] = useState([]);

    useEffect( ( ) => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_exames_e_procedimentos')
        
        .then( ( res ) => {

            let exames = res.data;
            setExames(exames);

        });

    },[]);

    

    const sobreNos = [ 
        
        {
            "id": 1,
            "nome": "Sobre Nós"
        }, 
        {
            "id": 2,
            "nome": "Contato"
        }, 
        {
            "id": 3,
            "nome": "Localização"
        }
    ];

    

    return (

        <footer className={ styles.areaTotalRodape }>

            <div className = { styles.areaOcupada} >
                <div className = { styles.bloco }>
                    <MenuRodape tituloDoMenu = { "Especialidades" } itensDeMenu = { especialidades } />
                </div>
                <div className = { styles.bloco }>
                    <MenuRodape tituloDoMenu = { "Especialistas" } itensDeMenu = { especialistas }/>
                </div>
                <div className = { styles.bloco }>
                    <MenuRodape tituloDoMenu = { "Exames e Procedimentos" } itensDeMenu = { exames }/>
                </div>
                <div className = { styles.bloco }>
                    <MenuRodape tituloDoMenu = { "Conheça a Clínica" } itensDeMenu = { sobreNos }/>
                </div>                
                
            </div>

        </footer>

    );
};

export default Footer;

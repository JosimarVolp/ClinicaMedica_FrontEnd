import React, { useState, useEffect } from 'react';

import axios from 'axios';
import MenuEspecialidades from '../MenuEspecialidades';
import MenuEspecialistas from '../MenuEspecialistas';
import MenuExames from '../MenuExames';
import MenuSobreNos from '../MenuSobreNos';

import styles from './styles.module.css';

function Footer( props ) {

    const [ especialidades, setEspecialidades ] = useState([]);    

    useEffect( () => {

        axios.get('https://clinicamedica-backend.herokuapp.com/api/gerenciar_especialidades')
        
        .then( ( res )=>{

            let especialidadesTemp = res.data;            
            setEspecialidades(especialidadesTemp);

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

    return (

        <footer className={ styles.areaTotalRodape }>

            <div className = { styles.areaOcupada} >
                <div className = { styles.bloco }>
                    <MenuEspecialidades itensDeMenu = { especialidades } />
                </div>
                <div className = { styles.bloco }>
                    <MenuEspecialistas tituloDoMenu = { "Especialistas" } itensDeMenu = { especialistas }/>
                </div>
                <div className = { styles.bloco }>
                    <MenuExames itensDeMenu = { exames }/>
                </div>
                <div className = { styles.bloco }>
                    <MenuSobreNos />
                </div>                
                
            </div>

        </footer>

    );
};

export default Footer;

import React from 'react';

import styles from './styles.module.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Carrossel() {    

    return (

       <section className={styles.carrossel}>

        <Carousel className= {styles.mainSlider} infiniteLoop useKeyboardArrows autoPlay showThumbs = {false} width = "100%" showStatus = {false}>
            <div>
            <img src = "imagens/clinica_externo.jpg" alt = "Clínica - Área Externa" className= {styles.img} height = "250px"></img>
                
            </div>
            <div>
            <img src = "imagens/clinica_consultorio.jpg" alt = "Clínica - Consultóro" className= {styles.img} height = "250px"></img>
                
            </div>
            <div>
            <img src = "imagens/clinica_recepcao.jpg" alt = "Clínica - Recepção" className= {styles.img} height = "250px"></img>
                
            </div>
        </Carousel>
        </section>
    );

};

export default Carrossel;
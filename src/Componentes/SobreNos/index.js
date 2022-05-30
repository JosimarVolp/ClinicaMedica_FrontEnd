import React from 'react';

import TituloPrincipal from "../TituloDaPagina";

import styles from './styles.module.css';

function SobreNos() {

    const tituloDaPagina = "Sobre Nós"
    
    return (
    
        <>

            <TituloPrincipal tituloDaPagina = { tituloDaPagina } />
        
            <div className = { styles.container }>

                <img className = {styles.imagemExterna } src = "imagens/clinica_externo.jpg" alt = "Vista externa da Clínica Médica" />
            
                <p> Fundada em 1995, a Clínica Médica foi idealizada por dois irmãos médicos, recém dormado, da cidade de Belo Horizonte. Eles se uniram com o ideal de proporcionar consultas a preços mais acessíveis para a população mais carente</p>
                <p>Com o passar dos anos, fomos aumentando nossa estrutura, para podermos atender melhor nossos clientes. Hoje atendemos várias especialidades e realizamos vários tipos de exames e procedimentos. Temos também o melhor time de funcionários, contando com profissionais renomados nacionalmente.</p>
            
                <p>Nossa missão é oferecer atendimento médico humanizado e de qualidade a preços justos e acessíveis.</p>

                <p>Nossa visão é democratizar, por meio da inclusão e sustentabilidade, o acesso aos cuidados em saúde, bem como promover condições favoráveis ao exercício da Medicina pautada em valores humanos e éticos.</p>

                <p>Nossos valores são pessoas sempre em primeiro lugar – elas são a razão da existência de qualquer estabelecimento de saúde. Ética – a base de qualquer relação bem-sucedida.</p>
            </div>

        </>
    );
}

export default SobreNos;
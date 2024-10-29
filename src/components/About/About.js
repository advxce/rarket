import React from 'react';
import './About.css'

function About(props) {
    return (
        <div style={{display:"flex",
            height:"70vh",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"space-around"}}>
            <text>Разработан учащимся группы 381570 Позняком Дмитрием Александровичем</text>
            <br></br>
            <text>03.10.2024</text>
            <br></br>
            <text>В данном приложении представлен каталог продуктовых товаров,
                которые вы можете выбрать и добавить в вашу корзину
            </text>
        </div>
    );
}

export default About;
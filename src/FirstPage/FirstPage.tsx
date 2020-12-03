import React from 'react';
import s from './FirstPage.module.css'
import invoice from '../assets/img/invoiceSvg.svg'
import welcome from '../assets/img/welcome.svg'


const FirstPage = () => {


    return (
        <div className={s.wrapp}>
            <img className={s.img} src={welcome} alt={''}/>
        </div>
    );
};

export default FirstPage;

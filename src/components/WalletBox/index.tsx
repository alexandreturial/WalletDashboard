import React, { useMemo } from 'react';

import CountUp from 'react-countup';
 

import doloarImg from '../../assets/dollar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

import {Container} from './styles';

interface IWalletBoxProps{
    title: string;
    amount: number;
    footerLabel: string;
    icon: 'dolar' | 'arrowUp' | 'arrowDown';
    color: string; 
}

const WalletBox: React.FC<IWalletBoxProps> =({
    title
    ,amount
    ,footerLabel
    ,icon
    ,color
 
}) =>{

    const iconSelectd = useMemo(() =>{

        switch (icon) {
            case 'dolar':
                return doloarImg;
            case 'arrowUp':
                return arrowUpImg;
            case 'arrowDown':
                return arrowDownImg;
            default:
                return undefined;
        }
    },[icon]) 

    return(
        <Container color={ color }>
            <span>{title}</span>
           
            <h1>
            <strong>R$ </strong>
                <CountUp
                end={amount}
                delay={0}
                separator="."
                decimal=","
                decimals={2}
                />
            </h1>
            
            
            <small>{footerLabel}</small>
            <img src={iconSelectd} alt={title}/>
        </Container>
    );
}

export default WalletBox;
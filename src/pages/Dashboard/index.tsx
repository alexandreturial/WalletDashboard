import React, { useState, useMemo, useCallback } from 'react';

import ContentHeader from '../../components/contentHearder'
import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox'
import MessageBox from '../../components/MessageBox';
import PieChartBox from '../../components/PieChart';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import gains from '../../repositories/gains';
import expense from '../../repositories/expenses';

import listOfMonths from '../../utils/months';

import happyImg from '../../assets/happy.svg';
import SadImg from '../../assets/sad.svg';
import grinning from '../../assets/grinning.svg';

import { Container, Content } from './styles' 

const Dashboard: React.FC = () => {
    const [monthSlected, setMonthSlected] = useState<number>(new Date().getMonth() +1);
    const [yearSlected, setYearSlected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() =>{
        let uniqueYears: number[] =[];

        
        [...expense, ...gains].forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year);
            }
        });

        return uniqueYears.map(year => {
            return {
                value: year,
                label: year
            }
        })
    },[]);

    const months = useMemo(() =>{

        return listOfMonths.map((month, index) =>{
            return {
                value: index + 1,
                label: month
            }
        });
    },[]);

    const totalExpense = useMemo(()=>{
        let total: number = 0;

        expense.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth()+1;
            if(month === monthSlected && year === yearSlected){
                try {
                    total += Number(item.amount);
                } catch{
                    throw new Error('invalid amount! Amount must be number');
                }
            }
        })

        return total;
    },[monthSlected, yearSlected])
    
    const totalGains = useMemo(() =>{
        let total = 0;

        gains.forEach(item =>{
            const data = new Date(item.date);
            const year = data.getFullYear();
            const month = data.getMonth() +1;
            
            if(year === yearSlected && month === monthSlected){
               try {
                total += Number(item.amount);
               } catch {
                   throw new Error('invalid amount! Amount must be number')
               }
            }
        })

        return total;
    },[yearSlected, monthSlected])

    const totalBlance = useMemo(() =>{

        return  totalGains - totalExpense;

    },[totalExpense, totalGains]);

    const message = useMemo(() =>{
        if(totalBlance < 0){
            return {
                description:"Neste mês, você gastou mais do que deveria",
                footerText:"Verifique seus gastos e tente cortar algumas coisas desnecessárias",
                icon:SadImg,
                title:"Que triste!"
            }
        }else if(totalExpense === 0 && totalGains === 0){
            return {
                description:"Neste mês não há registros de entradas ou saidas",
                footerText:"Ops!",
                icon:happyImg,
                title:"Uffa!"
            }
        }else if(totalBlance === 0){
            return {
                description:"Neste mês você gastou exatamente o que ganhou",
                footerText:"Tenha cuidado. No próximo mês tente poupar o seu dinheiro",
                icon:grinning,
                title:"Uffa!"
            }
        }else{
            return {
                description:"Sua carteira está positiva",
                footerText:"Continue assim. Considere inverstir o seu saldo",
                icon:happyImg,
                title:"Muito bem!"
            }
        }
    },[totalBlance, totalExpense, totalGains])

    const relatinExpansesVersusGains = useMemo(() =>{
        const total = totalGains + totalExpense;
       
            const gainsPercent = Number(((totalGains/total) * 100).toFixed(1));

            const expensePercent = Number(((totalExpense/total) * 100).toFixed(1));
            
        const data = [
            {
                name: "Entradas",
                value: totalGains,
                percent: gainsPercent ? gainsPercent : 0,
                color: "#E44C4E",
            },
            {
                name: "Saídas",
                value: totalExpense,
                percent: expensePercent ? expensePercent : 0,
                color: "#F7931B",
            },

        ];
        return data;
    },[totalGains, totalExpense]);

    const historyData = useMemo(() =>{
        return listOfMonths
        .map((_, month) =>{
            let amountEntry = 0;
            gains.forEach(gain =>{
                const date = new Date(gain.date);
                const gainsMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(gainsMonth === month && expenseYear === yearSlected){
                    try{
                        amountEntry += Number(gain.amount);
                    }catch{
                        throw new Error('amountEntry is invalid. AmountEntry must be valid number.')
                    }

                
                }
            });
            let amountOutput = 0;
            expense.forEach(expense =>{
                const date = new Date(expense.date);
                const expensesMonth = date.getMonth();
                const expenseYear = date.getFullYear();

                if(expensesMonth === month && expenseYear === yearSlected){
                    try{
                        amountOutput += Number(expense.amount);
                    }catch{
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }

                
                }
            });


            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput
            }

        })
        .filter(item => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            
            return (yearSlected === currentYear && item.monthNumber <= currentMonth ) || (yearSlected < currentYear )

        });
    },[yearSlected]);

    const relationExpenseRecurrrentVersusEventual = useMemo(() =>{
        let amountRecurrent = 0;
        let amountEventual = 0;

        expense
        .filter((expense) =>{
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; 
              
            
            return month === monthSlected && year === yearSlected;
        }).forEach((expense) =>{
            if(expense.frequency === 'recorrente'){
                amountRecurrent += Number(expense.amount);
            }
            if(expense.frequency === 'eventual'){
                amountEventual += Number(expense.amount);
            }

        });
        const total = amountRecurrent + amountEventual;
        
        const percentRecurrent = Number(((amountRecurrent/total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual/total) * 100).toFixed(1));

        const data = [
            {
              name: "Recorrente",
              amount: Number(amountRecurrent),
              percent: percentRecurrent ? percentRecurrent : 0,
              color: "#F7931B"    
            },
            {
                name: "Eventual",
                amount: Number(amountEventual),
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"    
            }
        ];
        return data;
    },[monthSlected, yearSlected]);

    const relationGainsRecurrrentVersusEventual = useMemo(() =>{
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains
        .filter((gain) =>{
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; 
              
            
            return month === monthSlected && year === yearSlected;
        }).forEach((gain) =>{
            if(gain.frequency === 'recorrente'){
                amountRecurrent += Number(gain.amount);
            }
            if(gain.frequency === 'eventual'){
                amountEventual += Number(gain.amount);
            }

        });
        const total = amountRecurrent + amountEventual;
        
        const percentRecurrent = Number(((amountRecurrent/total) * 100).toFixed(1));

        const percentEventual = Number(((amountEventual/total) * 100).toFixed(1));

        const data = [
            {
              name: "Recorrente",
              amount: Number(amountRecurrent),
              percent: percentRecurrent ? percentRecurrent : 0,
              color: "#F7931B"    
            },
            {
                name: "Eventual",
                amount: Number(amountEventual),
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"    
            }
        ];
        return data;
    },[monthSlected, yearSlected]);

    const handleMonthSelected = useCallback((month: string ) =>{
        try{
            const parseMonth = Number(month);
            setMonthSlected(parseMonth);
        }catch(error){
            throw new Error('invalide month value accept 0-24.');
        }
    },[])

    const handleYearSelected = useCallback((year: string ) =>{
        try{
            const parseYear = Number(year);
            setYearSlected(parseYear);
        }catch(error){
            throw new Error('invalide year value accept interger numbers.');
        }
    },[])

    return(
        <Container>
            <ContentHeader title="Dashborad" lineColor="#F7931B">
                <SelectInput 
                    options={months} 
                    defaultValue={monthSlected} 
                    onChange={(e) => handleMonthSelected(e.target.value)}
                />
                <SelectInput 
                    options={years} 
                    defaultValue={yearSlected} 
                    onChange={(e) => handleYearSelected(e.target.value)}
                />
            </ContentHeader>
            <Content>
                <WalletBox 
                title="Saldo"
                amount={totalBlance}
                footerLabel="atualizado com base nas entradas e saidas"
                icon="dolar"
                color="#4E41F0"   
            />
            <WalletBox 
                title="Entradas"
                amount={totalGains}
                footerLabel="atualizado com base nas entradas e saidas"
                icon="arrowUp"
                color="#F7931B"     
            />
            <WalletBox 
                title="Saídas"
                amount={totalExpense}
                footerLabel="atualizado com base nas entradas e saidas"
                icon="arrowDown"
                color="#E44C4E"  
            />
            <MessageBox
                description={message.description}
                footerText={message.footerText}
                icon={message.icon}
                title={message.title}
            />
            <PieChartBox data={relatinExpansesVersusGains}/>
            <HistoryBox
            data={historyData}
            lineColorAmountEntry="#F7931B"
            lineColorAmountOutput="#E44C4E"
            ></HistoryBox>

            <BarChartBox 
                data={relationExpenseRecurrrentVersusEventual}
               title="Saídas"
            />

            <BarChartBox 
                data={relationGainsRecurrrentVersusEventual}
               title="Entradas"
            />

            </Content>
        </Container>
    );
}

export default Dashboard;
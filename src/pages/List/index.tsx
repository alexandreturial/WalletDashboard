import React, { useMemo, useState, useEffect } from 'react';
import { uuid } from 'uuidv4';

import ContentHeader from '../../components/contentHearder';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard'

import gains from '../../repositories/gains';
import expense from '../../repositories/expenses';

import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import listOfMonths from '../../utils/months';

import {Container, Content, Filters} from './styles';


interface IRouteParams{
    match:{
        params:{
            type:string;
        }
    }
}

interface Idata{
    id: string;
    description: string;
    amountFormatted: string;
    type: string;
    frequency: string;
    dateFormatted: string;
    tagColor: string;

}

const List: React.FC<IRouteParams> = ({ match }) =>{
    //Estados
    const [data, setData] = useState<Idata[]>([]);
    const [monthSlected, setMonthSlected] = useState<number>(new Date().getMonth() +1);
    const [yearSlected, setYearSlected] = useState<number>(new Date().getFullYear());
    const [frenquencyFilterSelect, setFrenquencyFilterSelect] = useState<string[]>(['recorrente', 'eventual']);

    const  moviemntType  = match.params.type;

    const pageData = useMemo(() => {
        return( moviemntType === 'entry-balance' ) ?
            {
                title:'Entradas' ,
                lineColor:'#F7931B',
                data: gains,
            }
        :
            {
                title:'Saídas' ,
                lineColor:'#E44C4E',
                data: expense,
            } 
        
    },[moviemntType])

    const years = useMemo(() =>{
        let uniqueYears: number[] =[];

        const { data } = pageData;
        
        data.forEach(item => {
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
    },[pageData]);

    const months = useMemo(() =>{

        return listOfMonths.map((month, index) =>{
            return {
                value: index + 1,
                label: month
            }
        });
    },[]);

    const handleFrenquencyClick = (frequency: string)=>{
        const alreadySelected = frenquencyFilterSelect.findIndex(item => item === frequency);
        

        if(alreadySelected >= 0){
            const filtered = frenquencyFilterSelect.filter(item => item !== frequency);
            setFrenquencyFilterSelect(filtered);
            
        }else{
            setFrenquencyFilterSelect((prev) => [...prev, frequency]);
        }
    
    }

    const handleMonthSelected = (month: string ) =>{
        try{
            const parseMonth = Number(month);
            setMonthSlected(parseMonth);
        }catch(error){
            throw new Error('invalide month value accept 0-24.');
        }
    }

    const handleYearSelected = (year: string ) =>{
        try{
            const parseYear = Number(year);
            setYearSlected(parseYear);
        }catch(error){
            throw new Error('invalide year value accept interger numbers.');
        }
    }


    useEffect(()=>{

        const { data } = pageData;

            const filteredDate = data.filter(item => {
            const date = new Date(item.date);
            const month = (date.getMonth() + 1);
            const year = date.getFullYear();


            return month === monthSlected && year === yearSlected && frenquencyFilterSelect.includes(item.frequency);
        });

        const formatedData = filteredDate.map(item => {


            return {
                id: uuid(),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                type: item.type,
                frequency: item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E' 
            }
        })

        setData(formatedData); 
    },[pageData, monthSlected, yearSlected, data.length, frenquencyFilterSelect]);


    return(
       <Container> 
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} defaultValue={monthSlected} onChange={(e) => handleMonthSelected(e.target.value)}/>
                <SelectInput options={years} defaultValue={yearSlected} onChange={(e) => handleYearSelected(e.target.value)}/>
            </ContentHeader>
            <Filters>
                <button 
                type="button"
                className={
                    `
                    tag-filter 
                    tag-filter-recurrent
                    ${frenquencyFilterSelect.includes('recorrente') && 'tag-actived'}
                `}
                onClick={() => handleFrenquencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button 
                type="button"
                className={`
                    tag-filter 
                    tag-filter-eventual
                    ${frenquencyFilterSelect.includes('eventual') && 'tag-actived'}
                `}
                onClick={() => handleFrenquencyClick('eventual')}
                >
                    Eventuais
                </button>

            </Filters>
            <Content>
                { 
                    data.map(item =>(
                    <HistoryFinanceCard
                        key={item.id}
                        tagColor={item.tagColor}
                        amount={item.amountFormatted}
                        title={item.description}
                        subtitle={item.dateFormatted}
                    />  

                    ))
               
                }
            </Content>  
        </Container>    
    );

}

export default List;
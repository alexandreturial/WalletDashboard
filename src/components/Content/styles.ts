import styled from 'styled-components';

export const Container = styled.div`
    grid-area: CT;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.primary};
    
    padding: 1.6rem;

    height: calc(100vh - 70px);
    overflow-y: scroll;
    
    ::-webkit-scrollbar{
        width: 10px;
    }
    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secundary};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-track{
        background-color:${props => props.theme.colors.tertiary};
        
    }

`;
import styled, { css } from 'styled-components';

interface IContainerProps{
    menuIsOpen: boolean;
}   

interface IThemeToggloeFooterProps{
    menuIsOpen: boolean;
}

export const Container = styled.div<IContainerProps>`
    grid-area: AS;
    background-color: ${props => props.theme.colors.secundary};

    padding-left: 1.2rem;
    border-right: 1px solid ${props => props.theme.colors.gray};

    position: relative;

    @media(max-width: 600px){
        padding-left: 7px;
        position: fixed;
        z-index: 2;
        
        width: 170px;
        

        height: ${props => props.menuIsOpen ? '100vh' : '70px;'};
        overflow: hidden;
        ${props => !props.menuIsOpen && css `
            border: none;
            border-bottom: 1px solid ${props => props.theme.colors.gray};
        
        `};
    }   
`;

export const Header = styled.header`
    height: 70px;
    display: flex;
    align-items: center;
   
    
    
`;

export const LogoImg = styled.img`
    height: 2.5rem;
    width: 2.5rem;

    @media(max-width: 600px){
       display: none;
        
    }  
`;

export const Title = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-left: 1.1rem;
    
    @media(max-width: 600px){
        display: none;
        
    }  

`;

export const MenuContainer = styled.nav`
    display: flex;
    flex-direction: column;
    margin-top: 3rem;
    

`;

export const MenuItemLink = styled.div`
    color: ${props => props.theme.colors.info};
    text-decoration: none;

    display: flex;
    align-items: center;

    margin: 0.5rem 0;

    transition: opacity .2s;
    &:hover{
        opacity: 0.7;
    }

    > svg{
        font-size: 1.2rem;
        margin-right: 0.4rem;
    }
    > Link{
        text-decoration: none;
    }
`;

export const MenuItemButton= styled.div`
    color: ${props => props.theme.colors.info};
    text-decoration: none;

    display: flex;
    align-items: center;

    margin: 0.5rem 0;

    transition: opacity .2s;
    &:hover{
        opacity: 0.7;
    }

    > svg{
        font-size: 1.2rem;
        margin-right: 0.4rem;
    }
    > Link{
        text-decoration: none;
    }
`;
export const ToggleMenu = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 5px;

    font-size: 22px;
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.warning};

    transition: opacity 0.3s;
    &:hover{
        opacity: 0.7;
    }

    display: none;
   
    justify-content: center;
    align-items: center;

    @media(max-width: 600px){
        display: felx;
    }
`;

export const ThemeToggloeFooter = styled.footer<IThemeToggloeFooterProps>`
    display: none;
    position: absolute;
    bottom: 30px;

    @media(max-width: 470px){
        display: ${props => props.menuIsOpen ? 'flex' : 'none'};
    }

`;




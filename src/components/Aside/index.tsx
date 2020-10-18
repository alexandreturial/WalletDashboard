import React, {useState} from 'react';
import {Link} from 'react-router-dom'

import Toggle from '../Toogle'

import { useAuth } from '../../hooks/Auth'
import { useTheme } from '../../hooks/Theme'

import { Container, 
   Header, 
   LogoImg,
   MenuContainer,
   MenuItemLink,
   Title,
   ToggleMenu,
   ThemeToggloeFooter
} from './styles';

import {
      MdDashboard,
      MdArrowDownward,
      MdArrowUpward,
      MdExitToApp,
      MdClose,
      MdMenu
} from 'react-icons/md';

import logoimg from '../../assets/logo.svg'

const Aside: React.FC = () => {
   const { toggleTheme, theme } = useTheme();
   const { signOut } = useAuth();


   const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
   const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

   const handletoggleMenu = () =>{
      setToggleMenuIsOpened(!toggleMenuIsOpened)
   }

   const handleChangeTheme = () =>{
      setDarkTheme(!darkTheme);
      toggleTheme();
   }
   
    return(
       <Container menuIsOpen={toggleMenuIsOpened}>
          <Header>
             <ToggleMenu onClick={handletoggleMenu}>
               {toggleMenuIsOpened ? <MdClose/> : <MdMenu/>}
             </ToggleMenu>

             <LogoImg src={logoimg} alt="logo Minha cartiera"/>
             <Title>Minha cartiera</Title>
          </Header>
          <MenuContainer>
            <Link to="/">
               <MenuItemLink >
                  <MdDashboard/>
                     Dashborad
               </MenuItemLink>
            </Link>
            <Link to="/list/entry-balance">
               <MenuItemLink>
                  <MdArrowUpward/>
                     Endradas
               </MenuItemLink>
            </Link>
            <Link to="/list/exit-balance" >
               <MenuItemLink>
                     <MdArrowDownward/>
                        Saídas
               </MenuItemLink>
            </Link>
             <Link onClick={signOut} to="/" >
               <MenuItemLink>
                  <MdExitToApp/>
                     Sair  
               </MenuItemLink>        
             </Link>
          </MenuContainer>

          <ThemeToggloeFooter menuIsOpen={toggleMenuIsOpened}>
            <Toggle
               checked={darkTheme}
               labelLeft="Light"
               labelRight="Right"
               onChange={handleChangeTheme}
            />
          </ThemeToggloeFooter>
       </Container>
    );
}

export default Aside;
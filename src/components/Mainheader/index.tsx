import React, {useMemo, useState} from 'react';
import emojis from '../../utils/emojis';
import Toggle from '../Toogle'

import { Container
   , Profile
   , Welcome
   , UserName} from './styles';

import { useTheme } from '../../hooks/Theme';

const MainHeader: React.FC = () => {
   const { toggleTheme, theme } = useTheme();

   const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

   const handleChangeTheme = () =>{
      setDarkTheme(!darkTheme);
      toggleTheme();
   }

   const emoji = useMemo(() =>{
      const indice = Math.floor(Math.random() * emojis.length)
      return emojis[indice];
   },[]);

    return(
       <Container>
          <Toggle
            checked={darkTheme}
            labelLeft="Light"
            labelRight="Right"
            onChange={handleChangeTheme}
         />

          <Profile>
            <Welcome>Olá, {emoji}</Welcome>
            <UserName>Alexande</UserName>
          </Profile>
       </Container>
    );
}

export default MainHeader;
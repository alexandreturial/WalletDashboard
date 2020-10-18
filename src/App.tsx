import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlocalStyles from './styles/global';

import Routes from './Routes'

import { useTheme } from './hooks/Theme';

const App: React.FC = () => {
    const {theme} = useTheme();
    

    return(
        <ThemeProvider theme={theme}>
        <GlocalStyles/>
            <Routes/>
        </ThemeProvider>
    );
}

export default App;
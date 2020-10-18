import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        title: string,
    
        colors:{
            primary: string,
            secundary: string,
            tertiary: string,
            
            white: string          
            balck:string          
            gray:string,
    
            success:string,
            info:string,
            warning:string
        },    
    }
}
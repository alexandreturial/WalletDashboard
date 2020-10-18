import React, {useState} from 'react';

import Input from '../../components/input';
import Button from '../../components/button';

import logoImg from '../../assets/logo.svg';

import { useAuth } from '../../hooks/Auth';

import { Container, 
    Logo, 
    Form, 
    FormTitle } from './styles';

const SingIn: React.FC = () =>{
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { signIn } = useAuth();

    return(
        <Container>
            <Logo>
                <img src={logoImg} alt="Minha Carteira"/>
                <h2>Minha Carteira</h2>
            </Logo>
            <Form onSubmit={()=> signIn(email, password)} >
                <FormTitle>
                   Entrar
                </FormTitle>
                <Input 
                    type="email" 
                    required
                    placeholder="e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                    type="password" 
                    required
                    placeholder="senha"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit">
                    Acessar
                </Button>
            </Form>
          
        </Container>
    );
}

export default SingIn;
import React from 'react';

import { Container, ToggleLabel,ToggleSelector } from './styles';

interface IToogleProps{
    labelLeft: string;
    labelRight: string;
    checked: boolean;
    onChange(): void;
}

const Toogle: React.FC<IToogleProps> = ({
    labelLeft,
    labelRight,
    checked,
    onChange
}) => (
       <Container>
            <ToggleLabel>{labelLeft}</ToggleLabel>
            <ToggleSelector
                checked={checked}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={onChange}

            ></ToggleSelector>
            <ToggleLabel>{labelRight}</ToggleLabel>

       </Container>
);

export default Toogle;
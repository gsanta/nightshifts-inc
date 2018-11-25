import { Button } from 'react-bootstrap';
import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';

const ButtonStyled = styled(Button)`
    height: 30px;
    border-radius: 0;
    background-color: ${colors.Blue};
    line-height: 1;
`;

export const SmallButton = (props: SmallButtonProps) => {
    return (
        <ButtonStyled onClick={props.onClick}>{props.children}</ButtonStyled>
    );
};

export interface SmallButtonProps {
    onClick(): void;
    children: string;
}

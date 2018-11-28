import { Button } from 'react-bootstrap';
import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';

const ButtonStyled: any = styled(Button)`
    height: 30px;
    border-radius: 0;
    background-color: ${colors.Blue};
    line-height: 1;
`;

export class SmallButton extends React.Component<SmallButtonProps, {}> {

    public render() {
        return (
            <ButtonStyled
                onClick={this.props.onClick}
                >
                {this.props.children}
            </ButtonStyled>
        );
    }
}

export interface SmallButtonProps {
    onClick(): void;
    children: string;
}

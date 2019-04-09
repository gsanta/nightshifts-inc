import { Button } from 'react-bootstrap';
import * as React from 'react';
import styled from 'styled-components';
import colors from '../colors';

const ButtonStyled: any = styled(Button)`
    height: 30px;
    border-radius: 0;
    background-color: ${colors.Blue};
    line-height: 1;

    &:disabled {
        color: white;
        cursor: not-allowed;
    }
`;

export class SmallButton extends React.Component<SmallButtonProps, {}> {

    public static defaultProps: Partial<SmallButtonProps> = {
        isDisabled: false
    };

    public render() {
        return (
            <ButtonStyled
                onClick={this.props.onClick}
                disabled={this.props.isDisabled}
            >
                {this.props.children}
            </ButtonStyled>
        );
    }
}

export interface SmallButtonProps {
    onClick(): void;
    children: string;
    isDisabled?: boolean;
}

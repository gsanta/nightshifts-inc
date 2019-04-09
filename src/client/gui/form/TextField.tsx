import { TextField } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import colors from '../colors';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    height: 78px;
`;

const ErrorLabel = styled.div`
    color: ${colors.Red};
    font-size: 12px;
    margin-top: 2px;
`;

const TextFieldStyled: React.SFC<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <Wrapper>
            <TextField
                error={props.hasError}
                label={props.label}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                variant="outlined"
                type={props.type}
            />
            <ErrorLabel>{props.errorMessage}</ErrorLabel>
        </Wrapper>
    );
};

TextFieldStyled.defaultProps = {
    errorMessage: null,
    hasError: false
};

export interface TextFieldProps {
    value: string;
    onChange: (newValue: string) => void;
    label: string;
    type?: string;
    classes: any;
    hasError: boolean;
    errorMessage?: string;
}

export default TextFieldStyled;

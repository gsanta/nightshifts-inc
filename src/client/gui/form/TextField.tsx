import { withStyles, TextField, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';

const styles = {
    input: {
        paddingTop: '8px',
        paddingBottom: '5px'
    },
    inputLabel: {
        color: 'red',
        transform: 'translate(14px, -6px) scale(0.75)'
    }
};

const Label = styled.span`
  font-size: 15px;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    height: 78px;
`;

const ErrorLabel = styled.div`
    color: ${colors.Red};
    font-size: 12px;
`;

const TextFieldStyled = (props: TextFieldProps) => {
    return (
        <Wrapper>
            <TextField
                error={props.errorMessage !== null}
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

export interface TextFieldProps {
    value: string;
    onChange: (newValue: string) => void;
    label: string;
    type?: string;
    classes: any;
    errorMessage?: string;
}

export default withStyles(styles)(TextFieldStyled);

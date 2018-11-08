import { withStyles, TextField, InputLabel } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';

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
    margin-bottom: 10px;
`;

const TextFieldStyled = (props: TextFieldProps) => {
    return (
        <Wrapper>
            <TextField
                label={props.label}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                variant="outlined"
                type={props.type}
            />
        </Wrapper>
    );
};

export interface TextFieldProps {
    value: string;
    onChange: (newValue: string) => void;
    label: string;
    type?: string;
    classes: any;
}

export default withStyles(styles)(TextFieldStyled);

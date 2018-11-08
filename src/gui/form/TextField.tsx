import { withStyles, TextField } from '@material-ui/core';
import * as React from 'react';

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


const TextFieldStyled = (props: TextFieldProps) => {
    console.log(props.classes.input)
    return (
        <TextField
            style={{marginTop: props.topMargined ? '10px' : '0px'}}
            value={props.value}
            onChange={(event) => props.onChange(event.target.value)}
            variant="outlined"
            label={props.label}
            type={props.type}
            InputLabelProps={{
                className: props.classes.inputLabel,
                margin: 'dense'
            } as any}
            inputProps={{
                className: props.classes.input
            }}
        />
    );
};

export interface TextFieldProps {
    topMargined?: boolean;
    value: string;
    onChange: (newValue: string) => void;
    label: string;
    type?: string;
    classes: any;
}

export default withStyles(styles)(TextFieldStyled);

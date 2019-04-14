

import { withStyles, FormControl, InputLabel, FilledInput } from '@material-ui/core';
import * as React from 'react';
import styled from 'styled-components';
import colors from '../../../colors';

const styles = () => ({
    cssUnderline: {
        '&:after': {
          borderBottomColor: colors.MainTextGray
        }
    },
    cssLabel: {
        '&$focused': {
          color: 'yellow'
        }
    }
});

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    height: 78px;
    width: 300px;
`;

const ErrorLabel = styled.div`
    color: ${colors.Red};
    font-size: 12px;
    margin-top: 2px;
`;

const TextFieldStyled: React.SFC<TextFieldProps> = (props: TextFieldProps) => {
    return (
        <Wrapper>
            <FormControl error={props.hasError} disabled={props.disabled} variant="filled">
                <InputLabel
                    htmlFor="component-filled"
                    classes={{
                        root: props.classes.cssLabel
                    }}
                >
                    {props.label}
                </InputLabel>
                <FilledInput
                    id="component-filled"
                    value={props.value}
                    onChange={(event) => props.onChange(event.target.value)}
                    type="text"
                    classes={{
                        underline: props.classes.cssUnderline,
                    }}
                />
            </FormControl>
            <ErrorLabel>{props.errorMessage}</ErrorLabel>
        </Wrapper>
    );
};

TextFieldStyled.defaultProps = {
    errorMessage: null,
    hasError: false,
    disabled: false
};

export interface TextFieldProps {
    value: string;
    onChange: (newValue: string) => void;
    label: string;
    hasError: boolean;
    errorMessage?: string;
    disabled?: boolean;
    classes?: any;
}

export default withStyles(styles)(TextFieldStyled);

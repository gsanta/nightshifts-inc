import * as React from 'react';
import styled from 'styled-components';
import { ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import colors from '../colors';

const ControlLabelStyled = styled(ControlLabel)`
    font-size: 12px;
    margin-bottom: 0;
`;

const FormControlStyled = styled(FormControl)`
    height: 25px;
    border-radius: 0;
    width: 300px;
    margin-bottom: 2px;
    color: black;
    background-color: ${colors.LightBlue};
    border: 1px solid ${colors.LightBlue};

    &:focus {
        box-shadow: none;
        color: black;
        background-color: ${colors.LightBlue};
        border: 1px solid ${colors.Blue};
    }
`;

const HelpBlockStyled = styled(HelpBlock)`
    font-size: 12px;
    color: ${colors.Red};
    height: 20px;
    display: block;
`;

export const SettingsInputField: React.SFC<SettingsInputFieldProps> = (props: SettingsInputFieldProps) => {
    return (
        <React.Fragment>
            <ControlLabelStyled>{props.label}</ControlLabelStyled>
            <FormControlStyled
                type={props.type}
                value={props.value}
                onChange={(e: React.ChangeEvent<any>) => props.onChange(e.target.value)}
            />
            <FormControl.Feedback />
            <HelpBlockStyled>{props.errorMessage}</HelpBlockStyled>
        </React.Fragment>
    );
};

SettingsInputField.defaultProps = {
    type: 'text',
    errorMessage: ''
};

export interface SettingsInputFieldProps {
    type: 'text' | 'password';
    label: string;
    value: string;
    onChange(newVal: string);
    hasError: boolean;
    errorMessage?: string;
}


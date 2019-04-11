import * as React from 'react';
import TextField from '../../../components/form_elements/text_field/TextField';
import { ErrorMessage } from '../../../ErrorMessage';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../form_elements/Button';
import _ = require('lodash');

const PasswordUpdateSectionStyled = styled.div`
    display: flex;
`;

const TextFieldGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

export const PasswordUpdateSection = (props: PasswordUpdateSectionProps) => {

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const oldPasswordError = _.find(props.errors, error => error.properties.indexOf('oldPassword') !== -1);

    return (
        <PasswordUpdateSectionStyled>
            <TextFieldGroupStyled>
                <TextField
                    label="Old password"
                    value={oldPassword}
                    onChange={password => setOldPassword(password)}
                    hasError={!!oldPasswordError}
                    errorMessage={oldPasswordError ? oldPasswordError.message : null}
                    type="password"
                />
                <TextField
                    label="New password"
                    value={newPassword}
                    onChange={password => setNewPassword(password)}
                    hasError={!!false}
                    type="password"
                />
            </TextFieldGroupStyled>
            <Button label="Done" onClick={() => props.updatePassword(newPassword, oldPassword)}/>
        </PasswordUpdateSectionStyled>
    );
};

export interface PasswordUpdateSectionProps {
    errors: ErrorMessage[];
    updatePassword(newPassword: string, oldPassword: string);
}

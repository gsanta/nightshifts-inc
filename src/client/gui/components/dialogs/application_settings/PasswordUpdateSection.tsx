import * as React from 'react';
import TextField from '../../../components/form_elements/text_field/TextField';
import { ErrorMessage } from '../../../ErrorMessage';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../form_elements/Button';
import _ = require('lodash');
import { FormattedMessage } from 'react-intl';
import colors from '../../../colors';

const PasswordUpdateSectionStyled = styled.div`
    display: flex;
`;

const TextFieldGroupStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

const SavePasswordButtonDecoratorStyled = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    height: 130px;
    margin-left: 20px;
    padding: 5px;
    justify-content: center;

    background: repeating-linear-gradient(
        45deg,
        #EFEFEF,
        #EFEFEF 5px,
        #FFFFFF 5px,
        #FFFFFF 10px
    );
`;

const SavePasswordButtonStyled = styled(Button)`

    && {
        background-color: ${colors.SubmitAction};

        &:hover {
            background-color: ${colors.SubmitActionFocused};
        }
    }
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
            <SavePasswordButtonDecoratorStyled>
                <SavePasswordButtonStyled
                    label={<FormattedMessage id="save" defaultMessage={'Save password'}/>}
                    onClick={() => props.updatePassword(newPassword, oldPassword)}
                />
            </SavePasswordButtonDecoratorStyled>
        </PasswordUpdateSectionStyled>
    );
};

export interface PasswordUpdateSectionProps {
    errors: ErrorMessage[];
    updatePassword(newPassword: string, oldPassword: string);
}

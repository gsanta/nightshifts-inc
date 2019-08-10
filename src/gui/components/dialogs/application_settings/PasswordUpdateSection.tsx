import * as React from 'react';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../forms/Button';
import find from 'lodash/find';
import { FormattedMessage } from 'react-intl';
import colors from '../../miscellaneous/colors';
import TextField from '../../forms/text_field/TextField';
import { useTranslation } from 'react-i18next';

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
    const {t} = useTranslation();

    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const oldPasswordError = find(props.errors, error => error.properties.indexOf('oldPassword') !== -1);

    return (
        <PasswordUpdateSectionStyled>
            <TextFieldGroupStyled>
                <TextField
                    label={t('settings.oldPassword')}
                    value={oldPassword}
                    onChange={password => setOldPassword(password)}
                    hasError={!!oldPasswordError}
                    errorMessage={oldPasswordError ? oldPasswordError.message : null}
                    type="password"
                />
                <TextField
                    label={t('settings.newPassword')}
                    value={newPassword}
                    onChange={password => setNewPassword(password)}
                    hasError={!!false}
                    type="password"
                />
            </TextFieldGroupStyled>
            <SavePasswordButtonDecoratorStyled>
                <SavePasswordButtonStyled
                    label={t('settings.savePassword')}
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

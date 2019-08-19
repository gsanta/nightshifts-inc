import * as React from 'react';
import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import { useState } from 'react';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import styled from 'styled-components';
import colors from '../../miscellaneous/colors';
import { TitleLine } from '../dialog_template/TitleLine';
import { ButtonLine } from '../dialog_template/ButtonLine';
import Button from '../../forms/Button';
import { PasswordUpdateSection } from './PasswordUpdateSection';
import TextField from '../../forms/text_field/TextField';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { UserController } from '../../../controller/UserController';
import { SettingsController } from '../../../controller/SettingsController';

const ControlLabelStyled = styled.div`
    font-size: 12px;
    margin-bottom: 0;
`;

const LoggedInWithFacebookText = styled.div`
    font-style: italic;
    opacity: 0.5;
`;

export const getErrorMessage = (errors: ErrorMessage[], propertyName: string) => {
    const filteredErrors = errors
        .filter(e => e.properties.length === 1)
        .filter(e => e.properties[0] === propertyName);


    if (filteredErrors.length > 0) {
        return filteredErrors[0].message;
    }

    return null;
};

const ApplicationSettingsDialogBodyStyled = styled.div`
    margin-bottom: 10px;
`;

const DoneButtonStyled = styled(Button)`
    /* to overwrite material-ui's style we have to increase the specificity */
    && {
        margin-left: auto;
        margin-right: auto;
        background-color: ${colors.SubmitAction};

        &:hover {
            background-color: ${colors.SubmitActionFocused};
        }
    }
`;

const ApplicationSettingsMainContentStyled = styled.div`
    padding: 0px 5px;
    margin-bottom: 30px;
`;

const ApplicationSettingsDialogBody = (props: ApplicationSettingsDialogProps) => {
    const { t, i18n } = useTranslation();
    const user = props.userController.user;

    const [didUserPropsArrive, setDidUserPropsArrive] = useState(user ? true : false);

    const [email, setEmail] = useState(user ? user.email : null);
    const [authStrategy, setAuthStrategy] = useState(user ? user.authStrategy : null);
    const [language, setLanguage] = useState(props.settingsController.language);

    if (user && !didUserPropsArrive) {
        setEmail(user.email);
        setAuthStrategy(user.authStrategy);
        setDidUserPropsArrive(true);
    }

    const updatePassword = (newPassword: string, oldPassword: string) => {
        props.userController.updatePassword({...user, email: email}, newPassword, oldPassword);
    };

    return (
        <ApplicationSettingsDialogBodyStyled>
            <TitleLine marginTop={25}>{t('settings.settings') as string}</TitleLine>
            <ApplicationSettingsMainContentStyled>
                <div>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={newEmail => setEmail(newEmail)}
                        disabled={authStrategy === 'facebook'}
                        hasError={false}
                        errorMessage={getErrorMessage([], 'email')}
                    />
                </div>

                <div>
                    {authStrategy === 'facebook' ?
                        renderLoggedInWithFacebookText() :
                        <PasswordUpdateSection
                            errors={props.userController.errors}
                            updatePassword={updatePassword}
                        />
                    }
                </div>
                <LanguageSelector
                    changeLanguage={(lan: 'hu' | 'en') => {
                        setLanguage(lan);
                    }}
                    language={language}
                />
            </ApplicationSettingsMainContentStyled>
            <ButtonLine>
                <DoneButtonStyled
                    label={t('settings.save')}
                    onClick={
                        () => {
                            props.settingsController.setLanguage(language);
                        }
                    }
                />
            </ButtonLine>
        </ApplicationSettingsDialogBodyStyled>
    );
};

const renderLoggedInWithFacebookText = () => {
    return (
        <div>
            <ControlLabelStyled>Password</ControlLabelStyled>
            <LoggedInWithFacebookText>Logged in with facebook</LoggedInWithFacebookText>
        </div>
    );
};



export default withDialog(ApplicationSettingsDialogBody, {
    colors: {
        header: colors.White,
        headerBorder: colors.White,
        body: colors.White
    }
});


export interface ApplicationSettingsDialogProps extends DialogTemplateProps {
    userController: UserController;
    settingsController: SettingsController;
}

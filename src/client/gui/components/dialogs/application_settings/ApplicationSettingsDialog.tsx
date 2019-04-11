import * as React from 'react';
import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import { useState } from 'react';
import { User } from '../../../../state/user/User';
import TextField from '../../../components/form_elements/text_field/TextField';
import { ErrorMessage } from '../../../ErrorMessage';
import styled from 'styled-components';
import colors from '../../../colors';
import { TitleLine } from '../dialog_template/TitleLine';
import { ButtonLine } from '../dialog_template/ButtonLine';
import Button from '../../form_elements/Button';
import { PasswordUpdateSection } from './PasswordUpdateSection';

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
    const [didUserPropsArrive, setDidUserPropsArrive] = useState(props.user ? true : false);

    const [email, setEmail] = useState(props.user ? props.user.email : null);
    const [authStrategy, setAuthStrategy] = useState(props.user ? props.user.authStrategy : null);
    const [password, setPassword] = useState(null);

    if (props.user && !didUserPropsArrive) {
        setEmail(props.user.email);
        setAuthStrategy(props.user.authStrategy);
        setDidUserPropsArrive(true);
    }

    const updatePassword = (newPassword: string, oldPassword: string) => {
        props.updatePassword({...props.user, email: email}, newPassword, oldPassword);
    };

    return (
        <ApplicationSettingsDialogBodyStyled>
            <TitleLine>settings</TitleLine>
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
                            errors={props.errors}
                            updatePassword={updatePassword}
                        />
                    }
                </div>
            </ApplicationSettingsMainContentStyled>
            <ButtonLine>
                <DoneButtonStyled label="Done" onClick={() => props.updateUser({...props.user, email: email})}/>
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
    user: User;
    errors: ErrorMessage[];
    updatePassword(user: User, newPassword: string, oldPassword: string);
    updateUser(user: User);
}

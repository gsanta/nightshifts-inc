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

const ApplicationSettingsDialogBodyStyle = styled.div`

`;

const DoneButtonStyled = styled(Button)`
    /* to overwrite material-ui's style we have to increase the specificity */
    && {
        margin-left: auto;
        margin-right: auto;
        background-color: blue;
        background-color: ${colors.SubmitAction};

        &:hover {
            background-color: ${colors.SubmitActionFocused};
        }
    }
`;

const ApplicationSettingsMainContentStyled = styled.div`
    margin-bottom: 30px;
`;

const ApplicationSettingsDialogBody = (props: ApplicationSettingsDialogProps) => {
    const [didUserPropsArrive, setDidUserPropsArrive] = useState(props.user ? true : false);
    const [localUserCopy, setLocalUserCopy] = useState(props.user ? props.user.clone() : null);

    if (props.user && !didUserPropsArrive) {
        setLocalUserCopy(props.user.clone());
        setDidUserPropsArrive(true);
    }

    const email = localUserCopy ? localUserCopy.email : null;
    const authStrategy = localUserCopy ? localUserCopy.authStrategy : null;

    return (
        <ApplicationSettingsDialogBodyStyle>
            <TitleLine>settings</TitleLine>
            <ApplicationSettingsMainContentStyled>
                <div>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={newEmail => this.changeEmail(newEmail)}
                        disabled={authStrategy === 'facebook'}
                        hasError={false}
                        errorMessage={getErrorMessage([], 'email')}
                    />
                </div>

                <div>
                    {authStrategy === 'facebook' ? renderLoggedInWithFacebookText() : <span>No facebook</span>}
                </div>
            </ApplicationSettingsMainContentStyled>
            <ButtonLine>
                <DoneButtonStyled label="Done"/>
            </ButtonLine>
        </ApplicationSettingsDialogBodyStyle>
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
}

import * as React from 'react';
import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import { useState } from 'react';
import { User } from '../../../../state/user/User';
import TextField from '../../../components/form_elements/text_field/TextField';
import { ErrorMessage } from '../../../ErrorMessage';
import styled from 'styled-components';
import { FormGroup, ControlLabel } from 'react-bootstrap';

const ControlLabelStyled = styled(ControlLabel)`
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

const ApplicationSettingsDialog = (props: ApplicationSettingsDialogProps) => {
    const [didUserPropsArrive, setDidUserPropsArrive] = useState(props.user ? true : false);
    const [localUserCopy, setLocalUserCopy] = useState(props.user ? props.user.clone() : null);

    if (props.user && !didUserPropsArrive) {
        setLocalUserCopy(props.user.clone());
        setDidUserPropsArrive(true);
    }

    const email = localUserCopy ? localUserCopy.email : null;
    const authStrategy = localUserCopy ? localUserCopy.authStrategy : null;

    return (
        <div>
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
        </div>
    );

    // return <Settings/>;
};

const renderLoggedInWithFacebookText = () => {
    return (
        <FormGroup
        validationState={'success'}
        >
            <ControlLabelStyled>Password</ControlLabelStyled>
            <LoggedInWithFacebookText>Logged in with facebook</LoggedInWithFacebookText>
        </FormGroup>
    );
};



export default withDialog(ApplicationSettingsDialog, {
    colors: {
        header: '#FFDBA6',
        headerBorder: '#FF9D0A',
        body: '#FFF3E2'
    }
});


export interface ApplicationSettingsDialogProps extends DialogTemplateProps {
    user: User;
}

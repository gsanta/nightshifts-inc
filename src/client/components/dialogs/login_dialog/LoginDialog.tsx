import withDialog from '../dialog_template/withDialog';
import * as React from 'react';
import { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../miscellaneous/colors';
import styled from 'styled-components';
import Button from '../../form_elements/Button';
import Link from '../../form_elements/link/Link';
import { TitleLine } from '../dialog_template/TitleLine';
import { ButtonLine } from '../dialog_template/ButtonLine';
import { FacebookLoginButton } from '../../form_elements/facebook_button/FacebookLoginButton';
import { User } from '../../../state/user_state/user_model/User';
import { Redirect } from 'react-router-dom';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import _ = require('lodash');
import StandaloneErrorLabel from '../../miscellaneous/StandaloneErrorLabel';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import TextField from '../../form_elements/text_field/TextField';

const InputSectionStyled = styled.div`
    margin-left: 10px;
`;

const LoginButtonStyled = styled(Button)`
    /* to overwrite material-ui's style we have to increase the specificity */
    && {
        margin-left: auto;
        margin-right: 10px;
        background-color: ${colors.SubmitAction};

        &:hover {
            background-color: ${colors.SubmitActionFocused};
        }
    }
`;

const FacebookButtonStyled = styled(FacebookLoginButton)`
    /* to overwrite material-ui's style we have to increase the specificity */
    && {
        margin-left: auto;
        margin-right: auto;
        background-color: blue;
    }
`;

const TryoutButtonStyled = styled(Button)`
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

const BottomLine = styled.div`
    margin: 30px 3px 5px 3px;
    display: flex;
    justify-content: space-between;
`;

const TextFieldWithValidationStyled = styled.div`
    display: flex;
`;

const LoginDialogBody = (props: LoginDialogProps) => {
    if (props.user) {
        return <Redirect to="/"/>;
    }

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const emailError = _.find(props.errors, error => error.properties.indexOf('email') !== -1);
    const emailErrorMessage = emailError ? <StandaloneErrorLabel>{emailError.message}</StandaloneErrorLabel> : null;

    const passwordError = _.find(props.errors, error => error.properties.indexOf('password') !== -1);
    const passwordErrorMessage = passwordError ? <StandaloneErrorLabel>{passwordError.message}</StandaloneErrorLabel> : null;

    return (
        <div>
            <TitleLine>log in with</TitleLine>
            <InputSectionStyled>
                <TextFieldWithValidationStyled>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        hasError={!!emailError}
                    />
                    {emailErrorMessage}
                </TextFieldWithValidationStyled>
                <TextFieldWithValidationStyled>
                    <TextField
                        label="Password"
                        value={password}
                        onChange={setPassword}
                        hasError={!!passwordError}
                        type="password"
                    />
                    {passwordErrorMessage}
                </TextFieldWithValidationStyled>
            </InputSectionStyled>
            <ButtonLine>
                <LoginButtonStyled
                    label={<FormattedMessage id="login" defaultMessage={'Login'}/>}
                    onClick={() => props.login(email, password)}
                />
            </ButtonLine>
            <TitleLine>or with</TitleLine>
            <ButtonLine>
                <FacebookButtonStyled callback={(event: {accessToken: string}) => props.loginFacebook(event.accessToken)}/>
            </ButtonLine>
            <TitleLine>or</TitleLine>
            <ButtonLine>
                <TryoutButtonStyled
                    label={<FormattedMessage id="tryOut" defaultMessage={'Try out without login'}/>}
                    onClick={() => props.loginWithTemporaryUser()}
                />
            </ButtonLine>
            <BottomLine>
                <Link to="/">Forgot password</Link>
                <Link to="/signup">Create account</Link>
            </BottomLine>
        </div>
    );
};

export default withDialog(LoginDialogBody, {
    colors: {
        header: colors.White,
        headerBorder: colors.White,
        body: colors.White
    }
});

export interface LoginDialogProps extends DialogTemplateProps {
    loginFacebook(accessToken: string): void;
    login(email: string, password: string): void;
    loginWithTemporaryUser(): void;
    user: User;
    errors: ErrorMessage[];
}

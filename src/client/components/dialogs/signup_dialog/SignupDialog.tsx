import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import * as React from 'react';
import colors from '../../miscellaneous/colors';
import { TitleLine } from '../dialog_template/TitleLine';
import { ButtonLine } from '../dialog_template/ButtonLine';
import styled from 'styled-components';
import Button from '../../form_elements/Button';
import Link from '../../form_elements/link/Link';
import { FacebookLoginButton } from '../../form_elements/facebook_button/FacebookLoginButton';
import { Redirect } from 'react-router-dom';
import { User } from '../../../state/user_state/user_model/User';
import { useState } from 'react';
import { ErrorMessage } from '../../miscellaneous/ErrorMessage';
import find from 'lodash/find';
import StandaloneErrorLabel from '../../miscellaneous/StandaloneErrorLabel';
import TextField from '../../form_elements/text_field/TextField';

const InputSectionStyled = styled.div`
    margin-left: 10px;
`;

const LoginButtonStyled = styled(Button)`
    /* to overwrite material-ui's style we have to increase the specificity */
    && {
        margin-left: auto;
        margin-right: 10px;
        background-color: ${colors.CreateAction};

        &:hover {
            background-color: ${colors.CreateActionFocus};
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

const BottomLine = styled.div`
    margin: 30px 3px 5px 3px;
    display: flex;
    justify-content: space-between;
`;

const GotoLoginLinkStyled = styled.div`
    margin-left: auto;
`;

const TextFieldWithValidationStyled = styled.div`
    display: flex;
`;

const SignupDialogBody: React.SFC<SignupDialogProps> = (props: SignupDialogProps) => {
    if (props.user) {
        return <Redirect to="/"/>;
    }

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const emailError = find(props.errors, error => error.properties.indexOf('email') !== -1);
    const emailErrorMessage = emailError ? <StandaloneErrorLabel>{emailError.message}</StandaloneErrorLabel> : null;

    const passwordError = find(props.errors, error => error.properties.indexOf('password') !== -1);
    const passwordErrorMessage = passwordError ? <StandaloneErrorLabel>{passwordError.message}</StandaloneErrorLabel> : null;

    return (
        <div>
            <TitleLine>create account</TitleLine>
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
                <LoginButtonStyled label={'Create'} onClick={() => props.signup(email, password)}/>
            </ButtonLine>
            <TitleLine>or create with</TitleLine>
            <ButtonLine>
                <FacebookButtonStyled callback={(event: {accessToken: string}) => props.loginFacebook(event.accessToken)}/>
            </ButtonLine>
            <BottomLine>
                <GotoLoginLinkStyled>Already have an account <Link to="/login">Go to login</Link></GotoLoginLinkStyled>
            </BottomLine>
        </div>
    );
};

SignupDialogBody.defaultProps = {
    errors: []
};

export default withDialog(SignupDialogBody, {
    colors: {
        header: colors.White,
        headerBorder: colors.White,
        body: colors.White
    }
});

export interface SignupDialogProps extends DialogTemplateProps {
    loginFacebook(accessToken: string): void;
    signup(email: string, password: string): void;
    user: User;
    errors: ErrorMessage[];
}

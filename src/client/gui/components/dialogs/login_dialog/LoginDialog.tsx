import withDialog from '../dialog_template/withDialog';
import * as React from 'react';
import { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../../colors';
import styled from 'styled-components';
import TextField from '../../../components/form_elements/text_field/TextField';
import Button from '../../form_elements/Button';
import Link from '../../form_elements/link/Link';
import { TitleLine } from '../dialog_template/TitleLine';
import { ButtonLine } from '../dialog_template/ButtonLine';
import { FacebookLoginButton } from '../../../form/FacebookLoginButton';
import { User } from '../../../../state/user/User';
import { Redirect } from 'react-router-dom';

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

const BottomLine = styled.div`
    margin: 30px 3px 5px 3px;
    display: flex;
    justify-content: space-between;
`;

const LoginDialogBody = (props: LoginDialogProps) => {
    if (props.user) {
        return <Redirect to="/"/>;
    }

    return (
        <div>
            <TitleLine>log in with</TitleLine>
            <InputSectionStyled>
                <TextField
                    label="Email"
                    value={null}
                    onChange={newEmail => () => null}
                    hasError={false}
                />
                <TextField
                    label="Password"
                    value={null}
                    onChange={newEmail => () => null}
                    hasError={false}
                    type="password"
                />
            </InputSectionStyled>
            <ButtonLine>
                <LoginButtonStyled label={'Log in'}/>
            </ButtonLine>
            <TitleLine>or with</TitleLine>
            <ButtonLine>
                <FacebookButtonStyled callback={(event: {accessToken: string}) => props.loginFacebook(event.accessToken)}/>
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
    user: User;
}

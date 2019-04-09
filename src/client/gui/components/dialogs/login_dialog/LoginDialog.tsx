import withDialog from '../dialog_template/withDialog';
import * as React from 'react';
import { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../../colors';
import styled from 'styled-components';
import TextField from '../../../components/form_elements/text_field/TextField';
import Button from '../../form_elements/Button';
import Link from '../../form_elements/link/Link';

const TitleLineStyle = styled.div`
    text-align: center;
    margin: 40px 0px;
`;

const TitleLineHorizontalLine = styled.hr`
    border-top: 1px solid ${colors.MainTextGray};
    margin-top: -12px;
`;

const TitleLineText = styled.div`
    display: inline-block;
    background: white;
    color: ${colors.MainTextGray};
    font-style: italic;
    padding: 0 2px;
`;

const TitleLine = ({children}: {children: JSX.Element | string}) => {
    return (
        <TitleLineStyle>
            <TitleLineText>{children}</TitleLineText>
            <TitleLineHorizontalLine/>
        </TitleLineStyle>
    );
};

const InputSectionStyled = styled.div`
    margin-left: 10px;
`;

const LoginButtonSectionStyled = styled.div`
    height: 40px;
    padding: 5px 0px;
    background-color: ${colors.MainInputBackgroundGray};
    width: 100%;
    display: flex;

    background: repeating-linear-gradient(
        45deg,
        #EFEFEF,
        #EFEFEF 5px,
        #FFFFFF 5px,
        #FFFFFF 10px
    );
`;

const LoginButtonStyled = styled(Button)`
    && {
        margin-left: auto;
        margin-right: 10px;
        background-color: red;
    }
`;

const FacebookButtonStyled = styled(Button)`
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
            <LoginButtonSectionStyled>
                <LoginButtonStyled label={'Log in'}/>
            </LoginButtonSectionStyled>
            <TitleLine>or with</TitleLine>
            <LoginButtonSectionStyled>
                <FacebookButtonStyled label={'Facebook'}/>
            </LoginButtonSectionStyled>
            <BottomLine>
                <Link>Forgot password</Link>
                <Link>Create account</Link>
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

}

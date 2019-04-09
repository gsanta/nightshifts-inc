import withDialog from '../dialog_template/withDialog';
import * as React from 'react';
import { DialogTemplateProps } from '../dialog_template/withDialog';
import colors from '../../../colors';
import styled from 'styled-components';
import TextField from '../../../components/form_elements/text_field/TextField';

const TitleLineStyle = styled.div`
    text-align: center;
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

const LoginDialogBodyStyle = styled.div`
    margin-top: 20px;
`;

const LoginDialogBody = (props: LoginDialogProps) => {
    return (
        <LoginDialogBodyStyle>
            <TitleLine>log in with</TitleLine>
            <TextField
                label="Email"
                value={null}
                onChange={newEmail => () => null}
                hasError={false}
            />
            <TitleLine>or with</TitleLine>
        </LoginDialogBodyStyle>
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

import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import * as React from 'react';
import colors from '../../../colors';
import { TitleLine } from '../dialog_template/TitleLine';
import TextField from '../../form_elements/text_field/TextField';
import { ButtonLine } from '../dialog_template/ButtonLine';
import styled from 'styled-components';
import Button from '../../form_elements/Button';

const SignupDialogBodySyled = styled.div`
    margin-bottom: 54px;
`;

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

const FacebookButtonStyled = styled(Button)`
    /* to overwrite material-ui's style we have to increase the specificity */
    && {
        margin-left: auto;
        margin-right: auto;
        background-color: blue;
    }
`;

const SignupDialogBody = (props: DialogTemplateProps) => {
    return (
        <SignupDialogBodySyled>
            <TitleLine>create account</TitleLine>
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
                <LoginButtonStyled label={'Create'}/>
            </ButtonLine>
            <TitleLine>or create with</TitleLine>
            <ButtonLine>
                <FacebookButtonStyled label={'Facebook'}/>
            </ButtonLine>
        </SignupDialogBodySyled>
    );
};

export default withDialog(SignupDialogBody, {
    colors: {
        header: colors.White,
        headerBorder: colors.White,
        body: colors.White
    }
});

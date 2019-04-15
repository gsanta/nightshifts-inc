import styled from 'styled-components';
import * as React from 'react';
import {Close} from '@material-ui/icons';
import colors from '../../miscellaneous/colors';

const DialogTemplateHeaderStyled = styled.div`
    display: flex;
`;

const CloseStyled = styled(Close)`
    margin-left: auto;
    cursor: pointer;
`;

const TitleStyled = styled.div`
    margin-left: 5px;
    color: ${colors.MainTextGray};
    font-weight: bold;
    text-decoration: underline;
`;

const DialogTemplateHeader = ({close, title}: DialogTemplateHeaderProps) => {
    return (
        <DialogTemplateHeaderStyled>
            <TitleStyled>{title}</TitleStyled>
            <CloseStyled onClick={close}/>
        </DialogTemplateHeaderStyled>
    );
};

export default DialogTemplateHeader;

export interface DialogTemplateHeaderProps {
    close(): void;
    title: string;
}

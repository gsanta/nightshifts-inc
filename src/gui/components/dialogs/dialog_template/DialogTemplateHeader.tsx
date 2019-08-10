import colors from '../../miscellaneous/colors';
import styled from 'styled-components';
import * as React from 'react';
import Close from '@material-ui/icons/Close';

const DialogTemplateHeaderStyled = styled.div`
    display: flex;
`;

const CloseStyled = styled<any>(Close)`
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

import styled from 'styled-components';
import * as React from 'react';
import {Close} from '@material-ui/icons';

const DialogTemplateHeaderStyled = styled.div`
    display: flex;
`;

const CloseStyled = styled(Close)`
    margin-left: auto;
    cursor: pointer;
`;

const DialogTemplateHeader = ({close}: DialogTemplateHeaderProps) => {
    return (
        <DialogTemplateHeaderStyled>
            <CloseStyled onClick={close}/>
        </DialogTemplateHeaderStyled>
    );
};

export default DialogTemplateHeader;

export interface DialogTemplateHeaderProps {
    close(): void;
}

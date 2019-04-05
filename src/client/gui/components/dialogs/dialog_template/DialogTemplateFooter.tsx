import * as React from 'react';
import styled from 'styled-components';
import Button from '../../form_elements/text_field/Button';


const DialogTemplateFooter = styled(({className, onSubmit}: DialogTemplateFooterProps) => {
    return (
        <div className={className}>
            <Button/>
        </div>
    );
})`
    height: 30px;
    border-top: 1px solid ${(props: DialogTemplateFooterProps) => props.borderColor};
`;

export default DialogTemplateFooter;

export interface DialogTemplateFooterProps {
    borderColor: string;
    onSubmit(): void;
    className?: string;
}

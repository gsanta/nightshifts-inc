import * as React from 'react';
import styled from 'styled-components';
import Button from '../../form_elements/Button';

const DialogTemplateFooter = styled(({className, onSubmit, submitLabel}: DialogTemplateFooterProps) => {
    return (
        <div className={className}>
            <Button label={submitLabel}/>
        </div>
    );
})`
    height: 46px;
    padding: 5px;
    display: flex;
    border-top: 1px solid ${(props: DialogTemplateFooterProps) => props.borderColor};

    > *:last-child {
        margin-left: auto;
    }
`;

export default DialogTemplateFooter;

export interface DialogTemplateFooterProps {
    borderColor: string;
    onSubmit(): void;
    submitLabel: string;
    className?: string;
}

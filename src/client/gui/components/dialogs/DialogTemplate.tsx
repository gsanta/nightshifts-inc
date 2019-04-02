import * as React from 'react';
import { Dialog, withStyles } from '@material-ui/core';
import styled from 'styled-components';

const DialogTemplateHeader = styled.div`
    background-color: ${(props: DialogTemplateProps)  => props.colors.header};
    border-bottom-color: ${(props: DialogTemplateProps) => props.colors.headerBorder};
    border-bottom-style: solid;
    border-bottom-width: 1px;
    height: 30px;
`;

const DialogTemplateStyles = {
    root: {
        width: '500px',
        height: '300px',
        borderRadius: '0',
        backgroundColor: (props: DialogTemplateProps)  => {
            return props.colors.body;
        },
        border: (props: DialogTemplateProps) => `1px solid ${props.colors.headerBorder}`
    } as any
};

const DialogTemplateRender = (props: DialogTemplateProps & {classes: any, children: JSX.Element}) => {
    const {children, classes, ...rest} = props;
    return (
        <Dialog
            open={true}
            PaperProps={{
                classes: {
                    root: classes.root
                }
            }}
        >
            <DialogTemplateHeader {...rest}/>
            {children}
        </Dialog>
    );
};

const DialogTemplate = withStyles(DialogTemplateStyles)(DialogTemplateRender);

const wrapToDialog = <P extends object>(Component: React.ComponentType<P>, dialogProps: DialogTemplateProps) => {
    return (props: P) => {
        return (
            <DialogTemplate {...dialogProps}>
                <Component {...props}/>
            </DialogTemplate>
        );
    };
};

export default wrapToDialog;

export interface DialogTemplateProps {
    colors: {
        header?: string,
        headerBorder?: string,
        body?: string
    };
}

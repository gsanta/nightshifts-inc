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

export class DialogTemplate extends React.Component<DialogTemplateProps, {}> {
    public render() {
        return (
            <Dialog
                open={true}
                PaperProps={{
                    classes: {
                        root: this.props.classes.root
                    }
                }}
            >
                <DialogTemplateHeader {...this.props}/>
                {this.props.children}
            </Dialog>
        );
    }
}

const DialogWithStyles = withStyles({
    root: {
        width: '500px',
        height: '300px',
        borderRadius: '0',
        backgroundColor: (props: DialogTemplateProps)  => {
            return props.colors.body;
        },
        border: (props: DialogTemplateProps) => `1px solid ${props.colors.headerBorder}`
    } as any
})(DialogTemplate);

export default DialogWithStyles;

export const wrapToDialog = <P extends object>(Component: React.ComponentType<P>, dialogProps: DialogTemplateProps) => {
    return (props: P) => {
        return (
            <DialogWithStyles {...dialogProps}>
                <Component {...props}/>
            </DialogWithStyles>
        );
    };
};

export interface DialogTemplateProps {
    colors: {
        header?: string,
        headerBorder?: string,
        body?: string
    };
    classes?: {
        root: string
    };
}

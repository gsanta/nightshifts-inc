import * as React from 'react';
import { Dialog, withStyles } from '@material-ui/core';
import DialogTemplateFooter from './DialogTemplateFooter';
import DialogTemplateHeader from './DialogTemplateHeader';
import DialogTemplateBody from './DialogTemplateBody';


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
    const {children, classes} = props;

    const Footer = props.footerOptions ? (
        <DialogTemplateFooter onSubmit={props.footerOptions.onSubmit} borderColor={props.colors.headerBorder} submitLabel={props.footerOptions.submitLabel}/>
     ) : null;

    return (
        <Dialog
            open={true}
            PaperProps={{
                classes: {
                    root: classes.root
                }
            }}
        >
            <DialogTemplateHeader backgroundColor={props.colors.header} borderColor={props.colors.headerBorder}/>
            <DialogTemplateBody>{children}</DialogTemplateBody>
            {Footer}
        </Dialog>
    );
};


const withDialog = <P extends DialogTemplateProps>(Component: React.ComponentType<P>, defaults: Partial<DialogTemplateProps>) => {
    const DialogWrapper = withStyles(DialogTemplateStyles)(DialogTemplateRender);

    return (props: P) => {
        const mergedProps = {...defaults, ...props};
        const {colors, footerOptions} = mergedProps;

        return (
            <DialogWrapper colors={colors} footerOptions={footerOptions}>
                <Component {...props}/>
            </DialogWrapper>
        );
    };
};

export default withDialog;

export interface DialogTemplateProps {
    footerOptions?: {
        submitLabel: string;
        onSubmit(): void;
    };
    colors?: {
        header?: string,
        headerBorder?: string,
        body?: string
    };
}

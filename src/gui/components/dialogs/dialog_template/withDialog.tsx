import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import withStyles from '@material-ui/styles/withStyles';
import DialogTemplateFooter from './DialogTemplateFooter';
import DialogTemplateHeader from './DialogTemplateHeader';
import DialogTemplateBody from './DialogTemplateBody';


const DialogTemplateStyles = {
    root: {
        width: '500px',
        minHeight: '300px',
        borderRadius: '0',
        backgroundColor: (props: DialogTemplateProps)  => {
            return props.colors.body;
        },
        border: (props: DialogTemplateProps) => `1px solid ${props.colors.headerBorder}`
    } as any,

    backdrop: {
        background: 'transparent'
    }
};

const DialogTemplateRender = (props: DialogTemplateProps & {classes: any, children: JSX.Element}) => {
    const {children, classes} = props;

    const Header = props.headerOptions ? (
        <DialogTemplateHeader close={props.headerOptions.close} title={props.headerOptions.title}/>
    ) : null;

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
            BackdropProps={{
                classes: {
                    root: classes.backdrop
                }
            }}
        >
            {Header}
            <DialogTemplateBody>{children}</DialogTemplateBody>
            {Footer}
        </Dialog>
    );
};


const withDialog = <P extends DialogTemplateProps>(Component: React.ComponentType<P>, defaults: Partial<DialogTemplateProps>) => {
    const DialogWrapper = withStyles(DialogTemplateStyles)(DialogTemplateRender);

    return (props: P) => {
        const mergedProps = {...defaults, ...props};
        const {colors, footerOptions, headerOptions} = mergedProps;

        return (
            <DialogWrapper colors={colors} footerOptions={footerOptions} headerOptions={headerOptions}>
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
    headerOptions?: {
        close(): void;
        title?: string;
    };
    colors?: {
        header?: string,
        headerBorder?: string,
        body?: string
    };
}

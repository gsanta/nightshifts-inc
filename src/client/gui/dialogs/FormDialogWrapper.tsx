import {Modal, withStyles} from '@material-ui/core';
import styled from 'styled-components';
import { colors } from '../styles';
import * as React from 'react';
import { ErrorMessage } from '../ErrorMessage';
import * as _ from 'lodash';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute' as 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        paddingTop: '10px',
    }
});

const Footer = styled.div`
    margin-top: 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
`;

const ErrorLabel = styled.div`
    height: 20px;
    margin-bottom: 5px;
    color: ${colors.Red};
    font-size: 12px;
`;

export const getMultiFieldErrorMessage = (errors: ErrorMessage[]): string => {
    const filteredErrors = errors
        .filter(e => e.properties.length !== 1);

    if (filteredErrors.length > 0) {
        return filteredErrors[0].message;
    }

    return null;
};

export const getErrorMessage = (errors: ErrorMessage[], propertyName: string) => {
    const filteredErrors = errors
        .filter(e => e.properties.length === 1)
        .filter(e => e.properties[0] === propertyName);


    if (filteredErrors.length > 0) {
        return filteredErrors[0].message;
    }

    return null;
};

export const hasError = (errors: ErrorMessage[], propertyName: string) => {
    const filteredErrors = errors
        .filter(e => _.includes(e.properties[0], propertyName));

    return filteredErrors.length > 0;
};

const FormDialogWrapper = (props: FormDialogWrapperProps) => {

    return (
        <Modal open={true} className="the-game-modal">
            <div style={getModalStyle()} className={props.classes.paper}>
                <ErrorLabel>{props.errorMessage}</ErrorLabel>
                {props.body}
                <Footer>
                    {props.footer}
                </Footer>
            </div>
        </Modal>
    );
};

export default withStyles(styles)(FormDialogWrapper);

export interface FormDialogWrapperProps {
    body: JSX.Element;
    footer: JSX.Element;
    classes: any;
    errorMessage?: string;
}

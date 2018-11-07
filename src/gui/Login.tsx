import * as React from 'react';
import {Modal, withStyles} from '@material-ui/core';
import { TextField } from '@material-ui/core';

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
        padding: theme.spacing.unit * 4
    }
});


class Login extends React.Component<LoginProps, {}> {

    public render() {
        return (
            <Modal open={true}>
                <div style={getModalStyle()} className={this.props.classes.paper}>
                <TextField
                    id="outlined-name"
                    value={'abcd'}
                />
                </div>
            </Modal>
        );
    }
}

export default withStyles(styles)(Login);

export interface LoginProps {
    classes: {
        paper: any;
    };
}

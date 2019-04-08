import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as React from 'react';

export default styled(({className, label}: ButtonProps) => {
    return (
        <Button variant="contained"  color="primary" className={className}>
            {label}
        </Button>
    );
})`

`;

export interface ButtonProps {
    className?: string;
    label: string;
}

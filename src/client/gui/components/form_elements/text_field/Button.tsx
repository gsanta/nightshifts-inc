import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import * as React from 'react';

export default styled(({className}: ButtonProps) => {
    return (
        <Button variant="contained"  color="primary" className={className}>
            Default
        </Button>
    );
})`

`;

export interface ButtonProps {
    className?: string;
}

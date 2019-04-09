import Popover from '@material-ui/core/Popover';
import * as React from 'react';
import styled from 'styled-components';
import colors from '../colors';

const PopoverStyled = styled(Popover)`
    & > div:last-child {
        background: ${colors.LightGreen};
        border-radius: 0;
        padding: 2px 5px;
    }
`;

export const StatusPopover = (props: StatusPopoverProps) => {
    return (
        <PopoverStyled
            open={props.open}
            anchorEl={props.anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            onClose={() => null}
            >
            {props.children}
        </PopoverStyled>
    );
};

export interface StatusPopoverProps {
    open: boolean;
    anchorEl: HTMLElement;
    onClose(): void;
    children: string;
}

import { ToolIcon } from './tools_icons/ToolIcon';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';
import * as React from 'react';

export const INVENTORY_ITEM_SIZE = 50;

const InventoryItemBackground = styled.div`
    position: relative;
    background: repeating-linear-gradient(
        45deg,
        #E2F1FF,
        #E2F1FF 5px,
        #B1D9FE 5px,
        #B1D9FE 10px
    );
    width: ${INVENTORY_ITEM_SIZE}px;
    height: ${INVENTORY_ITEM_SIZE}px;
    margin: 5px;
    cursor: ${(props: {draggable: boolean}) => props.draggable ? 'pointer' : 'drag'};
`;

const InventoryItemCloseButton = styled<any>(Close)`
    position: absolute;
    right: 0;
    top: 0;
    && {
        width: 50px;
        height: 50px;
    }
    color: red;
    cursor: pointer;
`;


export const InventoryItem: React.SFC<InventoryItemProps> = styled(
    (props: InventoryItemProps) => {
        const closeButton = props.close ? <InventoryItemCloseButton onClick={props.close}/> : null;
        return (
            <InventoryItemBackground draggable={props.draggable} onDragStart={(e) => e.dataTransfer.setData('id', props.tool.name)}>
                {closeButton}
                {props.tool.getIcon(INVENTORY_ITEM_SIZE)}
            </InventoryItemBackground>
        );
    }
)
`

`;

InventoryItem.defaultProps = {
    draggable: false
};

export interface InventoryItemProps {
    draggable?: boolean;
    tool: ToolIcon;
    close?(): void;
}

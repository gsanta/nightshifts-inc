import { ToolIcon } from './tools_icons/ToolIcon';
import styled from 'styled-components';
import Close from '@material-ui/icons/Close';
import * as React from 'react';

export const INVENTORY_ITEM_SIZE = 50;

const PlaceholderItemBackground = styled.div`
    position: relative;

    background: repeating-linear-gradient(
        45deg,
        #EFEFEF,
        #EFEFEF 5px,
        #FFFFFF 5px,
        #FFFFFF 10px
    );
    width: ${INVENTORY_ITEM_SIZE}px;
    height: ${INVENTORY_ITEM_SIZE}px;
    margin: 5px;
`;


export const PlaceholderItem: React.SFC<PlaceholderItemProps> = styled(
    (props: PlaceholderItemProps) => {
        const onDrop = React.useCallback(
            (e: React.DragEvent) => {
                const toolName = e.dataTransfer.getData('id');
                props.onDrop(toolName, props.storageIndex);
            },
            [],
        );

        const onDragOver = React.useCallback(
            (e: React.ChangeEvent<any>) => {
                e.preventDefault();
            },
            [],
        );

        return (
            <PlaceholderItemBackground onDragOver={onDragOver} onDrop={onDrop}/>
        );
    }
)
`

`;

export interface PlaceholderItemProps {
    onDrop(toolName: string, storageIndex: number): void;
    storageIndex: number;
}

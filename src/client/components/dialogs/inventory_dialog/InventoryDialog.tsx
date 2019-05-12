import * as React from 'react';
import withDialog from '../../../components/dialogs/dialog_template/withDialog';
import styled from 'styled-components';
import { ToolIcon } from '../../../../game/tools/ToolIcon';
import find from 'lodash/find';
import { DialogTemplateProps } from '../../../components/dialogs/dialog_template/withDialog';
import { TitleLine } from '../../../components/dialogs/dialog_template/TitleLine';
import colors from '../../miscellaneous/colors';
import { INVENTORY_ITEM_SIZE, InventoryItem } from './InventoryItem';

const ToolsOnYouSectionStyled = styled.div`
    min-height: ${INVENTORY_ITEM_SIZE + 10}px;
    display: flex;
`;

const ToolsInTheLockerStyled = styled.div`
    width: 100%;
    display: flex;
`;

const InventoryDialog = (props: InventoryDialogProps) => {
    const onDragOver = React.useCallback(
        (e: React.ChangeEvent<any>) => {
            e.preventDefault();
        },
        [],
    );

    const onDrop = React.useCallback(
        (e: React.DragEvent) => {
            const toolName = e.dataTransfer.getData('id');
            props.grabTool(find(props.tools, tool => tool.getName() === toolName));
        },
        [],
    );

    const carriedTools = props.tools
        .filter(tool => tool.isCarrying()).map(tool =>  <InventoryItem key={tool.getName()} tool={tool} close={() => props.releaseTool(tool)}/>);
    const tools = props.tools.map(tool =>  <InventoryItem key={tool.getName()} draggable={true} tool={tool}/>);

    return (
        <div>
            <TitleLine marginBottom={15} marginTop={15}>tools on you</TitleLine>
            <ToolsOnYouSectionStyled onDragOver={onDragOver} onDrop={onDrop}>
                {carriedTools}
            </ToolsOnYouSectionStyled>
            <TitleLine marginBottom={15} marginTop={10}>tools in the locker</TitleLine>
            <ToolsInTheLockerStyled>
                {tools}
            </ToolsInTheLockerStyled>
        </div>
    );
};

export default withDialog(InventoryDialog, {
    colors: {
        header: colors.White,
        headerBorder: colors.White,
        body: colors.White
    }
});


export interface InventoryDialogProps extends DialogTemplateProps {
    tools: ToolIcon[];
    grabTool(tool: ToolIcon);
    releaseTool(tool: ToolIcon);
}

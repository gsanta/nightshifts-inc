import * as React from 'react';
import withDialog from '../dialog_template/withDialog';
import styled from 'styled-components';
import { ToolIcon } from './tools_icons/ToolIcon';
import find from 'lodash/find';
import { DialogTemplateProps } from '../dialog_template/withDialog';
import { TitleLine } from '../dialog_template/TitleLine';
import colors from '../../miscellaneous/colors';
import { INVENTORY_ITEM_SIZE, InventoryItem } from './InventoryItem';
import * as _ from 'lodash';
import { PlaceholderItem } from './PlaceholderItem';
import { ToolController } from '../../../controller/ToolController';

const PickedToolsSection = styled.div`
    min-height: ${INVENTORY_ITEM_SIZE + 10}px;
    display: flex;
    justify-content: center;
`;

const ToolsInTheLockerStyled = styled.div`
    width: 100%;
    display: flex;
`;

const PickToolSlot = styled.div`

`;

const InventoryDialog = (props: InventoryDialogProps) => {

    const onDrop = React.useCallback(
        (toolName: string, storageIndex: number) => {
            props.toolController.grabTool(_.find(props.toolController.tools, (tool) => tool.name === toolName), storageIndex);
        },
        [],
    );

    const maxPickedTools = 2;
    const carriedTools = _.range(0, maxPickedTools).map((storageIndex: number) => {
        const tool = _.find(props.toolController.tools, t => t.storageIndex === storageIndex);
        return tool ?
            <InventoryItem key={tool.name} tool={tool} close={() => props.toolController.releaseTool(tool)}/> :
            <PlaceholderItem onDrop={onDrop} storageIndex={storageIndex}/>;
    });

    const restOfTheTools = props.toolController.tools
                            .filter(tool => !tool.isCarrying)
                            .map(tool =>  <InventoryItem key={tool.name} draggable={true} tool={tool}/>);

    return (
        <div>
            <TitleLine marginBottom={15} marginTop={15}>tools on you</TitleLine>
            <PickedToolsSection>
                {carriedTools}
            </PickedToolsSection>
            <TitleLine marginBottom={15} marginTop={10}>tools in the locker</TitleLine>
            <ToolsInTheLockerStyled>
                {restOfTheTools}
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
    toolController: ToolController;
    grabTool(tool: ToolIcon, index: number);
    releaseTool(tool: ToolIcon);
}

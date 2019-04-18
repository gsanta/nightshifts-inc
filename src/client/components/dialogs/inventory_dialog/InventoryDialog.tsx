import * as React from 'react';
import withDialog from '../../../components/dialogs/dialog_template/withDialog';
import styled from 'styled-components';
import { Tool } from '../../../../game/tools/Tool';
import * as _ from 'lodash';
import { DialogTemplateProps } from '../../../components/dialogs/dialog_template/withDialog';
import { TitleLine } from '../../../components/dialogs/dialog_template/TitleLine';
import colors from '../../miscellaneous/colors';
import { TOOL_WIDGET_SIZE, ToolWidget } from './ToolWidget';

const ToolsOnYouSectionStyled = styled.div`
    min-height: ${TOOL_WIDGET_SIZE + 10}px;
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
            props.grabTool(_.find(props.tools, tool => tool.getName() === toolName));
        },
        [],
    );

    const carriedTools = props.tools
        .filter(tool => tool.isCarrying()).map(tool =>  <ToolWidget key={tool.getName()} tool={tool} close={() => props.releaseTool(tool)}/>);
    const tools = props.tools.map(tool =>  <ToolWidget key={tool.getName()} draggable={true} tool={tool}/>);

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
    tools: Tool[];
    grabTool(tool: Tool);
    releaseTool(tool: Tool);
}

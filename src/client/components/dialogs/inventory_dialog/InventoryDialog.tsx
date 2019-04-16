import * as React from 'react';
import withDialog from '../../../components/dialogs/dialog_template/withDialog';
import styled from 'styled-components';
import { Tool } from '../../../../game/tools/Tool';
import * as _ from 'lodash';
import { DialogTemplateProps } from '../../../components/dialogs/dialog_template/withDialog';
import { TitleLine } from '../../../components/dialogs/dialog_template/TitleLine';
import colors from '../../miscellaneous/colors';
import { Close } from '@material-ui/icons';

const TOOL_WIDGET_SIZE = 50;

const ToolWidgetBackground = styled.div`
    position: relative;
    background: repeating-linear-gradient(
        45deg,
        #E2F1FF,
        #E2F1FF 5px,
        #B1D9FE 5px,
        #B1D9FE 10px
    );
    width: ${TOOL_WIDGET_SIZE}px;
    height: ${TOOL_WIDGET_SIZE}px;
    margin: 5px;
    cursor: ${(props: {draggable: boolean}) => props.draggable ? 'pointer' : 'drag'};
`;

const ToolWidgetCloseButton = styled(Close)`
    position: absolute;
    right: 0;
    top: 0;
    && {
        width: 50px;
        height: 50px;
    }
    color: red;
`;

const ToolWidget: React.SFC<ToolWidgetProps> = (props: ToolWidgetProps) => {
    const closeButton = props.close ? <ToolWidgetCloseButton onClick={props.close}/> : null;
    return (
        <ToolWidgetBackground draggable={props.draggable} onDragStart={(e) => e.dataTransfer.setData('id', props.tool.getName())}>
            {closeButton}
            {props.tool.getIcon(TOOL_WIDGET_SIZE)}
        </ToolWidgetBackground>
    );
};

export interface ToolWidgetProps {
    draggable?: boolean;
    tool: Tool;
    close?(): void;
}

ToolWidget.defaultProps = {
    draggable: false
};

const InventoryDialogStyle = styled.div`
`;

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

    const carriedTools = props.tools.filter(tool => tool.isCarrying()).map(tool =>  <ToolWidget  tool={tool} close={() => null}/>);
    const tools = props.tools.map(tool =>  <ToolWidget draggable={true} tool={tool}/>);

    return (
        <InventoryDialogStyle>
            <TitleLine marginBottom={15} marginTop={15}>tools on you</TitleLine>
            <ToolsOnYouSectionStyled onDragOver={onDragOver} onDrop={onDrop}>
                {carriedTools}
            </ToolsOnYouSectionStyled>
            <TitleLine marginBottom={15} marginTop={10}>tools in the locker</TitleLine>
            <ToolsInTheLockerStyled>
                {tools}
            </ToolsInTheLockerStyled>
        </InventoryDialogStyle>
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
}

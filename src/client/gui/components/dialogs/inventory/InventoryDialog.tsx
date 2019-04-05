import * as React from 'react';
import withDialog from '../dialog_template/withDialog';
import {Highlight} from '@material-ui/icons';
import styled from 'styled-components';
import { Tool } from './Tool';
import * as _ from 'lodash';
import { DialogTemplateProps } from '../dialog_template/withDialog';

const TOOL_WIDGET_SIZE = 50;

const ToolWidgetBackground = styled.div`
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

const ToolWidget: React.SFC<ToolWidgetProps> = (props: ToolWidgetProps) => {
    return (
        <ToolWidgetBackground draggable={props.draggable} onDragStart={(e) => e.dataTransfer.setData('id', props.tool.name)}>
            <Highlight style={{width: `${TOOL_WIDGET_SIZE}px`, height: `${TOOL_WIDGET_SIZE}px`}}/>
        </ToolWidgetBackground>
    );
};

export interface ToolWidgetProps {
    draggable?: boolean;
    tool: Tool;
}

ToolWidget.defaultProps = {
    draggable: false
};

const InventoryDialogStyle = styled.div`
    > div:first-child {
        border-bottom: 1px solid #389FFF;
        min-height: ${TOOL_WIDGET_SIZE + 10}px;
    }

    > div {
        width: 100%;
    }
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
            props.grabTool(_.find(props.tools, tool => tool.name === toolName));
        },
        [],
    );

    const carriedTools = props.tools.filter(tool => tool.isCarrying).map(tool =>  <ToolWidget  tool={tool}/>);
    const tools = props.tools.map(tool =>  <ToolWidget draggable={true} tool={tool}/>);

    return (
        <InventoryDialogStyle>
            <div onDragOver={onDragOver} onDrop={onDrop}>
                {carriedTools}
            </div>
            <div>
                {tools}
            </div>
        </InventoryDialogStyle>
    );
};

export default withDialog(InventoryDialog, {
    colors: {
        header: '#B1D9FE',
        headerBorder: '#389FFF',
        body: '#E2F1FF'
    }
});


export interface InventoryDialogProps extends DialogTemplateProps {
    tools: Tool[];
    grabTool(tool: Tool);
}

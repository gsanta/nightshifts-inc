import styled from 'styled-components';
import * as React from 'react';
import { ToolIcon } from '../../dialogs/inventory_dialog/tools_icons/ToolIcon';
import colors from '../../miscellaneous/colors';

const TOOL_WIDGET_SIZE = 30;

const ToolWidgetStyled = styled.div`
    cursor: pointer;
    background: ${(props: ToolWidgetProps) => props.tool.isActive ? colors.LightGreen : colors.MainInputBackgroundGray};
    /* padding: 5px 10px; */
`;

export const ToolWidget = (props: ToolWidgetProps) => {
    const handleClick = () => props.onClick(props.tool);

    return (
        <ToolWidgetStyled {...props} onClick={handleClick}>
            {props.tool.getIcon(TOOL_WIDGET_SIZE)}
        </ToolWidgetStyled>
    );
};

export interface ToolWidgetProps {
    tool: ToolIcon;
    onClick(tool: ToolIcon): void;
}

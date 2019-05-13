import styled from 'styled-components';
import * as React from 'react';
import { ToolIcon } from '../../dialogs/inventory_dialog/tools_icons/ToolIcon';

const TOOL_WIDGET_SIZE = 30;

const ToolWidgetStyled = styled.div`
    /* padding: 5px 10px; */
`;

export const ToolWidget = styled(
    (props: ToolWidgetProps) => {
        return (
            <div>
                {props.tool.getIcon(TOOL_WIDGET_SIZE)}
            </div>
        );
    }
)
`

`;

export interface ToolWidgetProps {
    tool: ToolIcon;
}

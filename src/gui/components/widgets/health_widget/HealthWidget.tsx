import * as React from 'react';
import styled from 'styled-components';
import { Progressbar } from './Progressbar';

const WIDGET_HEIGHT = 17;
const WIDGET_WIDTH = 100;
const WIDGET_BORDER_SIZE = 1;

const HealthWidgetContainer = styled.div`
    background: white;
    width: ${WIDGET_WIDTH}px;
    height: ${WIDGET_HEIGHT}px;
`;

export const HealthWidget = ({health}: {health: number}) => {
    return (
        <HealthWidgetContainer>
            <Progressbar width={WIDGET_WIDTH} height={WIDGET_HEIGHT} borderSize={WIDGET_BORDER_SIZE} progressInPercent={health / 100}/>
        </HealthWidgetContainer>
    );
};

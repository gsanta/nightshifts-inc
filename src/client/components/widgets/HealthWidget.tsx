import * as React from 'react';
import styled from 'styled-components';
import { World } from '../../../game/world/World';

const HealthWidgetContainer = styled.div`
    padding: 5px;
    background: white;
`;

export const HealthWidget = ({world}: {world: World}) => {
    return world ? <HealthWidgetContainer>Health: {world.player.health}%</HealthWidgetContainer> : null;
};

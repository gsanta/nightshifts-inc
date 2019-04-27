import { storiesOf } from '@storybook/react';
import * as React from 'react';
import InventoryDialog from './InventoryDialog';
import ProviderWrapper from '../../../ProviderWrapper';
import { AppStore } from '../../../state/app/AppStore';
import { ThermometerTool } from '../../../../game/tools/ThermometerTool';
import { InventoryRoute } from './InventoryRoute';

const withProvider = (story) => (
  <ProviderWrapper store={AppStore}>
    { story() }
  </ProviderWrapper>
);

storiesOf('Inventory', module)
    .addDecorator(withProvider)
    .add('InventoryDialog', () => (
        <InventoryRoute/>
    ));

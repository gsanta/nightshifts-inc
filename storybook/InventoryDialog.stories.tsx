import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ProviderWrapper from '../src/gui/ProviderWrapper';
import { AppStore } from '../src/gui/state/app_state/AppStore';
import { InventoryRoute } from '../src/gui/components/dialogs/inventory/InventoryRoute';

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

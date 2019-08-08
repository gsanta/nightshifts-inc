import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ProviderWrapper from '../../../../../src/client/ProviderWrapper';
import { AppStore } from '../../../../../src/client/state/app_state/AppStore';
import { InventoryRoute } from '../../../../../src/client/components/dialogs/inventory_dialog/InventoryRoute';

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

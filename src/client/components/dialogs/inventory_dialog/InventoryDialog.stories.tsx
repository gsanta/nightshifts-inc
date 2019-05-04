import { storiesOf } from '@storybook/react';
import * as React from 'react';
import ProviderWrapper from '../../../ProviderWrapper';
import { AppStore } from '../../../state/app_state/AppStore';
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

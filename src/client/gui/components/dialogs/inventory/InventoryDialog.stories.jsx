import { storiesOf } from '@storybook/react';
import * as React from 'react';
import InventoryDialog from './InventoryDialog';

storiesOf('InventoryDialog', module)
    .add('InventoryDialog', () => (
        <InventoryDialog
            tools={[
                {
                    isCarrying: true,
                    name: 'flashlight'
                }
            ]}
            grabTool={() => null}
            headerOptions={{close: () => null, title: 'inventory'}}
        />
    ));

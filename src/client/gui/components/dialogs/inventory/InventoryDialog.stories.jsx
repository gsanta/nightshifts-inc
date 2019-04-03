import { storiesOf } from '@storybook/react';
import * as React from 'react';
import InventoryDialog from './InventoryDialog';

storiesOf('InventoryDialog', module)
    .add('basic dialog', () => (
        <InventoryDialog tools={[]} grabTool={() => null}/>
    ));

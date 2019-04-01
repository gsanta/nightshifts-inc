import * as React from 'react';
import { DialogTemplate, wrapToDialog } from '../DialogTemplate';

const InventoryDialog = () => {
    return <div>Inventory</div>;
};

export default wrapToDialog(InventoryDialog, {
    colors: {
        header: '#B1D9FE',
        headerBorder: '#E2F1FF',
        body: '#389FFF'
    }
});

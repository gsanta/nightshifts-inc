import * as React from 'react';
import DialogTemplate from '../DialogTemplate';
import Settings from '../../../routes/settings/Settings';

const ApplicationSettingsDialog = () => {
    return <Settings/>;
};


export default DialogTemplate(ApplicationSettingsDialog, {
    colors: {
        header: '#FFDBA6',
        headerBorder: '#FF9D0A',
        body: '#FFF3E2'
    }
});

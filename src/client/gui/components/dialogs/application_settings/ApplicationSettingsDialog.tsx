import * as React from 'react';
import withDialog, { DialogTemplateProps } from '../dialog_template/withDialog';
import Settings from '../../../routes/settings/Settings';

const ApplicationSettingsDialog = (props: ApplicationSettingsDialogProps) => {
    return <Settings/>;
};


export default withDialog(ApplicationSettingsDialog, {
    colors: {
        header: '#FFDBA6',
        headerBorder: '#FF9D0A',
        body: '#FFF3E2'
    }
});


export interface ApplicationSettingsDialogProps extends DialogTemplateProps {
}

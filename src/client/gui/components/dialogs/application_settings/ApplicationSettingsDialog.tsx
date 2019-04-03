import DialogTemplate from './ApplicationSettingsDialog';


const ApplicationSettingsDialog = () => {
    return (<div>Settings</div>);
};


export default DialogTemplate(ApplicationSettingsDialog, {
    colors: {
        header: '#B1D9FE',
        headerBorder: '#389FFF',
        body: '#E2F1FF'
    }
});

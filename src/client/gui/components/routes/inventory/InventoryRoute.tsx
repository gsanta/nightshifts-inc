
import { AppState } from '../../../../state/root/RootState';
import GrabToolActions from '../../../../state/game/actions/GrabToolActions';
import { connect } from 'react-redux';
import { Tool } from '../../dialogs/inventory/Tool';
import InventoryDialog from '../../dialogs/inventory/InventoryDialog';


const mapStateToProps = (state: AppState) => {
    return {
        tools: state.tools
    };
};

const mapDispatchToProps = dispatch => ({
    grabTool: (tool: Tool) => dispatch(GrabToolActions.request(tool))
});

export const InventoryRoute = connect(mapStateToProps, mapDispatchToProps)(InventoryDialog);

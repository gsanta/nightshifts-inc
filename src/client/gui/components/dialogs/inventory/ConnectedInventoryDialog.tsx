import { AppState } from '../../../../state/root/RootState';
import { Tool } from './Tool';
import GrabToolActions from '../../../../state/game/actions/GrabToolActions';
import { connect } from 'react-redux';
import InventoryDialog from './InventoryDialog';


const mapStateToProps = (state: AppState) => {
    return {
        tools: state.tools
    };
};

const mapDispatchToProps = dispatch => ({
    grabTool: (tool: Tool) => dispatch(GrabToolActions.request(tool))
});

export const ConnectedInventoryDialog = connect(mapStateToProps, mapDispatchToProps)(InventoryDialog);

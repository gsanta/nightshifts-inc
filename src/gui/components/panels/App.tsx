import * as Mousetrap from 'mousetrap';
import * as React from 'react';
import { Route, withRouter } from 'react-router-dom';
import '../../../translations/config';
import { ControllerFacade } from '../../controller/ControllerFacade';
import { ApplicationSettingsRoute } from '../dialogs/application_settings/ApplicationSettingsRoute';
import { DebugRoute } from '../dialogs/debug/DebugRoute';
import { InventoryRoute } from '../dialogs/inventory/InventoryRoute';
import { LoginRoute } from '../dialogs/login/LoginRoute';
import { SignupRoute } from '../dialogs/signup/SignupRoute';
import { ControllerContext } from './Context';
import Game from './Game';
import Header from './Header';

class App extends React.Component<any, null> {
    static contextType = ControllerContext;
    context: ControllerFacade;

    componentDidMount() {
        this.context.renderController.setRender(() => this.forceUpdate());
    }


    constructor(props: any) {
        super(props);

        Mousetrap.bind('shift+i', () => {
            props.history.push('/inventory');
        });

        Mousetrap.bind('shift+d', () => {
            props.history.push('/debug');
        });
    }

    public render() {
        if (this.shouldRedirectToLoginPage()) {
            this.props.history.push('/login');
        }

        return (
            <div>
                <Header/>

                <Route path="/" render={() => <Game openInventory={() => this.props.history.push('/inventory')} />}/>

                <Route exact path="/settings" component={ApplicationSettingsRoute}/>
                <Route exact path="/inventory" component={InventoryRoute}/>
                <Route exact path="/login" component={LoginRoute}/>
                <Route exact path="/signup" component={SignupRoute}/>
                <Route exact path="/debug" component={DebugRoute}/>
            </div>
        );
    }

    private shouldRedirectToLoginPage() {
        return !this.context.userController.user &&
            this.props.history.location.pathname !== '/login' &&
            this.props.history.location.pathname !== '/signup';
    }
}


export default withRouter(App);

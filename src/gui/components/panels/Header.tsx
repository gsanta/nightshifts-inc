import withStyles from '@material-ui/styles/withStyles';
import * as React from 'react';
import styled from 'styled-components';
import { User } from '../../model/User';
import SettingsIcon from '../icons/SettingsIcon';
import SignoutIcon from '../icons/SignoutIcon';
import colors from '../miscellaneous/colors';
import { ControllerContext } from './Context';
import { ControllerFacade } from '../../controller/ControllerFacade';

const HeaderDiv = styled.div`
    width: 100%;
    height: 36px;
    background: ${colors.Gray2};
`;

const ProfileSection = styled.div`
    padding: 5px 10px;
`;

const styles = theme => ({
    menuButton: {
        // d.ts did not recognize textTransform so casting to any
        textTransform: 'none',
        color: colors.White
    } as any
});

class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: HeaderProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.handleOpenSettings = this.handleOpenSettings.bind(this);

        this.state = {
            anchorElement: null
        };
    }

    public render() {
        return (
            <ControllerContext.Consumer>
                {
                    (controllers: ControllerFacade) => {
                        const user = controllers.userController.user;

                        const getProfileSection = () => {
                            return (
                                <ProfileSection>
                                    <SettingsIcon activate={() => null}/>
                                    <SignoutIcon activate={() => controllers.userController.logout()}/>
                                </ProfileSection>
                            );
                        };

                        return (
                            <HeaderDiv>
                                {user ? getProfileSection() : null}
                            </HeaderDiv>
                        );
                    }
                }
            </ControllerContext.Consumer>
        )
    }

    private handleClick(event: React.SyntheticEvent<HTMLElement>) {
        this.setState({ anchorElement: event.currentTarget });
      }

    private handleClose() {
        this.setState({ anchorElement: null });
    }

    private handleOpenSettings() {
        this.props.history.push({
            pathname: '/settings'
        });
        this.setState({ anchorElement: null });
    }

    private handleSignOut() {
        this.setState({ anchorElement: null });
    }
}

const StyledHeader = withStyles(styles)(Header);

export default StyledHeader;

export interface HeaderState {
    anchorElement: HTMLElement | null;
}

export interface HeaderProps {
    classes?: any;
    history?: any;
}

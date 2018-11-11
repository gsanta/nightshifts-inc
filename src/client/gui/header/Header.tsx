import styled from 'styled-components';
import * as React from 'react';
import { colors } from '../styles';
import { UserModel } from '../../stores/UserModel';
import { Menu, MenuItem, Button } from '@material-ui/core';

const HeaderDiv = styled.div`
    width: 100%;
    height: 30px;
    background: ${colors.Brown};
`;

const ProfileSection = styled.div`
    float: right;
`;

export class Header extends React.Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            anchorElement: null
        };
    }

    public render() {
        const getProfileSection = () => {
            return (
                <ProfileSection>
                    <Button
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                    Open Menu
                    </Button>
                    <Menu
                        anchorEl={this.state.anchorElement}
                        open={!!this.state.anchorElement}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    </Menu>
                </ProfileSection>
            );
        };

        return (
            <HeaderDiv>
                {getProfileSection()}
                {/* {this.props.user ? getProfileSection() : null} */}
            </HeaderDiv>
        );
    }

    private handleClick(event: React.SyntheticEvent<HTMLElement>) {
        this.setState({ anchorElement: event.currentTarget });
      }

    private handleClose() {
        this.setState({ anchorElement: null });
    }
}

export interface HeaderState {
    anchorElement: HTMLElement;
}

export interface HeaderProps {
    user: UserModel;
}

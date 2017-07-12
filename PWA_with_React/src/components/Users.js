import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import {
    FloatingActionButton,
    Dialog,
    FlatButton,
    TextField
} from 'material-ui';
import ContentAddIcon from 'material-ui/svg-icons/content/add';

const databaseURL = 'https://react-pwa-29384.firebaseio.com';

const fabStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px'
};

class Users extends Component {
    state = {
        users: {},
        dialog: false
    };

    _get() {
        fetch(`${databaseURL}/users.json`)
            .then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }

                return res.json();
            })
            .then(users => this.setState({ users: users }));
    }

    _post(user) {
        return fetch(`${databaseURL}/users.json`, {
            method: 'POST',
            body: JSON.stringify(user)
        })
            .then(res => {
                if (res.status != 200) {
                    throw new Error(res.statusText);
                }

                return res.json();
            })
            .then(data => {
                this.state.users[data.name] = user;
            });
    }

    componentDidMount() {
        //     const databaseURL = 'https://react-pwa-29384.firebaseio.com';
        // fetch(`${databaseURL}/users.json`)
        //     .then(res => {
        //         if (res.status != 200) {
        //             throw new Error(res.statusText);
        //         }

        //         return res.json();
        //     })
        //     .then(users => this.setState({ users: users }));
        this._get();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextState.users != this.state.users ||
            nextState.dialog != this.state.dialog
        );
    }

    handleDialogToggle = () => this.setState({ dialog: !this.state.dialog });

    handleSubmit = () => {
        const user = {
            name: this.nameText.getValue()
        };
        if (!user.name) {
            this.handleDialogToggle();
            return;
        }

        this._post(user).then(this.handleDialogToggle);
    };

    render() {
        const users = () => {
            return Object.keys(this.state.users).map(id => {
                const user = this.state.users[id];
                return (
                    <Card key={id}>
                        <CardHeader
                            title={user.name}
                            style={{ marginButton: '0.3em' }}
                        />
                    </Card>
                );
            });
        };
        return (
            <div>
                {users()}
                <FloatingActionButton
                    style={fabStyle}
                    onTouchTap={this.handleDialogToggle}
                >
                    <ContentAddIcon />
                </FloatingActionButton>
                <Dialog
                    title="Adding New User"
                    actions={
                        <FlatButton
                            label="Submit"
                            primary={true}
                            onTouchTap={this.handleSubmit}
                        />
                    }
                    modal={false}
                    open={this.state.dialog}
                    onRequestClose={this.handleDialogToggle}
                >
                    <div>Input Your Name</div>
                    <TextField
                        hintText="Name"
                        name="name"
                        ref={ref => (this.nameText = ref)}
                    />
                </Dialog>
            </div>
        );
    }
}

export default Users;

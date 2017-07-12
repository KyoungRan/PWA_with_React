import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import { TextField, Snackbar } from 'material-ui';

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyBc3MYfRF5k5mF8GHyvZnYQSnpaItCNIdA',
    authDomain: 'react-pwa-29384.firebaseapp.com',
    databaseURL: 'https://react-pwa-29384.firebaseio.com',
    projectId: 'react-pwa-29384',
    storageBucket: 'react-pwa-29384.appspot.com',
    messagingSenderId: '122255839940'
};

class Notification extends Component {
    static firebaseApp;

    constructor(props) {
        super(props);

        if (!Notification.firebaseApp) {
            Notification.firebaseApp = firebase.initializeApp(config);
        }

        this.state = {
            token: '',
            toast: false,
            message: ''
        };
    }

    handleMessage = ({
        notification: { title = 'Title', body = 'Body' } = {}
    }) => {
        this.setState({
            toast: true,
            message: `${title}: ${body}`
        });
    };

    componentDidMount() {
        const messaging = firebase.messaging();
        messaging.onMessage(this.handleMessage);
        messaging
            .requestPermission()
            .then(() => messaging.getToken())
            .then(token => this.setState({ token: token }));
    }

    render() {
        const subtitleStyle = {
            wordWrap: 'break-word',
            wordBreak: 'break-all',
            hyphens: 'auto',
            padding: '10px'
        };

        return (
            <div>
                <Card>
                    <CardTitle
                        title={'Token'}
                        subtitle={this.state.token}
                        subtitleStyle={subtitleStyle}
                    />
                </Card>
                <Snackbar
                    open={this.state.toast}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={() => this.setState({ toast: false })}
                />
            </div>
        );
    }
}

export default Notification;

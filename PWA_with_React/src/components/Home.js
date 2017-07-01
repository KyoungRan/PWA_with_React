import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Home = () => {
    return (
        <Card>
            <CardTitle title="Hello! World" />
            <CardText>
                <ul>
                    <li>Web Manifest for installing</li>
                    <li>Service Worker for caching and offline</li>
                    <li>
                        Application Shell powered by
                        <a href="https://material-ui.com"> material-ui</a>
                    </li>
                    <li>PRPL pattern by code splitting</li>
                    <li>Opt in ES2015</li>
                </ul>
            </CardText>
        </Card>
    );
};

export default Home;

import React from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <br />
                <Body />
                <Footer />
            </div>
        );
    }
}
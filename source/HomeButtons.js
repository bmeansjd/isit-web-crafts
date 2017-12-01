import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
// import {black, red} from 'material-ui/styles/colors';

class HomeButtons extends React.Component {

    constructor() {
        super();

        this.state = {
            makeImage: 'Make Image',
            makeHtml: 'Make HTML'
        };
    }

    render() {
        return <MuiThemeProvider>
            <div>
                <h1>Home Page</h1>
                <RaisedButton
                    id="makeHtml"
                    style={buttonStyle}
                    primary={true}
                    onClick={this.makeHtml}>{this.state.makeHtml}</RaisedButton>
                <RaisedButton
                    style={buttonStyle}
                    primary={true}
                    onClick={this.makeImage}>{this.state.makeImage}</RaisedButton>
                <p>Select a button.</p>
                <p>This is a react component.</p>
            </div>
        </MuiThemeProvider>;
    };
}

var buttonStyle = {
    margin: '15px'
};

export default HomeButtons;
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MakeHtml from './MakeHtml';
import MakeHtmlHomeButton from './MakeHtmlHomeButton';
import MakeHtmlDropDowns from './MakeHtmlDropDowns';

import 'whatwg-fetch';

const styles = {
    customWidth: {
        width: 500,
    },
};

const items = [];

class MakeHtmlDropDowns extends React.Component {


    constructor() {
        super();

        this.state = {
            makeImage: 'Make Image',
            makeHtml: 'Make HTML',
            value: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, index, value) {
        this.setState({value});
    }

    /**
     * @typedef {Object} configSummary
     * @property {Object} siteDirs
     * @property {Object} destinationDirs
     * @property {String} baseDir
     * @property {String} mostRecentDate
     */
    loadConfig() {
        const that = this;
        fetch('/makers/config')
            .then(function (response) {
                return response.json();
            })
            .then(function (configSummary) {
                //console.log('parsed json', JSON.stringify(configSummary, null, 4));
                items.length = 0;
                configSummary.siteDirs.forEach(function (dir, index) {
                    const showDir = configSummary.baseDir + dir;
                    items.push(<MenuItem value={index} key={index} primaryText={showDir} />);
                });
            })
            .catch(function (ex) {
                console.log('parsing failed', ex);
            });
    }

    componentDidMount() {
        this.loadConfig();
    }

    render() {
        return <MuiThemeProvider>
            <div>
                <h1>Home Page</h1>
                <DropDownMenu
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={styles.customWidth}
                    autoWidth={false}
                >
                    {items}
                </DropDownMenu>

                <p>This is a DropDown component.</p>
            </div>
        </MuiThemeProvider>
    };
}

var buttonStyle = {
    margin: '15px'
};

export default MakeHtmlDropDowns;
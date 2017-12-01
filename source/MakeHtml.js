import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MakeHtml from './MakeHtml';
import MakeHtmlHomeButton from './MakeHtmlHomeButton';
import MakeHtmlDropDowns from './MakeHtmlDropDowns';


class MakeHtml extends React.Component {
    render() {

        return <MuiThemeProvider>
            <div>
                <MakeHtmlHomeButton/>
                <MakeHtmlDropDowns/>
            </div>
        </MuiThemeProvider>;
    };
}

export default MakeHtml;
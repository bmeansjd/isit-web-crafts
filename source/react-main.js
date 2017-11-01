import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from './ReactHome';

$(document).ready(function() {
    const home = document.getElementById('home');
    ReactDOM.render(<ReactHome/>, home);
});
import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from './ReactHome';
import MakeHtml from './MakeHtml';

let homeDiv = null;

function reactMakeHtml(event, customMessage) {
    ReactDOM.render(<MakeHtml/>, homeDiv);
}

function reactHome() {
    $('#pageLoad').load('/empty', function () {
        home();
    });
}

function home() {
    ReactDOM.render(<ReactHome/>, homeDiv);
}

$(document).ready(function () {
    homeDiv = document.getElementById('home');
    home();
    $.subscribe('reactMakeHtml', reactMakeHtml);
    $.subscribe('home', reactHome);
});
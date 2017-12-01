import React from 'react';
import ReactDOM from 'react-dom';
import ReactHome from '../Reacthome';
import HomeButtons from '../HomeButtons';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ElfDebugEnzyme from '../ElfDebugEnzyme';
const elfDebugEnzyme = new ElfDebugEnzyme(true, 'sanity');
configure({adapter: new Adapter()});
import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;
import '../fake-pub-sub';
import raf from '../temp-poly-fills';

describe('Basic Sanity Test', function() {

    'use strict';

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });
    it('tests if we can load ReactHome',() => {
        const div = document.createElement('div');
        ReactDoom.render(<ReactHome/>, div);
    })

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ReactHome/>, div);
    });

    it('renders default value of H1 tag', () => {
        const wrapper = shallow(<ReactHome/>);
        const h1tag = <h1>An H1 element in a React Component</h1>;
        elfDebugEnzyme.getLast(wrapper, 'h1', true);
        expect(wrapper.contains(h1tag)).toEqual(true);
    });

    it('publishes clientMakeHtml event after button click', () => {
        const wrapper = shallow(<HomeButtons/>);
        let subscriptionCalled = false;
        $.subscribe('clientMakeHtml', (event, target) => {
            console.log(JSON.stringify(event, null, 4));
            console.log(target);
            expect(event.type).toBe('clientMakeHtml');
            expect(target.message).toBe('The user wants to makeHtml.');
            subscriptionCalled = true;
        });
        wrapper.find('#makeHtml').simulate('click');
        expect(subscriptionCalled).toBeTruthy();
    });

    it('publishes clientMakeHtml event after button click with done', (done) => {
        const wrapper = shallow(<HomeButtons/>);
        $.subscribe('clientMakeHtml', (event, target) => {
            expect(target.message).toBe('The user wants to makeHtml.');
            done();
        });
        wrapper.find('#makeHtml').simulate('click');
    });
});
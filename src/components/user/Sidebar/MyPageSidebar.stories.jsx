import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyPageSidebar from './MyPageSidebar';

export default {
    title: 'Sidebar',
    component: MyPageSidebar,
    parameters: {
        docs: {
            inlineStories: false,
        },
    },
};

const Template = (args) => (
    <Router>
        <MyPageSidebar {...args} />
    </Router>
);

export const MypageSidebar = Template.bind({});
MypageSidebar.args = {};

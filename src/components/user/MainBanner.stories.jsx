import React from 'react';
import MainBanner from './MainBanner';

export default {
    title: 'MainBanner',
    component: MainBanner,
    tags: ["autodocs"],
    argType: {},
}

const Template = (args) => <MainBanner {...args} />;

export const Default = Template.bind({});
Default.args = {};

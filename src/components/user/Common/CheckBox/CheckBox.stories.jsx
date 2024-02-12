import React from "react";
import CheckBox from "./CheckBox";

export default {
    title: "CheckBox",
    component: CheckBox,
    tags: ['autodocs'],
}

const Template = (args) => <CheckBox {...args} />;

export const Checked = Template.bind({});
Checked.args = {
    checked: true,
};

export const Unchecked = Template.bind({});
Unchecked.args = {
    checked: false,
}
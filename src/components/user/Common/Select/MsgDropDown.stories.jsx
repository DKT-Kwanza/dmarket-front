import React from "react";
import MsgDropDown from "./MsgDropdown";

export default {
    title: "Select",
    component: MsgDropDown,
    tags: ["autodocs"],
}

const Template = (args) => <MsgDropDown {...args} />;

export const TextDropDown = Template.bind({});
TextDropDown.args = {
    value: "hi",
}
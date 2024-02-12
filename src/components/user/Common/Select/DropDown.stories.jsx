import React from "react";
import DropDown from "./Dropdown";

export default {
    title: "Select",
    component: DropDown,
    tags: ["autodocs"],
}

const Template = (args) => <DropDown {...args} />;

export const DefaultDropDown = Template.bind({});
DefaultDropDown.args = {

}
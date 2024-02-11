import React from "react";
import Filter from "./Filter";
import Dropdown from "../Select/Dropdown";

export default {
    title: "Filter",
    component: Filter,
    tags: ['autodocs'],
}

const Template = (args) => <Filter {...args} />;

export const DefaultFilter = Template.bind({});
DefaultFilter.args = {
    setMinPrice: () => {},
    setMaxPrice: () => {},
    setStar: () => {},
    setSorter: () => {},
};
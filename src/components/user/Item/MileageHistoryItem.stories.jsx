import React from "react";
import MileageHistoryItem from "./MileageHistoryItem";

export default {
    title: "Item/MileageItem",
    component: MileageHistoryItem,
    tags: ["autodocs"],
    argType: {},
}

const Template = (args) => <MileageHistoryItem {...args} />;

export const DefaultMileageItem = Template.bind({});
DefaultMileageItem.args = {
    date: "2024.02.13",
    contents: "물건 구매",
    addMileage: -484200,
    curMileage: 652120,
}

export const Secondary = Template.bind({});
Secondary.args = {
    date: "2024.02.13",
    contents: "충전",
    addMileage: 484200,
    curMileage: 652120,
}
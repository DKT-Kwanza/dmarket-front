import React from "react";
import InquiryItem from "./InquiryItem";

export default {
    title: "Item/InquiryItem",
    component: InquiryItem,
    tags: ["autodocs"],
    argType: {},
}

const Template = (args) => <InquiryItem {...args} />;

export const DefaultInquiryItem = Template.bind({});
DefaultInquiryItem.args = {
}
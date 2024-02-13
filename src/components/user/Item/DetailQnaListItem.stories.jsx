import React from "react";
import DetailQnaListItem from "./DetailQnaListItem";

export default {
    title: "Item/QnaItem",
    component: DetailQnaListItem,
    tags: ["autodocs"],
    argTypes: {},
}

const Template = (args) => <DetailQnaListItem {...args} />;

export const QNA = Template.bind({});
QNA.args = {}
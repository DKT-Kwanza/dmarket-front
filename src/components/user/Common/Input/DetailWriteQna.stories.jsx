import React from "react";
import DetailWriteQna from "./DetailWriteQna";

export default {
    title: "Input/QnaInput",
    component: DetailWriteQna,
    tags: ['autodocs'],
}

const Template = (args) => <DetailWriteQna {...args} />;
export const DefaultQnaInput = Template.bind({});
DefaultQnaInput.args = {

};
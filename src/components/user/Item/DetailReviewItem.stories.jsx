import React from "react";
import DetailReviewItem from "./DetailReviewItem";

export default {
    title: "ReviewItem",
    component: DetailReviewItem,
    tags: ["autodocs"],
    argType: {},
}

const Template = (args) => <DetailReviewItem {...args} />;

export const ReviewItem = Template.bind({});
ReviewItem.args = {}
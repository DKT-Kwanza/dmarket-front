import React from "react";
import StarRating from "./StarRating";

export default {
    title: "StarRating",
    component: StarRating,
    tags: ["autodocs"],
}

const Template = (args) => <StarRating {...args} />;

export const DefaultStarRating = Template.bind({});
DefaultStarRating.args = {
    rating: 3.8
}
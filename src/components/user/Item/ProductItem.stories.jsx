import React from "react";
import ProductItem from "./ProductItem";

export default {
    title: "Item/ProductItem",
    component: ProductItem,
    argType: {},
}

const Template = (args) => <ProductItem {...args} />

export const Secondary = Template.bind({});
Secondary.args = {};
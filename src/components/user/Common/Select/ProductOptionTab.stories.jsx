import React from "react";
import ProductOptionTab from "./ProductOptionTab";

export default {
    title: "OptionTab",
    component: ProductOptionTab,
    tags: ['autodocs'],
}

const Template = (args) => <ProductOptionTab {...args} />;
export const DefaultOptionTab = Template.bind({});
DefaultOptionTab.args = {
    name: '[메르베] 귤귤 신생아 우주복',
    option: {
        "optionId": 1,
        "optionName": "사이즈",
        "optionValue": "70",
        "optionQuantity": 4
    },
    onCountChange: ({count, optionId}) => {
        console.log(`Count: ${count}, Option ID: ${optionId}`);
    }
};
import React from "react";
import OrderInfo from "./OrderInfo";

export default {
    title: "Info/OrderInfo",
    component: OrderInfo,
    tags: ["autodocs"],
    argTypes: {},
};

const Template = (args) => <OrderInfo {...args} />;

export const OrderInfoData = Template.bind({});
OrderInfoData.args = {
    orderDate: "2024.02.13",
    orderId: "202401059270F",
};

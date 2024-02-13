import React from "react";
import OrderHistoryInfo from "./OrderHistoryInfo";

export default {
    title: "Info/OrderHistoryInfo",
    component: OrderHistoryInfo,
    tags: ["autodocs"],
    argTypes: {},
};

const Template = (args) => <OrderHistoryInfo {...args} />;

export const OrderHistoryInfoData = Template.bind({});
OrderHistoryInfoData.args = {
    orderDate: "2024.02.13",
    orderId: "202401059270F",
};

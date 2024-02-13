import React from "react";
import OrderItem from "./OrderItem";

export default {
    title: "Item/OrderItem",
    component: OrderItem,
    tags: ["autodocs"],
    argType: {},
}

const Template = (args) => <OrderItem {...args} />;

export const DefaultOrderItem = Template.bind({});
DefaultOrderItem.args = {
    productImg: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/c55db96a-9800-471e-9192-da1c0851c621.jpeg",
    productBrand: "에코트렌드",
    productName: "시크릿 폴딩 책상 접이식 확장형 테이블",
    productOption: "화이트",
    productCount: 1,
    productTotalSalePrice: 161400
};
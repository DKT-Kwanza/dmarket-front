import React from "react";
import ProductItem from "./ProductItem";

export default {
    title: "Item/ProductItem",
    component: ProductItem,
    argType: {},
}

const Template = (args) => <ProductItem {...args} />

export const Secondary = Template.bind({});
Secondary.args = {
    brand: "UNOVE",
    productName: "실크 오일 에센스 70ml + 히팅 가드 노워시 트리트먼트 40ml",
    imgSrc: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/0fcff010-6099-4cf8-bf6d-6cd0bfd3085c.jpeg",
    sales: "32000",
    ratingAvg: 3.2,
    reviewCnt: 3,
    discountRate: "45",
    onClick: () => {},
};
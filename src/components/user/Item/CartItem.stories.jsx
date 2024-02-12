import React from "react";
import CartItem from "./CartItem";

export default {
    title: "Item",
    component: CartItem,
    tags: ["autodocs"],
}

const Template = (args) => <CartItem {...args} />;

export const Cart = Template.bind({});
Cart.args = {
    cartId: 8,
    optionId: 302,
    brand: "H&M",
    quantity: 3,
    productId: 151,
    productImg: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/a75a7a11-c10c-4566-8175-11465c59515c.avif",
    productName: "파인 니트 가디건 블랙 0579541001",
    option: "S(EUR S/P)",
    price: 47760,
};
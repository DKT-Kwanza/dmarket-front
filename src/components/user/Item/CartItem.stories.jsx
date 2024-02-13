import React from "react";
import CartItem from "./CartItem";

export default {
    title: "Item/CartItem",
    component: CartItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 장바구니 상품 아이템 컴포넌트',
        docs: { 
          description: {
            component:
              `장바구니 화면에서 카트에 표시되는 개별 상품을 나타내는 컴포넌트입니다.`,
          },
        },
    },
    argTypes: {
        cartId: {
            description: "카트 아이템의 고유 식별 아이디 입니다.",
            control: {
                type: "number",
            },
            table: {
                type: { summary: 'number' },
            },
        },
        optionId: {
            description: "카트 아이템의 선택 옵션 식별 아이디 입니다.",
            control: {
                type: "number",
            },
            table: {
                type: { summary: 'number' },
            },
        },
        brand: {
            description: "상품 브랜드 이름입니다.",
            control: {
                type: "text",
            },
            table: {
                type: { summary: 'string' },
            },
        },
        quantity: {
            description: "상품 수량입니다.",
            control: {
                type: "number",
            },
            table: {
                type: { summary: 'number' },
            },
        },
        productId: {
            description: "상품 식별자입니다.",
            control: {
                type: "number",
            },
            table: {
                type: { summary: 'number' },
            },
        },
        productImg: {
            description: "상품 이미지 URL입니다.",
            control: {
                type: "string",
            },
            table: {
                type: { summary: 'string' },
            },
        },
        productName: {
            description: "상품 이름입니다.",
            control: {
                type: "text",
            },
            table: {
                type: { summary: 'string' },
            },
        },
        option: {
            description: "선택된 옵션 정보입니다.",
            control: {
                type: "text",
            },
            table: {
                type: { summary: 'string' },
            },
        },
        price: {
            description: "상품 가격입니다.",
            control: {
                type: "number",
            },
            table: {
                type: { summary: 'number' },
            },
        },
    },
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
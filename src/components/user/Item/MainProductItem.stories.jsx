import React from "react";
import MainProductItem from "./MainProductItem";

export default {
    title: "Item/ProductItem",
    component: MainProductItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 제품 정보',
        docs: { 
            description: {
                component:
                `메인 페이지에서 사용합니다. \n\n 마우스 호버 효과가 적용됩니다.`,
            },
        },
    },
    argTypes: {
        brand: {
            description: '제품 브랜드명입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
        productName: {
            description: '제품명입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
        productImg: {
            description: '제품 이미지 URL입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
        sales: {
            description: '제품 판매가입니다.',
            table: {
                type: { summary: 'Integer' },
            },
            control: { type: 'number' }
        },
        discountRate: {
            description: '제품 할인율입니다.',
            table: {
                type: { summary: 'Integer' },
            },
            control: { type: 'number' }
        },
    }
}

const Template = (args) => <MainProductItem {...args} />;

export const DefaultProductItem = Template.bind({});
DefaultProductItem.args = {
    brand: "UNOVE",
    productName: "실크 오일 에센스 70ml + 히팅 가드 노워시 트리트먼트 40ml",
    productImg: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/0fcff010-6099-4cf8-bf6d-6cd0bfd3085c.jpeg",
    sales: 32000,
    discountRate: 45,
}
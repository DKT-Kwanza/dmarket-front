import React from "react";
import OrderItem from "./OrderItem";

export default {
    title: "Item/OrderItem",
    component: OrderItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 주문 상품 정보',
        docs: { 
            description: {
                component:
                `마이 페이지의 주문/배송 조회, 주문 상세 조회, 상품 리뷰 페이지에서 사용합니다.`,
            },
        },
    },
    argTypes: {
        productImg: {
            description: '제품 이미지 URL입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
        productBrand: {
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
        productOption: {
            description: '제품 옵션명입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
        productCount: {
            description: '제품 수량입니다.', 
            table: {
                type: { summary: 'Int' },
            },
            control: { type: 'number' }
        },
        productTotalSalePrice: {
            description: '제품의 총 판매 가격입니다.', 
            table: {
                type: { summary: 'Int' },
            },
            control: { type: 'number' }
        },
    },
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
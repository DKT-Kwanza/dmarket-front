import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import OrderHistoryItem from "./OrderHistoryItem";

export default {
    title: "Item/OrderHistoryItem",
    component: OrderHistoryItem,
    decorators: [(Story) => (<Router><Story/></Router>)],
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 주문 정보',
        docs: { 
            description: {
                component:
                `마이 페이지의 주문/배송 조회, 주문 상세 조회, 상품 리뷰 페이지에서 사용합니다.`,
            },
        },
    },
    argTypes: {
        orderDate: {
            description: '주문 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
        },
        orderId: {
            description: '주문 번호입니다.',
            table: {
                type: { summary: 'Long' },
            },
        },
        orderItems: {
            description: '주문 상품 목록입니다.',
        },
    }
}

const Template = (args) => <OrderHistoryItem {...args} />;

export const OrderItemData = Template.bind({});
OrderItemData.args = {
    orderDate: "2024-02-13",
    orderId: 202401059270,
    orderItems: [
        {
            productBrand: "UNOVE",
            productName: "실크 오일 에센스 70ml + 히팅 가드 노워시 트리트먼트 40ml",
            productImg: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/0fcff010-6099-4cf8-bf6d-6cd0bfd3085c.jpeg",
            productOption: "단일 상품",
            productTotalSalePrice: "32000",
            orderStatus: "결제 완료",
            productCount: 1,
        }
    ],
};

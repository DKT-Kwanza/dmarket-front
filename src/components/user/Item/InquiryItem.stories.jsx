import React from "react";
import InquiryItem from "./InquiryItem";

export default {
    title: "Item/InquiryItem",
    component: InquiryItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 문의 정보',
        docs: { 
            description: {
                component:
                `마이 페이지의 고객문의 페이지에서 사용합니다.`,
            },
        },
    },
    argTypes: {
        category: { 
            description: '문의 유형입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        title: { 
            description: '문의 제목입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        createdAt: { 
            description: '문의 작성 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
            control: 'date', 
        },
        status: { 
            description: '문의 답변 상태입니다.',
            table: {
                type: { summary: 'Boolean' },
            },
            control: 'boolean', 
        },
    },
}

const Template = (args) => <InquiryItem {...args} />;

/**
 * 문의에 대한 답변을 대기할 때 UI 입니다.
 */
export const DefaultInquiryItem = Template.bind({});
DefaultInquiryItem.args = {
    category: '마일리지',
    title: '마일리지 충전은 어떻게 하나요?',
    createdAt: '2024-02-13',
    status: false,
}

/**
 * 문의에 대한 답변이 완료됐을 때 UI 입니다.
 */
export const CompleteInquiryItem = Template.bind({});
CompleteInquiryItem.args = {
    category: '반품/환불',
    title: '환불은 언제되나요?',
    createdAt: '2024-02-10',
    status: true,
}
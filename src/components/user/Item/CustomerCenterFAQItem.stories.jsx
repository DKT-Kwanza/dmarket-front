import React, { useState } from "react";
import CustomerCenterFAQItem from "./CustomerCenterFAQItem";

export default {
    title: "Item/FAQItem",
    component: CustomerCenterFAQItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 FAQ 정보',
        docs: { 
            description: {
                component:
                `고객센터 페이지의 FAQ 탭에서 사용합니다. \n\n 마우스 클릭 시 상세 내용을 확인할 수 있습니다.`,
            },
        },
    },
    argTypes: {
        faqTitle: { 
            description: 'FAQ 제목입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        children: { 
            description: 'FAQ 내용입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
    }
}

const Template = (args) => {
    const [isExpanded, setExpanded] = useState(args.isExpanded);

    const onToggle = () => {
        setExpanded(!isExpanded);
    };

    return <CustomerCenterFAQItem {...args} isExpanded={isExpanded} onToggle={onToggle} />;
};

export const FAQ = Template.bind({});
FAQ.args = {
    faqTitle: "반품 / 교환 신청 시 주의사항이 있나요?",
    children: "단순변심 및 사이즈/색상 불만에 관련된 교환/반품 신청은 배송완료 후 7일 이내(주말/공휴일 포함)에 가능합니다.",
};
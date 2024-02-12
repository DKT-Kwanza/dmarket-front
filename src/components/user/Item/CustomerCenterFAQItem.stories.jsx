import React, { useState } from "react";
import CustomerCenterFAQItem from "./CustomerCenterFAQItem";

export default {
    title: "Item",
    component: CustomerCenterFAQItem,
    tags: ["autodocs"],
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
    faqId: 1,
    faqTitle: "반품 / 교환 신청 시 주의사항이 있나요?",
    faqType: "반품/환불",
    children: "단순변심 및 사이즈/색상 불만에 관련된 교환/반품 신청은 배송완료 후 7일 이내(주말/공휴일 포함)에 가능합니다.",
};
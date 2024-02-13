import React, {useState} from "react";
import CustomerCenterNoticeItem from "./CustomerCenterNoticeItem";

export default {
    title: "NoticeItem",
    component: CustomerCenterNoticeItem,
    tags: ["autodocs"],
    argTypes: {},
}

const Template = (args) => {
    const [isExpanded, setExpanded] = useState(args.isExpanded);

    const onToggle = () => {
        setExpanded(!isExpanded);
    };

    return <CustomerCenterNoticeItem {...args} isExpanded={isExpanded} onToggle={onToggle} />
};

export const Notice = Template.bind({});
Notice.args = {
    noticeTitle: "메인서비스 점검 안내",
    noticeCreatedDate: "2024.02.13",
    children: "안녕하세요. DmarKeT 입니다. 보다 안정적이고 편리한 서비스 제공을 위해 아래와 같이 사이트 점검이 진행될 예정입니다."
}
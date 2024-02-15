import React, {useState} from "react";
import CustomerCenterNoticeItem from "./CustomerCenterNoticeItem";

export default {
    title: "Item/NoticeItem",
    component: CustomerCenterNoticeItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 공지사항 정보',
        docs: { 
            description: {
                component:
                `고객센터 페이지의 공지사항 탭에서 사용합니다. \n\n 마우스 클릭 시 상세 내용을 확인할 수 있습니다.`,
            },
        },
    },
    argTypes: {
        noticeTitle: { 
            description: '공지사항 제목입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        noticeCreatedDate: { 
            description: '공지사항 작성 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
            control: 'date', 
        },
        children: { 
            description: '공지사항 내용입니다.',
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

    return <CustomerCenterNoticeItem {...args} isExpanded={isExpanded} onToggle={onToggle} />
};

export const Notice = Template.bind({});
Notice.args = {
    noticeTitle: "메인서비스 점검 안내",
    noticeCreatedDate: "2024.02.13",
    children: "안녕하세요. DmarKeT 입니다. 보다 안정적이고 편리한 서비스 제공을 위해 아래와 같이 사이트 점검이 진행될 예정입니다."
}
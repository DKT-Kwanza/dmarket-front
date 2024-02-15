import React, {useState} from "react";
import DetailQnaListItem from "./DetailQnaListItem";
import DetailQnaReply from "../DetailQnaReply";

export default {
    title: "Item/QnaItem",
    component: DetailQnaListItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 상품 Q&A 정보',
        docs: { 
            description: {
                component:
                `상세 페이지의 상품 Q&A 탭에서 사용합니다. \n\n 마우스 클릭 시 상세 내용을 확인할 수 있습니다.`,
            },
        },
    },
    argTypes: {
        title: { 
            description: '상품 Q&A 제목입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        createdAt: { 
            description: '상품 Q&A 작성 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
            control: 'date', 
        },
        status: { 
            description: '상품 Q&A 답변 상태입니다.',
            table: {
                type: { summary: 'Boolean' },
            },
            control: 'boolean', 
        },
        writer: { 
            description: '상품 Q&A 작성자 이름입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        content: { 
            description: '상품 Q&A 내용입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        qnaReplyContent: { 
            description: '상품 Q&A 답변 내용입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        replyAt: { 
            description: '상품 Q&A 답변 작성 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
            control: 'date', 
        },
    },
}

const Template = (args) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded); 
    };

    return (
        <div>
            <DetailQnaListItem {...args} onClick={handleClick} />
            {isExpanded && <DetailQnaReply {...args} onClose={() => setIsExpanded(false)} />}
        </div>
    );
};

/**
 * 상품 Q&A에 대한 답변을 대기할 때 UI 입니다.
 */
export const QNA = Template.bind({});
QNA.args = {
    title: '입고 예정된 다른 색상이 있나요?',
    createdAt: '2024-02-13',
    status: false,
    writer: '강춘식',
    content: "블랙으로 사고싶어요.",
    qnaReplyContent: null, 
    replyAt: null,
}


/**
 * 상품 Q&A에 대한 답변이 완료됐을 때 UI 입니다.
 */
export const CompleteQNA = Template.bind({});
CompleteQNA.args = {
    title: '오늘 주문하면 배송이 언제 시작될까요?',
    createdAt: '2024-02-11',
    status: true,
    writer: '강춘식',
    content: "빨리 입고싶어요",
    qnaReplyContent: "오늘 14시 이전 주문건은 내일 배송될 예정입니다.", 
    replyAt: '2024-02-12', 
}
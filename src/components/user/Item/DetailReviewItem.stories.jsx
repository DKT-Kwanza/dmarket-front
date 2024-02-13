import React from "react";
import DetailReviewItem from "./DetailReviewItem";

export default {
    title: "Item/ReviewItem",
    component: DetailReviewItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 리뷰 정보',
        docs: { 
            description: {
                component:
                `상세 페이지의 리뷰 탭에서 사용합니다.`,
            },
        },
    },
    argTypes: {
        rating: { 
            description: '리뷰 별점 점수입니다.' ,
            table: {
                type: { summary: 'Float' },
            },
        },
        writer: { 
            description: '리뷰 작성자 이름입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        reviewDate: { 
            description: '리뷰 작성 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
            control: 'date', 
        },
        option: { 
            description: '구매한 상품 옵션입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
        content: { 
            description: '리뷰 내용입니다.' ,
            table: {
                type: { summary: 'String' },
            },
        },
    }
}

const Template = (args) => <DetailReviewItem {...args} />;

/**
 * 기본 리뷰 UI 입니다.
 */
export const DefaultReviewItem = Template.bind({});
DefaultReviewItem.args = {
    rating: 5,
    writer: "단무지",
    reviewDate: "2024-02-13T02:00:48.869032",
    option: "오크",
    content: "사이즈가 딱 맞아요! 할인 중에 싸게 사서 좋네요~",
}

/**
 * 리뷰에 이미지를 첨부했을 때 UI 입니다.
 */
export const ImgReviewItem = Template.bind({});
ImgReviewItem.args = {
    imageSrc: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/dd78e3ab-eaee-4e9d-8bff-29f850f45ba8.avif",
    rating: 5,
    writer: "단무지",
    reviewDate: "2024-02-13T02:00:48.869032",
    option: "오크",
    content: "사이즈가 딱 맞아요! 할인 중에 싸게 사서 좋네요~",
}
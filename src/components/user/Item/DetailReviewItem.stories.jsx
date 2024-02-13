import React from "react";
import DetailReviewItem from "./DetailReviewItem";

export default {
    title: "ReviewItem",
    component: DetailReviewItem,
    tags: ["autodocs"],
    argType: {},
}

const Template = (args) => <DetailReviewItem {...args} />;

export const DefaultReviewItem = Template.bind({});
DefaultReviewItem.args = {
    rating: 5,
    writer: "단무지",
    reviewDate: "2024-02-13T02:00:48.869032",
    option: "오크",
    content: "사이즈가 딱 맞아요! 할인 중에 싸게 사서 좋네요~",
}

export const ImgReviewItem = Template.bind({});
ImgReviewItem.args = {
    imageSrc: "https://objectstorage.kr-gov-central-1.kakaoicloud-kr-gov.com/v1/39bc86c47cb241ef8d713f6d8f92fd9d/kwanza-object/dd78e3ab-eaee-4e9d-8bff-29f850f45ba8.avif",
    rating: 5,
    writer: "단무지",
    reviewDate: "2024-02-13T02:00:48.869032",
    option: "오크",
    content: "사이즈가 딱 맞아요! 할인 중에 싸게 사서 좋네요~",
}
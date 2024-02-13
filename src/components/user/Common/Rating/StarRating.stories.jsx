import React from "react";
import StarRating from "./StarRating";

export default {
    title: "StarRating",
    component: StarRating,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 별점 평가를 보여주는 컴포넌트',
        docs: { 
          description: {
            component:
              `별점 평가를 보여주는 컴포넌트에서 사용됩니다.`,
          },
        },
    },
    argTypes: {
        rating: {
          description: '별점 평가 점수를 입력합니다.',
          table: {
            type: { summary: 'number' },
          },
          defaultValue: { summary: '0' },
          control: 'number',
        },
        style: {
          description: '평가 텍스트 표시 여부를 결정합니다. \ntrue 일 시 평가 텍스트를 표시하지 않습니다.',
          table: {
            type: { summary: 'boolean' },
          },
          defaultValue: { summary: 'false' },
          control: 'boolean',
        },
      },
}

const Template = (args) => <StarRating {...args} />;

export const FullStarRating = Template.bind({});
FullStarRating.args = {
  rating: 5,
  style: false,
};
FullStarRating.parameters = {
  docs: {
    description: {
      story: '5점 별점 평가를 보여줍니다.',
    },
  },
};

export const HalfStarRating = Template.bind({});
HalfStarRating.args = {
  rating: 2.5,
  style: false,
};
HalfStarRating.parameters = {
  docs: {
    description: {
      story: '2.5점 별점 평가를 보여줍니다.',
    },
  },
};

export const StyledRatingWithoutText = Template.bind({});
StyledRatingWithoutText.args = {
  rating: 4.5,
  style: true,
};
StyledRatingWithoutText.parameters = {
  docs: {
    description: {
      story: '4.5점 별점 평가를 텍스트 없이 보여줍니다.',
    },
  },
};
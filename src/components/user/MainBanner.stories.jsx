import React from 'react';
import MainBanner from './MainBanner';

export default {
    title: 'MainBanner',
    component: MainBanner,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 메인 배너',
        docs: { 
          description: {
            component:
              `메인 페이지에 사용되는 배너 컴포넌트입니다. 자동으로 이미지가 전환되며, 일시 정지 기능이 포함되어 있습니다.`,
          },
        },
    },
    argType: {},
}

const Template = (args) => <MainBanner {...args} />;

export const DefaultBanner = Template.bind({});
DefaultBanner.args = {};
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyPageSidebar from './MyPageSidebar';

export default {
    title: 'Sidebar',
    component: MyPageSidebar,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 마이페이지 사이드바 컴포넌트',
        docs: { 
          description: {
            component:
              `마이페이지에서 사용되는 사이드바 컴포넌트입니다. 각 섹션별로 버튼이 제공되며, 현재 페이지에 따라 활성화 상태가 변경됩니다.`,
          },
        },
    },
};

const Template = (args) => (
    <Router>
        <MyPageSidebar {...args} />
    </Router>
);

export const MypageSidebar = Template.bind({});
MypageSidebar.args = {};

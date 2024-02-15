import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Footer from "./Footer";

export default {
    title: "Footer",
    component: Footer,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 기본 푸터',
        docs: { 
          description: {
            component:
              `기본 푸터 컴포넌트입니다. 회사 정보, 서비스 관련 링크 및 연락처 등을 포함하고 있습니다.`,
          },
        },
    },
}

const Template = () => (
    <Router>
        <Footer />
    </Router>
);

export const DefaultFooter = Template.bind({});
DefaultFooter.args = {};
import React from "react";
import DropDown from "./Dropdown";

export default {
    title: "Select",
    component: DropDown,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle: '사용자 UI에서 상품 목록 정렬을 위한 드롭다운 컴포넌트',
        docs: {
          description: {
            component:
              '상품 목록에서 사용되는 드롭다운 컴포넌트로, 정렬 옵션을 선택할 수 있습니다.',
            },
            },
        },
        argTypes: {
            setSorter: {
            description: '상품 목록을 정렬하는 함수를 설정합니다.',
            table: {
                type: { summary: 'function' },
            },
            control: false,
        },
    },
}

const Template = (args) => <DropDown {...args} />;

export const DefaultDropDown = Template.bind({});
DefaultDropDown.args = {
    setSorter: (value) => console.log(`Selected sorting option: ${value}`),
};

DefaultDropDown.parameters = {
    docs: {
      description: {
        story:
          '기본 드롭다운 컴포넌트입니다. `setSorter` 함수를 제공하여 정렬 옵션을 선택할 수 있습니다.',
      },
    },
};
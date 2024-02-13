import React from "react";
import ProductOptionTab from "./ProductOptionTab";

export default {
    title: "OptionTab",
    component: ProductOptionTab,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 옵션 탭 컴포넌트',
        docs: { 
          description: {
            component:
              '상품 상세 페이지에서 옵션 선택 시 나타나는 옵션 탭 컴포넌트 입니다. \n\n기본 상품 옵션 탭 컴포넌트입니다. `option`, `name`, `onCountChange` 등을 프로퍼티로 받아 사용합니다.',
          },
        },
    },
    argTypes: {
        option: {
          description: '표시할 상품 옵션 정보를 나타내는 객체입니다.',
          table: {
            type: { summary: 'object' },
          },
          control: 'object',
        },
        name: {
          description: '표시할 상품 옵션의 이름입니다.',
          table: {
            type: { summary: 'string' },
          },
          control: 'text',
        },
        onCountChange: {
          description: '상품 수량이 변경될 때 호출되는 콜백 함수입니다.',
          action: 'onCountChange',
        },
    },
}

const Template = (args) => <ProductOptionTab {...args} />;
export const DefaultOptionTab = Template.bind({});
DefaultOptionTab.args = {
    name: '[메르베] 귤귤 신생아 우주복',
    option: {
        "optionId": 1,
        "optionName": "사이즈",
        "optionValue": "70",
        "optionQuantity": 4
    },
    onCountChange: ({count, optionId}) => {
        console.log(`Count: ${count}, Option ID: ${optionId}`);
    }
};

DefaultOptionTab.parameters = {
    docs: {
        description: {
            story:
              '수량 제한 개수만큼 `+ 플러스` 버튼 클릭 시 숫자가 올라가며, `- 마이너스` 버튼이 0이 되거나 `X 가위표` 버튼을 클릭 시 탭이 사라집니다.',
        },
    },
  };
import React from "react";
import DetailWriteQna from "./DetailWriteQna";
import { action } from '@storybook/addon-actions';

export default {
    title: "Input/QnaInput",
    component: DetailWriteQna,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 QnA 입력 컴포넌트',
        docs: { 
          description: {
            component:
              `Q&A 작성을 위한 컴포넌트입니다. 제목, 내용을 입력하고 공개/비공개 여부를 선택할 수 있습니다.`,
          },
        },
    },
    argTypes: {
        onClick: {
            description: 'QnA 등록 버튼 클릭 시 호출되는 콜백 함수입니다.',
        },
    }
}

const Template = (args) => <DetailWriteQna {...args} />;
export const DefaultQnaInput = Template.bind({});
DefaultQnaInput.args = {
    onClick: (title, contents, checkboxState) => {
        action(`Title: ${title}, Contents: ${contents}, Checkbox State: ${checkboxState}`);
      },
};
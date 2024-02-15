import React, { useState } from 'react';
import { ColorPalette } from '@storybook/blocks';
import ConfirmModal from './ConfirmModal';

export default {
  title: 'Modal/Confirm',
  component: ConfirmModal,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      '확인 버튼이 있는 modal 입니다.',
    docs: { 
      description: {
        component:
          `open modal 버튼을 클릭하면 state 를 변경 후 모달이 열립니다.`,
      },
    },
  },
  argTypes: {
    children: {
        description: 'modal 의 text 를 받습니다.',
    },
    colors: {
        description: 'modal 확인, 취소 버튼의 색상을 결정합니다.',
        default: '#3377FF',
        type: ColorPalette,
        control: 'color',
    },
    onConfirm: { action: 'confirmed' },
    onClose: { action: 'closed' },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ConfirmModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
/**
 * 기본 modal
*/
export const DefaultConfirm = Template.bind({});
DefaultConfirm.args = {
  children: 'Are you sure you want to proceed?',
};
/**
 * modal button의 색상 선택
*/
export const WithColor = Template.bind({});
WithColor.args = {
  children: 'Are you sure you want to proceed?',
  color: '#3377FF',
};
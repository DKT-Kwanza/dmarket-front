import React, { useState } from 'react';
import ConfirmCancelModal from './ConfirmCancelModal';
import { ColorPalette } from '@storybook/blocks';

export default {
  title: 'Modal/ConfirmCancel',
  component: ConfirmCancelModal,
  tags: ['autodocs'],
  argTypes: {
    colors: ColorPalette,
    onConfirm: { action: 'confirmed' },
    onClose: { action: 'closed' },
  },
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <ConfirmCancelModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const DefaultConfirmCancel = Template.bind({});
ConfirmCancel.args = {
  children: 'Are you sure you want to proceed?',
};

export const WithColor = Template.bind({});
WithColor.args = {
  children: 'Are you sure you want to proceed?',
  color: '#ffd465',
};

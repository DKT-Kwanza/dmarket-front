import React, { useState } from 'react';
import { ColorPalette } from '@storybook/blocks';
import ConfirmModal from './ConfirmModal';

export default {
  title: 'Modal/Confirm',
  component: ConfirmModal,
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
      <ConfirmModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export const DefaultConfirm = Template.bind({});
DefaultConfirm.args = {
  children: 'Are you sure you want to proceed?',
};

export const WithColor = Template.bind({});
WithColor.args = {
  children: 'Are you sure you want to proceed?',
  color: '#3377FF',
};
import React from "react";
import Button from "./Button";
import { action } from '@storybook/addon-actions';

export default {
    title: "Button",
    component: Button,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 기본 버튼',
        docs: { 
          description: {
            component:
              `variant, width, label, disabled 선택하여 버튼 스타일을 적용합니다.`,
          },
        },
      },
    argTypes: {
        variant: {
            description: '버튼의 디자인을 선택하기 위한 값입니다.',
            table: {
                type: { summary: 'primary | secondary | tertiary | warn' },
            },
            defaultValue: { summary: 'primary' },
            control: { type: "radio" },
            options: ["primary", "secondary", "tertiary", "warn"],
        },
        width: {
            description: '버튼의 너비를 선택하기 위한 값입니다.',
            table: {
                type: { summary: 'small | base | lg | xl' },
            },
            defaultValue: { summary: 'base' },
            control: { type: "radio" },
            options: ["small", "base", "lg", "xl"],
        },
        disabled: {
            description: '버튼의 비활성화 여부를 결정합니다.',
            table: {
                type: { summary: 'boolean' },
            },
            defaultValue: { summary: 'false' },
        },
        label: {
            description: '버튼에 나타나는 텍스트를 입력합니다.',
            table: {
                type: { summary: 'string' },
            },
        }
    },
};
const Template = (args) => <Button {...args} onClick={action('Button Clicked')} />;

/**
 * variant 를 primary 로 선택했을 때 버튼 UI 입니다.
 */
export const Primary = Template.bind({});
Primary.args = {
    variant: 'primary',
    label: 'primary',
    disabled: false,
    width: 'base',
};
/**
 * variant 를 secondary 로 선택 
 * & width 를 lg 로 선택했을 때 버튼 UI 입니다.
 */
export const Secondary = Template.bind({});
Secondary.args = {
    variant: 'secondary',
    label: 'secondary',
    disabled: false,
    width: 'lg',
};
/**
 * variant 를 tertiary 로 선택 
 * & width 를 xl 로 선택했을 때 버튼 UI 입니다.
 */
export const Tertiary = Template.bind({});
Tertiary.args = {
    variant: 'tertiary',
    label: 'tertiary',
    disabled: false,
    width: 'xl',
};
/**
 * variant 를 warn 로 선택했을 때 버튼 UI 입니다.
 */
export const Warn = Template.bind({});
Warn.args = {
    variant: 'warn',
    label: 'warning',
    disabled: false,
    width: 'base',
};
/**
 * variant 를 primary 로 선택 
 * & disabled 를 true 로 했을 때 버튼 UI 입니다.
 */
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'disabled',
    variant: 'primary',
    width: 'base',
    disabled: true,
};
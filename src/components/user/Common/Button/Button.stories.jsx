import React from "react";
import Button from "./Button";

export default {
    title: "Button",
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            description: 'primary | secondary | tertiary | warn',
            control: { type: "radio" },
            options: ["primary", "secondary", "tertiary", "warn"],
        },
        width: {
            control: { type: "radio" },
            options: ["small", "base", "lg", "xl"],
        },
    },
};
const Template = (args) => <Button {...args} />;

/**
 * 기본 버튼
 */
export const Primary = Template.bind({});
Primary.args = {
    variant: 'primary',
    label: 'primary',
    disabled: false,
    width: 'base',
};

/**
 * 두번째 버튼
 */
export const Secondary = Template.bind({});
Secondary.args = {
    variant: 'secondary',
    label: 'secondary',
    disabled: false,
    width: 'base',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
    variant: 'tertiary',
    label: 'tertiary',
    disabled: false,
    width: 'base',
};

export const Warn = Template.bind({});
Warn.args = {
    variant: 'warn',
    label: 'warning',
    disabled: false,
    width: 'base',
};
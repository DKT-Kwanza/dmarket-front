import React, { useState } from "react";
import CheckBox from "./CheckBox";

export default {
    title: "CheckBox",
    component: CheckBox,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle: '사용자 UI에서 사용하는 기본 체크박스',
        docs: { 
            description: {
                component: `checked (boolean) 값을 선택하여 체크 여부를 결정합니다.`,
            },
        },
    },
    argTypes: {
        checked: {
            description: '체크 여부를 결정하는 값입니다.',
            table: {
                type: { summary: 'boolean' },
            },
            defaultValue: { summary: 'false' },
            control: 'boolean',
        },
    },
}

const Template = (args) => {
    const [isChecked, setIsChecked] = useState(args.checked);
  
    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <CheckBox
            checked={isChecked}
            onChange={handleOnChange}
        />
    );
}
/**
 * 체크박스가 체크되지 않은 상태를 보여주는 스토리입니다.
 */
export const Unchecked = Template.bind({});
Unchecked.args = {
    checked: false,
};
/**
 * 체크박스가 체크된 상태를 보여주는 스토리입니다.
 */
export const Checked = Template.bind({});
Checked.args = {
    checked: true,
};

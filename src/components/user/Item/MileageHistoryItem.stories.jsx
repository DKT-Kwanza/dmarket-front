import React from "react";
import MileageHistoryItem from "./MileageHistoryItem";

export default {
    title: "Item/MileageItem",
    component: MileageHistoryItem,
    tags: ["autodocs"],
    parameters: {
        componentSubtitle:
            '사용자 UI에서 사용하는 마일리지 정보',
        docs: { 
            description: {
                component:
                `마이 페이지의 마일리지 사용내역 페이지에서 사용합니다.`,
            },
        },
    },
    argTypes: {
        date: {
            description: '마일리지 잔액 변동 날짜입니다.',
            table: {
                type: { summary: 'LocalDateTime' },
            },
        },
        contents: {
            description: '마일리지 잔액 변동 사유입니다.',
            table: {
                type: { summary: 'String' },
            },
        },
        addMileage: {
            description: '마일리지 잔액의 변동 금액입니다.',
            table: {
                type: { summary: 'Int' },
            },
        },
        curMileage: {
            description: '마일리지 잔액입니다.',
            table: {
                type: { summary: 'Int' },
            },
        },
    }
}

const Template = (args) => <MileageHistoryItem {...args} />;

/**
 * 마일리지가 출금됐을 때 UI 입니다.
 */
export const DefaultMileageItem = Template.bind({});
DefaultMileageItem.args = {
    date: "2024-02-13",
    contents: "물건 구매",
    addMileage: -484200,
    curMileage: 652120,
}

/**
 * 마일리지가 입금됐을 때 UI 입니다.
 */
export const ChargeMileageItem = Template.bind({});
ChargeMileageItem.args = {
    date: "2024-02-13",
    contents: "충전",
    addMileage: 484200,
    curMileage: 652120,
}
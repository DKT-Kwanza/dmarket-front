import React, {useState} from "react";
import Filter from "./Filter";
import Dropdown from "../Select/Dropdown";

export default {
    title: "Filter",
    component: Filter,
    tags: ['autodocs'],
    parameters: {
        componentSubtitle:
          '사용자 UI에서 사용하는 카테고리 아이템 컴포넌트',
        docs: { 
          description: {
            component:
              `상품 카테고리 2 depth 선택 시 나타나는 상품들의 아이템 컴포넌트 입니다.`,
          },
        },
    },
    argTypes: {
        setMinPrice: { 
            description: '조회할 최소 가격 값을 입력합니다.',
            table: {
                type: { summary: 'number' },
            },
            defaultValue: { summary: 0 },
            control: 'number',
            action: 'setMinPrice' 
        },
        setMaxPrice: { 
            description: '조회할 최대 가격 값을 입력합니다.',
            table: {
                type: { summary: 'number' },
            },
            defaultValue: { summary: 0 },
            control: 'number',
            action: 'setMaxPrice' 
        },
        setStar: { 
            description: '조회할 별점을 선택합니다.',
            table: {
                type: { summary: 'number' },
            },
            control: 'number',
            action: 'setStar'
        },
        setSorter: { 
            description: '상품 조회 순서를 선택합니다.',
            table: {
                type: { summary: '판매순 | 최신순 | 별점순 | 리뷰개수순' },
            },
            defaultValue: { summary: '판매순' },
            control: { type: "radio" },
            options: ["판매순", "최신순", "별점순", "리뷰개수순"],
            action: 'setSorter'
        },
        priceValidation: {
            description: '가격 유효성 검사를 위한 상태값를 검사합니다.',
            table: {
                type: { summary: 'boolean' },
            },
            defaultValue: { summary: false },
            control: 'boolean',
        },
      },
}

const Template = (args) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [star, setStar] = useState('');
    const [sorter, setSorter] = useState('');
  
    return (
      <Filter
        {...args}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setStar={setStar}
        setSorter={setSorter}
      />
    );
  };

export const DefaultFilter = Template.bind({});
DefaultFilter.args = {};
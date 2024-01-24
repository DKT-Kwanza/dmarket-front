import * as React from 'react';
import {useState} from "react";
import styled from "styled-components";
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";


export default function SelectBox() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); // 선택된 옵션을 추적하기 위한 상태 추가

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
    };

    return (
        <Content>
            <DropDown onClick={toggleDropdown}>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    {selectedOption || '반품신청 사유를 선택하세요'}
                    <Button>
                        <ChevronDown/>
                    </Button>
                </div>
                {isDropdownOpen && (
                    <Options>
                        <Option onClick={() => handleOptionSelect('단순변심')}>단순변심</Option>
                        <Option onClick={() => handleOptionSelect('제품하자')}>제품하자</Option>
                        <Option onClick={() => handleOptionSelect('오배송')}>오배송</Option>
                    </Options>
                )}
            </DropDown>

        </Content>
    );
}

const Button = styled.div`

`

const Content = styled.div`
  display: flex;
  justify-content: center;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  display: flex;
  margin-top: 17px;
  margin-left: 3px;
`

const DropDown = styled.div`
  display: flex;
  padding: 6px 12px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: relative;
  cursor: pointer;
  border: 1px solid #919191;
  background: #FFF;
`

const Options = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #C6C6C6;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Option = styled.div`
  padding: 4px;
  font-size: 16px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #F5F5F5;
  } 
`
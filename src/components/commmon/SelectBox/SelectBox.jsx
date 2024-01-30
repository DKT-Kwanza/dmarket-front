import {useState} from "react";
import styled from "styled-components";
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";


export default function SelectBox({ text, options, onChange }) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setDropdownOpen(false);
        onChange(option);
    };

    return (
        <Content>
            <DropDown onClick={toggleDropdown}>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    {selectedOption || text}
                    <Button>
                        <ChevronDown/>
                    </Button>
                </div>
                {isDropdownOpen && (
                    <Options>
                        {
                            options.map((option, index)=>(
                                <Option onClick={() => handleOptionSelect(option)}>{option}</Option>
                            ))
                        }
                    </Options>
                )}
            </DropDown>

        </Content>
    );
}

const Button = styled.div`

`

const Content = styled.div`
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  align-items: center;
  display: flex;
`

const DropDown = styled.div`
  display: flex;
  padding: 3px 12px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  line-height: normal;
  position: relative;
  cursor: pointer;
  border: 1px solid #C6C6C6;
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
  text-align: center;
  padding: 4px;
  font-size: 15px;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #F5F5F5;
  } 
`
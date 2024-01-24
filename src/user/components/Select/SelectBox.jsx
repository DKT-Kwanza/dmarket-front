import * as React from 'react';
import {useState} from "react";
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
        <div className='inquiry-menu-submenu-content'>
            <div className='inquiry-menu-submenu-dropdown' onClick={toggleDropdown}>
                {selectedOption || '반품신청 사유를 선택하세요'}
                {isDropdownOpen && (
                    <div className='dropdown-options'>
                        <div onClick={() => handleOptionSelect('단순변심')}>단순변심</div>
                        <div onClick={() => handleOptionSelect('제품하자')}>제품하자</div>
                        <div onClick={() => handleOptionSelect('오배송')}>오배송</div>
                    </div>
                )}
            </div>
            <div className='inquiry-main-submenu-button'>
                <ChevronDown/>
            </div>
        </div>
    );
}

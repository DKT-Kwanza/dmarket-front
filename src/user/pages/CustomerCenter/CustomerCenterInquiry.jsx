import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerCenterInquiry.css';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";

function CustomerCenterInquiry() {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(''); // 선택된 옵션을 추적하기 위한 상태 추가

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className='CustomerCenterInquiry'>
      <div className='CustomerCenterInquiry-body'>
        
        <div className='CustomerCenterName'>
            고객센터
        </div>
        <div className="notice-bar"/>
      
        
        <div className='notice-required-item'> 
          <div className='inquiry-menu-notice-redstar'>*</div>
          <div className='notice-required-item-title'>필수 항목입니다.</div>
        </div>  

        <div className='inquiry-menu'>
          
          



          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title'>
              유형
            </div>
            <div className='inquiry-menu-submenu-content'>
              <div className='inquiry-menu-submenu-dropdown' onClick={toggleDropdown}>
                {selectedOption || '선택하세요'}
                {isDropdownOpen && (
                  <div className='dropdown-options'>
                    <div onClick={() => handleOptionSelect('회원')}>회원</div>
                    <div onClick={() => handleOptionSelect('주문/결제')}>주문/결제</div>
                    <div onClick={() => handleOptionSelect('반품/환불')}>반품/환불</div>
                    <div onClick={() => handleOptionSelect('마일리지')}>마일리지</div>
                  </div>
                )}
              </div>
              <div className='inquiry-main-submenu-button'>
                <ChevronDown/>
              </div>
            </div>
          </div>











          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title'>
              제목
            </div>
              <input
                placeholder='제목을 입력해주세요. (30자 이내)'
                className='inquiry-menu-submenu-input'
              />
          </div>





          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title-contents'>
              내용
            </div>
            
            <textarea
              placeholder=
              {` 취소, 교환, 반품 신청은 주문배송 조회에서 직접 신청 가능합니다.
 상품에 대한 문의일 경우 해당 상품의 Q&A에 문의 부탁드립니다.`}
              className='inquiry-menu-submenu-detail'
            />
            
          </div>

          <div className='inquiry-menu-submenu'>
            <div className='inquiry-menu-submenu-redstar'>*</div>
            <div className='inquiry-menu-submenu-title'>
              사진
            </div>
            <div className='inquiry-menu-submenu-content-picture'>
              <button className="inquiry-menu-stars-button">
                <span className="inquiry-menu-stars-button-plus">+</span>
              </button>
            </div>
          </div>
          <div className='inquiry-main-menu-line'/>      
        </div>



        <div className='inquiry-decision'>
          <button  onClick={handleCancel} className='inquiry-decision-cancel'>취소</button>
          <button className='inquiry-decision-accept'>등록</button>
        </div>
      

      </div>
    </div>
  );
}

export default CustomerCenterInquiry;
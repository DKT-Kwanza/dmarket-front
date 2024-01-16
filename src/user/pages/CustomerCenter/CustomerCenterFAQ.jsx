import React, { useState } from 'react';
import './CustomerCenterFAQ.css';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../assets/icons/chevron-up.svg";

function CustomerCenterFAQ() {
  const [selectedMenu, setSelectedMenu] = useState('반품/환불 문의');

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const [isExpanded_1, setIsExpanded_1] = useState(false);
  const [isExpanded_2, setIsExpanded_2] = useState(false);
  const [isExpanded_3, setIsExpanded_3] = useState(false);
  const [isExpanded_4, setIsExpanded_4] = useState(false);

  const handleToggle_1 = () => {
    setIsExpanded_1(!isExpanded_1);
  };

  const handleToggle_2 = () => {
    setIsExpanded_2(!isExpanded_2);
  };

  const handleToggle_3 = () => {
    setIsExpanded_3(!isExpanded_3);
  };

  const handleToggle_4 = () => {
    setIsExpanded_4(!isExpanded_4);
  };

  return (
    <div className='CustomerCenterNotice'>
      <div className='CustomerCenterNotice-body'>
        <div className='CustomerCenterName'>
          고객센터
        </div>
        <div className="notice-bar"/>
        <div className="notice-submenu">

        <button
          className={`notice-submenu-content-left ${selectedMenu === '회원리뷰' ? 'active' : ''}`}
          onClick={() => handleMenuClick('회원리뷰')}>
          회원리뷰
        </button>
        <div className="submenu-line"/>
        <button
          className={`notice-submenu-content-mid ${selectedMenu === '주문/결제 문의' ? 'active' : ''}`}
          onClick={() => handleMenuClick('주문/결제 문의')}>
          주문/결제 문의
        </button>
        <div className="submenu-line"/>
        <button
          className={`notice-submenu-content-mid ${selectedMenu === '반품/환불 문의' ? 'active' : ''}`}
          onClick={() => handleMenuClick('반품/환불 문의')}>
          반품/환불 문의
        </button>
        <div className="submenu-line"/>
        <button
          className={`notice-submenu-content-right ${selectedMenu === '마일리지 문의' ? 'active' : ''}`}
          onClick={() => handleMenuClick('마일리지 문의')}>
          마일리지 문의
        </button>
          
          
        </div>

        <div className='notice-main-body'>

        




          <div className='notice-main-menu'>

            <div className="notice-main-body-redtitle bold-text">
              {selectedMenu}
            </div>

            <div className='notice-main-body-blacktitle'>
              FAQ
            </div>

            <div className='notice-main-body-line'/>




            <div className='notice-main-menu-display' onClick={handleToggle_1}>
              <div className='notice-main-menu-text'>
                Q. 반품 / 환불 신청 시 주의사항이 있나요?
              </div>
              <div className='notice-main-menu-button-faq'>
                {isExpanded_1 ? <ChevronUp/> : <ChevronDown/>}
              </div>
            </div>

            {
              isExpanded_1 && (
              <div className='notice-main-menu-expanded-content'>
                <li> 제품 구입 후 반드시 상품 이상 유무를 확인하여 주십시오.</li>
                <li> 환불은 반품처리 후 발송업체의 제품 수령 확인 뒤에 처리 됩니다.</li>
              </div>
            )}

            <div className='notice-main-menu-line'/>
          
            <div className='notice-main-menu-display' onClick={handleToggle_2}>
              <div className='notice-main-menu-text'>
                Q. 반품/환불신청은 어떻게 하나요?
              </div>              
              <div className='notice-main-menu-button-faq'>
                {isExpanded_2 ? <ChevronUp/> : <ChevronDown/>}
              </div>
            </div>

            {
              isExpanded_2 && (
              <div className='notice-main-menu-expanded-content'>
                <li>반품은 배송중, 배송완료 상태에서만 가능합니다.</li>
                <li>구매내역 페이지에서 반품 요청 버튼을 클릭하여 진행할 수 있습니다.</li>
                <li>※ 주문 제작 상품, 훼손된 상품의 경우 반품이 거부될 수 있으니 판매자 확인 후 신청바랍니다.</li>
              </div>
            )}

            <div className='notice-main-menu-line'/>

            <div className='notice-main-menu-display' onClick={handleToggle_3}>
              <div className='notice-main-menu-text'>
                Q. 반품/환불이 불가한 경우는 어떤 경우인가요?
              </div>
              <div className='notice-main-menu-button-faq'>
                {isExpanded_3 ? <ChevronUp/> : <ChevronDown/>}
              </div>    
            </div>

            {
              isExpanded_3 && (
              <div className='notice-main-menu-expanded-content'>
                <li>식품은 특성상 신선도 유지의 문제점이 있으므로 배송이 완료된 후 단순 반품이나 환불은 불가능합니다.</li>
                <li>판매자와의 협의없이 수취거절하여 일방적으로 보내시는 반품은 절대 받지 않습니다.</li>
                <li>단순변심 또는 상품에 문제가 없는 상태에서 개봉을 한 상품은 반품이 불가합니다.</li>
                <li>잘못된 보관이나 고객님의 부주의로 인한 상품 훼손 및 상품가치 상실 등의 경우에는 반품처리가 제한 될수 있습니다.</li>              
              </div>
            )}

            <div className='notice-main-menu-line'/>

            <div className='notice-main-menu-display' onClick={handleToggle_4}>
              <div className='notice-main-menu-text'>
                Q. 배송 받은 상품에 문제가 있어요. 반품/환불 신청이 가능한가요?
              </div>
              
              <div className='notice-main-menu-button-faq'>
                {isExpanded_4 ? <ChevronUp/> : <ChevronDown/>}
              </div>    
            </div>

            {
              isExpanded_4 && (
              <div className='notice-main-menu-expanded-content'>
                <li>상품의 파손, 불량, 오배송 등 상품이 표기/광고내용과 다르거나 계약내용과 다른 경우,</li>
                <li>상품을 받으신 날부터 3개월 이내, 또는 사실을 알게된 날(알 수 있었던 날)부터 30일 이내에 교환 및 반품 신청이 가능합니다.</li>
                <li>주문/배송 조회 통해 직접 접수해주시거나, 접수가 불가한 경우 고객센터로 문의주시면 빠르게 도움드리겠습니다. </li>
              </div>
            )}

            <div className='notice-main-menu-line'/>
            
            <div className='notice-main-menu-cantfind'> 
              원하시는 정보를 찾지 못하셨나요? 
            </div>
            
            <div className="notice-main-menu-inquiry">
              <button className="notice-main-menu-inquiry-button">
                  문의 작성
              </button>
            </div>




          </div>
        </div>
        
        


      </div>

    </div>
  );
}

export default CustomerCenterFAQ;
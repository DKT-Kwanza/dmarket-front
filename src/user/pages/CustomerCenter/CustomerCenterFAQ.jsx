import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CustomerCenterFAQList from '../../components/CustomerCenter/CustomerCenterFAQList';
import './CustomerCenterFAQ.css';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../assets/icons/chevron-up.svg";

function CustomerCenterFAQ() {
  const faqData = {
    '회원 문의': [
      {
        question: 'Q. 회원가입이 불가한 경우는 어떤 경우인가요?',
        content: (
          <>
            <li>식품은 특성상 신선도 유지의 문제점이 있으므로 배송이 완료된 후 단순 반품이나 환불은 불가능합니다.</li>
            <li>판매자와의 협의없이 수취거절하여 일방적으로 보내시는 반품은 절대 받지 않습니다.</li>
            <li>단순변심 또는 상품에 문제가 없는 상태에서 개봉을 한 상품은 반품이 불가합니다.</li>
            <li>잘못된 보관이나 고객님의 부주의로 인한 상품 훼손 및 상품가치 상실 등의 경우에는 반품처리가 제한 될수 있습니다.</li>
          </>
        ),
      },
    ],
    '주문/결제 문의': [
      {
        question: 'Q. 주문/결제가 불가한 경우는 어떤 경우인가요?',
        content: (
          <>
            <li>식품은 특성상 신선도 유지의 문제점이 있으므로 배송이 완료된 후 단순 반품이나 환불은 불가능합니다.</li>
            <li>판매자와의 협의없이 수취거절하여 일방적으로 보내시는 반품은 절대 받지 않습니다.</li>
            <li>단순변심 또는 상품에 문제가 없는 상태에서 개봉을 한 상품은 반품이 불가합니다.</li>
            <li>잘못된 보관이나 고객님의 부주의로 인한 상품 훼손 및 상품가치 상실 등의 경우에는 반품처리가 제한 될수 있습니다.</li>
          </>
        ),
      },
    ],
    '반품/환불 문의': [
      {
        question: 'Q. 반품/환불이 불가한 경우는 어떤 경우인가요?',
        content: (
          <>
            <li>식품은 특성상 신선도 유지의 문제점이 있으므로 배송이 완료된 후 단순 반품이나 환불은 불가능합니다.</li>
            <li>판매자와의 협의없이 수취거절하여 일방적으로 보내시는 반품은 절대 받지 않습니다.</li>
            <li>단순변심 또는 상품에 문제가 없는 상태에서 개봉을 한 상품은 반품이 불가합니다.</li>
            <li>잘못된 보관이나 고객님의 부주의로 인한 상품 훼손 및 상품가치 상실 등의 경우에는 반품처리가 제한 될수 있습니다.</li>
          </>
        ),
      },
    ],
    '마일리지 문의': [
      {
        question: 'Q. 마일리지 충전이 불가한 경우는 어떤 경우인가요?',
        content: (
          <>
            <li>식품은 특성상 신선도 유지의 문제점이 있으므로 배송이 완료된 후 단순 반품이나 환불은 불가능합니다.</li>
            <li>판매자와의 협의없이 수취거절하여 일방적으로 보내시는 반품은 절대 받지 않습니다.</li>
            <li>단순변심 또는 상품에 문제가 없는 상태에서 개봉을 한 상품은 반품이 불가합니다.</li>
            <li>잘못된 보관이나 고객님의 부주의로 인한 상품 훼손 및 상품가치 상실 등의 경우에는 반품처리가 제한 될수 있습니다.</li>
          </>
        ),
      },
    ],
  };

  const navigate = useNavigate();
  const params = useParams();
  const [selectedMenu, setSelectedMenu] = useState('회원 문의');
  const selectedFaqItems = faqData[selectedMenu] || []; // 선택된 메뉴에 해당하는 FAQ 데이터
  const [isExpanded_1, setIsExpanded_1] = useState(false);
  const [isExpanded_2, setIsExpanded_2] = useState(false);
  const [isExpanded_3, setIsExpanded_3] = useState(false);
  const [isExpanded_4, setIsExpanded_4] = useState(false);
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    if (params.tab) {
      setSelectedMenu(params.tab);
    }
  }, [params.tab]); // 고객센터에서 넘어올 때 탭 선택

  useEffect(() => {
    window.onpopstate = (event) => {
      setPageName(event.state);
    };
  }, []);

  const handleMenuClick = (menu) => { // 탭 선택 시 url 변경
    setSelectedMenu(menu);
    const path = encodeURIComponent(menu); // 띄어쓰기 인코딩
    window.history.pushState(pageName, "", path);
    setPageName(pageName);
  };

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

  const navigateToInquiry= () => {
    navigate("../customercenter/inquiry");
  };

  return (
    <div className='CustomerCenterfaq'>
      <div className='CustomerCenterfaq-body'>
        <div className='CustomerCenterName'>
          고객센터
        </div>
        <div className="faq-bar"/>
        <div className="faq-submenu">
          <button
            className={`faq-submenu-content-left ${selectedMenu === '회원 문의' ? 'active' : ''}`}
            onClick={() => handleMenuClick('회원 문의')}>
            회원 문의
          </button>
          <div className="submenu-line"/>
          <button
            className={`faq-submenu-content-mid ${selectedMenu === '주문/결제 문의' ? 'active' : ''}`}
            onClick={() => handleMenuClick('주문/결제 문의')}>
            주문/결제 문의
          </button>
          <div className="submenu-line"/>
          <button
            className={`faq-submenu-content-mid ${selectedMenu === '반품/환불 문의' ? 'active' : ''}`}
            onClick={() => handleMenuClick('반품/환불 문의')}>
            반품/환불 문의
          </button>
          <div className="submenu-line"/>
          <button
            className={`faq-submenu-content-right ${selectedMenu === '마일리지 문의' ? 'active' : ''}`}
            onClick={() => handleMenuClick('마일리지 문의')}>
            마일리지 문의
          </button>
        </div>
        <div className='faq-main-body'>
          <div className='faq-main-menu'>
            <div className="faq-main-body-redtitle bold-text">
              {selectedMenu}
            </div>
            <div className='faq-main-body-blacktitle'>
              FAQ
            </div>
            <div className='faq-main-body-line'/>
            <div>
              <CustomerCenterFAQList items={selectedFaqItems} />
            </div>
            <div className='faq-main-menu-line'/>
            <div className='faq-main-menu-cantfind'> 
              원하시는 정보를 찾지 못하셨나요? 
            </div>
            <div className="faq-main-menu-inquiry">
              <button onClick={navigateToInquiry} className="faq-main-menu-inquiry-button">
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
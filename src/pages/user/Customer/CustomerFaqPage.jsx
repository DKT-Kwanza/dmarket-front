import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomerCenterFAQList from "../../../components/user/List/CustomerCenterFAQList";
import './CustomerFaqPage.css';

function CustomerCenterFAQ() {

  const navigate = useNavigate();
  const params = useParams();
  const [selectedMenu, setSelectedMenu] = useState('회원 문의');
  const [custoemrCenterFaqs, setCustoemrCenterFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [pageName, setPageName] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/CustomerCenterFaqData.json");
            setCustoemrCenterFaqs(response.data);
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    };
    fetchData();
  }, []);

  /* 선택된 카테고리에 해당하는 FAQ 목록을 필터링 */
  useEffect(() => {
    const filtered = custoemrCenterFaqs.filter(faq => `${faq.faqType} 문의` === selectedMenu);
    setFilteredFaqs(filtered);
    console.log(filteredFaqs)
  }, [selectedMenu, custoemrCenterFaqs]);


  const handleMenuClick = (menu) => { // 탭 선택 시 url 변경
    setSelectedMenu(menu);
    const path = encodeURIComponent(menu); // 띄어쓰기 인코딩
    window.history.pushState(pageName, "", path);
    setPageName(pageName);
  };

  const navigateToInquiry= () => {
    navigate("../writeInquiry");
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
              <CustomerCenterFAQList items={filteredFaqs} />
            </div>
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
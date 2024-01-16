import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CustomerCenterNotice.css';
import { ReactComponent as ChevronDown } from "../../../assets/icons/chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../../assets/icons/chevron-up.svg";

function CustomerCenterNotice() {

  const navigate = useNavigate();

  const [isExpanded_1, setIsExpanded_1] = useState(false);
  const [isExpanded_2, setIsExpanded_2] = useState(false);
  const [isExpanded_3, setIsExpanded_3] = useState(false);

  const handleToggle_1 = () => {
    setIsExpanded_1(!isExpanded_1);
  };

  const handleToggle_2 = () => {
    setIsExpanded_2(!isExpanded_2);
  };

  const handleToggle_3 = () => {
    setIsExpanded_3(!isExpanded_3);
  };

  const navigateToFaQ = (menu) => {
    const path = encodeURIComponent(menu); // 띄어쓰기 인코딩
    navigate(`./faq/${path}`); // 각각의 메뉴 탭으로 바로 이동
  };

  return (
    <div className='CustomerCenterNotice'>
      <div className='CustomerCenterNotice-body'>
      {/* <div> */}
        <div className='CustomerCenterName'>
          고객센터
        </div>
        <div className="notice-bar"/>
        <div className="notice-submenu">
          <button className='notice-submenu-content-left' onClick={() => navigateToFaQ('회원문의')}>회원 문의</button>
          <div className="submenu-line"/>
          <button className='notice-submenu-content-mid' onClick={() => navigateToFaQ('주문/결제 문의')}>주문/결제 문의</button>
          <div className="submenu-line"/>
          <button className='notice-submenu-content-mid' onClick={() => navigateToFaQ('반품/환불 문의')}>반품/환불 문의</button>
          <div className="submenu-line"/>
          <button className='notice-submenu-content-right' onClick={() => navigateToFaQ('마일리지 문의')}>마일리지 문의</button>
        </div>

        <div className='Center-notice-body'>
          <div className='Center-notice'> 고객센터 이용안내 </div>
          <div className='Operating-time'> 운영시간 09:00 ~ 18:00 </div>
        </div>

        <div className='notice-main-body'>

          <div className='notice-main'> 
            <div className='notice-main-text'>
              공지사항   
            </div>
          </div>

          <div className='notice-main-menu'>

            <div className='notice-main-menu-display' onClick={handleToggle_1}>
              <div className='notice-main-menu-text'>
                온라인 해외직구&구매대행 캠핑용 가스용품 구매 시 주의사항
              </div>

              <div className='notice-main-menu-date'>
                2023.12.27
              </div>
              <div className='notice-main-menu-button'>
                {isExpanded_1 ? <ChevronUp/> : <ChevronDown/>}
              </div>
            </div>

            {
              isExpanded_1 && (
              <div className='notice-main-menu-expanded-content'>
                <li>나라마다 제품을 만드는 기준이 모두 다르기 때문에 제품 구매 전 국내 사용이 가능한 제품인지 정확한 파악이 필요합니다.</li>
                <li>특히 전자제품은 국내에서 사용하는 전압, 주파수, 규격 등과 다를 수 있습니다.</li>
                <li>옷이나 신발도 국내 사이즈와 다를 수 있으므로 사이즈를 잘 알아본 후에 구매가 필요합니다.</li>
              </div>
            )}

            <div className='notice-main-menu-line'/>
          
            <div className='notice-main-menu-display' onClick={handleToggle_2}>
              <div className='notice-main-menu-text'>
                개인정보처리방침 개정 안내 [개정일 : 2023.02.22]
              </div>

              <div className='notice-main-menu-date'>
                2023.12.27
              </div>
              <div className='notice-main-menu-button'>
                {isExpanded_2 ? <ChevronUp/> : <ChevronDown/>}
              </div>
            </div>

            {
              isExpanded_2 && (
              <div className='notice-main-menu-expanded-content'>
                <li>개인정보자기결정권 등 서문 추가</li>
                <li>개인정보 취급방침 → 개인정보처리방침 변경</li>
                <li>목차 및 제목 등 문구수정</li>
                <li>개인정보의 제3자 제공 문구 수정</li>
              </div>
            )}

            <div className='notice-main-menu-line'/>

            <div className='notice-main-menu-display' onClick={handleToggle_3}>
              <div className='notice-main-menu-text'>
                개인정보처리방침 개정 안내 [개정일 : 2023.02.22]
              </div>
              <div className='notice-main-menu-date'>
                2023.12.27
              </div>
              <div className='notice-main-menu-button'>
                {isExpanded_3 ? <ChevronUp/> : <ChevronDown/>}
              </div>    
            </div>

            {
              isExpanded_3 && (
              <div className='notice-main-menu-expanded-content'>
                <li>대검찰청 사이버 범죄수사단 연락처 수정</li>
                <li>개인정보 파기절차 및 방법 수정</li> 
                <li>이용자와 법정대리인의 권리·의무 및 그 행사방법 내용 수정</li>
                <li>개인정보의 안전성 확보조치 내용 수정</li>                
              </div>
            )}

            <div className='notice-main-menu-line'/>
            





          </div>
        </div>
        
        


      </div>
    </div>
  );
}

export default CustomerCenterNotice;
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './CustomerCenterNotice.css';
import CustomerCenterNoticeItem from '../../components/CustomerCenter/CustomerCenterNoticeItem';

function CustomerCenterNotice() {

  const noticeData = [
    {
      noticeId : 1,
      title : "온라인 해외직구&구매대행 캠핑용 가스용품 구매 시 주의사항",
      contents : "나라마다 제품을 만드는 기준이 모두 다르기 때문에 제품 구매 전 국내 사용이 가능한 제품인지 정확한 파악이 필요합니다. 특히 전자제품은 국내에서 사용하는 전압, 주파수, 규격 등과 다를 수 있습니다. 옷이나 신발도 국내 사이즈와 다를 수 있으므로 사이즈를 잘 알아본 후에 구매가 필요합니다.",
      createdAt: "2023-12-27 09:48:00",
    },
    {
      noticeId : 2,
      title : "개인정보처리방침 개정 안내 [개정일 : 2023.02.22]",
      contents : "개인정보자기결정권 등 서문 추가 개인정보 취급방침 → 개인정보처리방침 변경 목차 및 제목 등 문구수정 개인정보의 제3자 제공 문구 수정",
      createdAt : "2024-02-02 09:48:00"
    },
    {
      noticeId : 3,
      title : "온라인 해외직구&구매대행 캠핑용 가스용품 구매 시 주의사항",
      contents : "온라인 해외직구&구매대행 캠핑용 가스용품 구매 시 주의하세요 블라블라",
      createdAt : "2024-05-01 09:48:00"
    },
  ]

  const navigate = useNavigate();

  const [expandedNotices, setExpandedNotices] = useState({});

  const formatDate = (datetime) => { // 날짜만 남기기
    const date = new Date(datetime);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const toggleNotice = (noticeId) => {
    setExpandedNotices(prev => ({
      ...prev,
      [noticeId]: !prev[noticeId]
    }));
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
          <button className='notice-submenu-content-left' onClick={() => navigateToFaQ('회원 문의')}>회원 문의</button>
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
            {noticeData.map(notice => (
              <CustomerCenterNoticeItem
                key={notice.noticeId}
                question={notice.title}
                isExpanded={!!expandedNotices[notice.noticeId]}
                onToggle={() => toggleNotice(notice.noticeId)}
                createdAt={formatDate(notice.createdAt)}
              >
                {/* 내용을 children으로 전달 */}
                <div dangerouslySetInnerHTML={{ __html: notice.contents }} />
              </CustomerCenterNoticeItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCenterNotice;
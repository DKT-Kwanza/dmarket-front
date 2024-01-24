import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { formatDate } from '../../../utils/Format';
import './CustomerCenterNotice.css';
import CustomerCenterNoticeItem from "../../../components/user/CustomerCenter/CustomerCenterNoticeItem";

function CustomerCenterNotice() {

  const navigate = useNavigate();

  const [expandedNotices, setExpandedNotices] = useState({});
  const [custoemrCenterNotices, setCustoemrCenterNotices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/CustomerCenterNoticeData.json");

            setCustoemrCenterNotices(response.data);

        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    };
    fetchData();
  }, []);

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
            {custoemrCenterNotices.map(notice => (
              <CustomerCenterNoticeItem
                key={notice.noticeId}
                noticeTitle={notice.noticeTitle}
                isExpanded={!!expandedNotices[notice.noticeId]}
                onToggle={() => toggleNotice(notice.noticeId)}
                noticeCreatedDate={formatDate(notice.noticeCreatedDate)}
              >
                {/* 내용을 children으로 전달 */}
                <div dangerouslySetInnerHTML={{ __html: notice.noticeContents }} />
              </CustomerCenterNoticeItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCenterNotice;
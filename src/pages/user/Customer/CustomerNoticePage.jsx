import './CustomerNoticePage.css';
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import CustomerCenterNoticeItem from "../../../components/user/Item/CustomerCenterNoticeItem";
import {formatDate} from '../../../utils/Format';
import axios from 'axios';
import {boardApi} from "../../../api/Api";
import {Pagination} from "@mui/material";

function CustomerCenterNotice() {
    const navigate = useNavigate();

    const [expandedNotices, setExpandedNotices] = useState({});
    const [customerCenterNotices, setCustomerCenterNotices] = useState([]);

    /* 세션 스토리지에서 토큰, userId 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 공지사항 페이지네이션 */
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${boardApi}/notice?page=${currentPage}`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCustomerCenterNotices(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [currentPage]);

    const toggleNotice = (noticeId) => {
        setExpandedNotices(prev => ({
            ...prev,
            [noticeId]: !prev[noticeId]
        }));
    };

    const navigateToFaQ = (menu) => {
        navigate(`./faq/${encodeURIComponent(menu)}`); // 띄어쓰기 인코딩 후 각각의 메뉴 탭으로 바로 이동
    };

    return (
        <div className='CustomerCenterNotice'>
            <div className='CustomerCenterNotice-body'>
                <div className='CustomerCenterName'>
                    고객센터
                </div>
                <div className="notice-bar"/>
                <div className="notice-submenu">
                    <button className='notice-submenu-content-left' onClick={() => navigateToFaQ('회원 문의')}>회원 문의
                    </button>
                    <div className="submenu-line"/>
                    <button className='notice-submenu-content-mid' onClick={() => navigateToFaQ('주문/결제 문의')}>주문/결제 문의
                    </button>
                    <div className="submenu-line"/>
                    <button className='notice-submenu-content-mid' onClick={() => navigateToFaQ('반품/환불 문의')}>반품/환불 문의
                    </button>
                    <div className="submenu-line"/>
                    <button className='notice-submenu-content-right' onClick={() => navigateToFaQ('마일리지 문의')}>마일리지 문의
                    </button>
                </div>

                <div className='Center-notice-body'>
                    <div className='Center-notice'> 고객센터 이용안내</div>
                    <div className='Operating-time'> 운영시간 09:00 ~ 18:00</div>
                </div>

                <div className='notice-main-body'>

                    <div className='notice-main'>
                        <div className='notice-main-text'>
                            공지사항
                        </div>
                    </div>
                    <div className='notice-main-menu'>
                        {customerCenterNotices.map(notice => (
                            <CustomerCenterNoticeItem
                                key={notice.noticeId}
                                noticeTitle={notice.noticeTitle}
                                isExpanded={!!expandedNotices[notice.noticeId]}
                                onToggle={() => toggleNotice(notice.noticeId)}
                                noticeCreatedDate={formatDate(notice.noticeCreatedDate)}
                            >
                                {/* 내용을 children으로 전달 */}
                                <div dangerouslySetInnerHTML={{__html: notice.noticeContents}}/>
                            </CustomerCenterNoticeItem>
                        ))}
                    </div>
                    <Pagination count={totalPages} page={currentPage}
                                onChange={handlePageChange}/>
                </div>
            </div>
        </div>
    );
}

export default CustomerCenterNotice;
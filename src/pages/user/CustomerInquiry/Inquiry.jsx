import './Inquiry.css';
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import InquiryItem from "../../../components/user/Item/InquiryItem";
import {formatDate} from '../../../utils/Format';
import axios from 'axios';
import {userApi} from "../../../Api";
import {Pagination} from "@mui/material";

const Inquiry = () => {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState([])
    const [expandedInquiryId, setExpandedInquiryId] = useState(null);

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 고객문의 내역 페이지네이션 */
    const [inquiryCurrentPage, setInquiryCurrentPage] = useState(1);
    const [inquiryTotalPages, setInquiryTotalPages] = useState(0);
    const handleInquiryPageChange = (event, value) => {
        setInquiryCurrentPage(value);
        navigate(`?page=${value}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${userApi}/${userId}/mypage/inquiry`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setInquiries(response.data.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [inquiryCurrentPage]);

    const toggleInquiry = (inquiryId) => {
        setExpandedInquiryId(prevInquiryId => prevInquiryId === inquiryId ? null : inquiryId);
    };

    return (
        <div className='Inquiry'>
            <div><MyPageSubHeader/></div>
            <div className='Inquiry-contents-body'>
                <MyPageSidebar/>
                <div className='Inquiry-container'>
                    <div className='Inquiry-title'>
                        <div className='Inquiry-title-bar'></div>
                        <div className='Inquiry-title-info'>고객문의</div>
                    </div>
                    <div className='Inquiry-contents-content'>
                        <div className='Inquiry-contents-content-hr'/>
                        <div className='Inquiry-contents-content-info'>
                            <p>* 관련 없는 내용, 비방, 광고, 불건전한 내용의 글은 사전 동의 없이 삭제될 수 있습니다.</p>
                            <p>* 고객님께서 고객문의에 작성하신 내용입니다.</p>
                        </div>
                        <div className='Inquiry-contents-content-data'>
                            <hr className='Inquiry-contents-content-data-hr'/>
                            <div className='Inquiry-contents-content-data-title'>
                                <div className='Inquiry-contents-content-data-1'>유형</div>
                                <div className='Inquiry-contents-content-data-2'>제목</div>
                                <div className='Inquiry-contents-content-data-3'>작성일</div>
                                <div className='Inquiry-contents-content-data-4'>답변 상태</div>
                            </div>
                            {inquiries.map((inquiry, index) => (
                                <InquiryItem
                                    key={inquiry.InquiryId}
                                    category={inquiry.category}
                                    title={inquiry.title}
                                    contents={inquiry.contents}
                                    img={inquiry.img}
                                    createdAt={formatDate(inquiry.createdAt)}
                                    status={inquiry.status}
                                    replyContents={inquiry.replycontents}
                                    inquiryReplyDate={formatDate(inquiry.inquiryReplyDate)}
                                    isExpanded={expandedInquiryId === inquiry.InquiryId}
                                    onToggle={() => toggleInquiry(inquiry.InquiryId)}
                                />
                            ))}
                            <Pagination count={inquiryTotalPages} page={inquiryCurrentPage}
                                        onChange={handleInquiryPageChange}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inquiry;

import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import CustomerInquiryTable from "../../../components/admin/Table/CustomerInquiryTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import InquiryModal from "../../../components/admin/Modal/InquiryModal";

const primary = indigo[50];
const drawerWidth = 260;

function CustomerInquiry() {
    const [inquiryList, setInquiryList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('회원 문의');
    const tableHeader = ['구분', '제목', '작성자', '작성일', '답변상태', ''];
    const menuList = [
        {title: '회원 문의'},
        {title: '주문/결제 문의'},
        {title: '반품/환불 문의'},
        {title: '마일리지 문의'}
    ];

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    /* inquiryType 에 맞는 데이터 가져오기 */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const encodedTab = encodeURIComponent(selectedTab.split(' ')[0]);
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/board/inquiry?type=${encodedTab}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    }
                });
                setInquiryList(response.data.data.content);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [selectedTab]);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
    };

    /* 모달 상태 관리 변수 */
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedInquiryId, setSelectedInquiryId] = useState(null);

    /* 문의 삭제 handler */
    const onDeleteClick = async (selectedInquiryId) => {
        try {
            console.log(selectedInquiryId);

            /* 삭제 API 호출 */
            const response = await axios.delete(`http://172.16.210.136:8080/api/admin/board/inquiry/${selectedInquiryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });
            alert("해당 문의를 삭제합니다.");
            setInquiryList(inquiryList.filter(inquiry => inquiry.inquiryId !== selectedInquiryId));
        } catch (error) {
            console.error('Delete API 호출 실패:', error);
        }
    }

    const handleRowClick = (event, inquiryId) => {
        event.stopPropagation();
        console.log('handleRowClick called');
        setSelectedInquiryId(inquiryId);
        setIsDetailModalOpen(true);
    };
    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'문의 게시판'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    p: 3,
                    mt: 9,
                    ml: `${drawerWidth}px`
                }}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange}/>
                    <CustomerInquiryTable headers={tableHeader} rows={inquiryList}
                                          onDeleteClick={onDeleteClick} onRowClick={handleRowClick}/>
                </Paper>
            </Box>
            {selectedInquiryId !== null && (
                <InquiryModal
                    open={isDetailModalOpen} handleClose={handleCloseDetailModal} inquiryId={selectedInquiryId}/>
            )}
        </Box>
    );
}

export default CustomerInquiry;
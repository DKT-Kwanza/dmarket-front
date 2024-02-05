import React, { useEffect, useState } from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import CustomerFaqTable from "../../../components/admin/Table/CustomerFaqTable";
import FaqModal from "../../../components/admin/Modal/FaqModal";
import FaqWriteModal from "../../../components/admin/Modal/FaqWriteModal";
import { Paper, Box, Button, Pagination } from "@mui/material";
import { indigo } from '@mui/material/colors';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import axios from "axios";
import {adminApi} from "../../../Api";

const primary = indigo[50];
const drawerWidth = 260;

function AdminCustomerFaqPage() {
    const [faqList, setFaqList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedTab, setSelectedTab] = useState('회원 문의');
    const tableHeader = ['구분', '제목', '작성자', ''];

    /* 모달 상태 관리 변수 */
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [selectedFaqId, setSelectedFaqId] = useState(null);

    const menuList = [
        { title: '회원 문의' },
        { title: '주문/결제 문의' },
        { title: '반품/환불 문의' },
        { title: '마일리지 문의' }
    ];

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchFAQs(selectedTab.replace(' 문의', ''), currentPage);
    }, [selectedTab, currentPage]);

    const fetchFAQs = async (faqType, page) => {
        try {
            const url = `${adminApi}/board/faq?type=${faqType}&page=${page}`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFaqList(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (e) {
            console.error("Error fetching data: ", e);
        }
    };

    const handleTabChange = (tabTitle) => {
        setSelectedTab(tabTitle);
        setCurrentPage(0); // 탭을 변경할 때 페이지 번호를 초기화합니다.
    };

    // 페이지네이션 핸들러
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const handleRowClick = (event, faqId) => {
        event.stopPropagation();
        setSelectedFaqId(faqId);
        setIsDetailModalOpen(true);
    };

    const handleWriteButtonClick = () => {
        setIsWriteModalOpen(true);
    }

    const handleCloseWriteModal = () => {
        setIsWriteModalOpen(false);
    }

    const onDeleteClick = async (faqId) => {
        try {
            const url = `${adminApi}/board/faq/${faqId}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('해당 faq를 삭제하였습니다.');
            setFaqList(faqList.filter(faq => faq.faqId !== faqId));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <LeftNav />
            <Header title={'FAQ'} />
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px` }}>
                <Paper square elevation={2}
                    sx={{ p: '20px 30px' }}>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange} />
                    <CustomerFaqTable headers={tableHeader} rows={faqList} onDeleteClick={onDeleteClick}
                        onRowClick={handleRowClick} />
                    <Button
                        sx={{ float: 'right' }}
                        variant="contained"
                        endIcon={<BorderColorIcon />}
                        onClick={handleWriteButtonClick}>
                        작성하기
                    </Button>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Paper>
            </Box>
            {
                selectedFaqId !== null && (
                    <FaqModal open={isDetailModalOpen} handleClose={handleCloseDetailModal} faqId={selectedFaqId} faqList={faqList} />
                )
            }
            {
                <FaqWriteModal open={isWriteModalOpen} handleClose={handleCloseWriteModal} />
            }
        </Box>
    );
}

export default AdminCustomerFaqPage;
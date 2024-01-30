import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import CustomerNoticeTable from "../../../components/admin/Table/CustomerNoticeTable";
import {Paper, Box, Button, Pagination} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import NoticeModal from "../../../components/admin/Modal/NoticeModal";
import NoticeWriteModal from "../../../components/admin/Modal/NoticeWriteModal";

const primary = indigo[50];
const drawerWidth = 260;

function CustomerNotice() {
    const location = useLocation();
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    const tableHeader = ['제목', '작성자', '작성일', ''];

    /* 모달 상태 관리 변수 */
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get('page') || '1', 10);
        setCurrentPage(page);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/board/notices?page=${page}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setNotice(response.data.data.content); 
                setTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [currentPage, location.search]);

    const fetchNotices = async () => {
        try {
            const response = await axios.get(`http://172.16.210.136:8080/api/admin/board/notices?page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNotice(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    const handleConfirm = async () => {
        if (!selectedNoticeId) return;

        try {
            await axios.delete(`http://172.16.210.136:8080/api/admin/board/notice/${selectedNoticeId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            closeConfirmModalHandler();
            fetchNotices(); 
        } catch (e) {
            console.error("Error deleting notice:", e);
        }
    };

    const openConfirmModalHandler = (event, noticeId) => {
        event.stopPropagation();
        setSelectedNoticeId(noticeId);
        setIsConfirmModalOpen(true);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    const closeConfirmModalHandler = () => {
        setIsConfirmModalOpen(false);
    };

    const handleRowClick = (event, noticeId) => {
        event.stopPropagation();
        setSelectedNoticeId(noticeId);
        setIsDetailModalOpen(true);
    };

    const handleWriteButtonClick = () => {
        setIsWriteModalOpen(true);
    }

    const handleCloseWriteModal = () => {
        setIsWriteModalOpen(false);
        fetchNotices();
    }

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'공지사항'}/>
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
                    <CustomerNoticeTable headers={tableHeader} rows={notice} onDeleteClick={openConfirmModalHandler}
                                         onRowClick={handleRowClick}/>
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
                        onClick={handleWriteButtonClick}
                        endIcon={<BorderColorIcon/>}>
                        작성하기
                    </Button>
                </Paper>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Box>
            {isConfirmModalOpen && (
                <ConfirmModal color={'#FF5D5D'} isOpen={isConfirmModalOpen} onClose={closeConfirmModalHandler}
                              onConfirm={handleConfirm}>
                    <div>해당 글을 삭제하시겠습니까?</div>
                </ConfirmModal>
            )}
            {selectedNoticeId !== null && (
                <NoticeModal
                    open={isDetailModalOpen} handleClose={handleCloseDetailModal} noticeId={selectedNoticeId}
                    noticeList={notice}/>
            )}
            {
                <NoticeWriteModal
                    open={isWriteModalOpen} handleClose={handleCloseWriteModal} fetchNotices={fetchNotices} />
            }
        </Box>
    );
}

export default CustomerNotice;
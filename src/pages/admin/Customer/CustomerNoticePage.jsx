import React, {useEffect, useState} from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import CustomerNoticeTable from "../../../components/admin/Table/CustomerNoticeTable";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import NoticeModal from "../../../components/admin/Modal/NoticeModal";
import NoticeWriteModal from "../../../components/admin/Modal/NoticeWriteModal";
import {Paper, Box, Button, Pagination} from "@mui/material";
import axios from "axios";
import {indigo} from '@mui/material/colors';
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {adminApi} from "../../../Api";

const primary = indigo[50];
const drawerWidth = 260;

function CustomerNotice() {
    const location = useLocation();
    const navigate = useNavigate();
    const [notice, setNotice] = useState([]);
    const tableHeader = ['제목', '작성자', '작성일', ''];

    /* 모달 상태 관리 변수 */
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
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
                const url = `${adminApi}/board/notices?page=${page}`;
                const response = await axios.get(url, {
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
            const url = `${adminApi}/board/notices?page=${currentPage}`;
            const response = await axios.get(url, {
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

    const onDeleteClick = async (noticeId) => {
        try {
            const url = `${adminApi}/board/notice/${noticeId}`;
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('해당 공지사항이 삭제되었습니다!')
            fetchNotices(); 
        } catch (e) {
            console.error("Error deleting notice:", e);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
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
                <Paper square elevation={2} sx={{p: '20px 30px'}}>
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
                        onClick={handleWriteButtonClick}
                        endIcon={<BorderColorIcon/>}>
                        작성하기
                    </Button>
                    <CustomerNoticeTable headers={tableHeader} rows={notice} onDeleteClick={onDeleteClick} onRowClick={handleRowClick}/>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Paper>
            </Box>
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
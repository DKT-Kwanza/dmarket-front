import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import CustomerNoticeTable from "../../../components/admin/Table/CustomerNoticeTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import NoticeModal from "../../../components/admin/Modal/NoticeModal";
import NoticeWriteModal from "../../../components/admin/Modal/NoticeWriteModal";

const primary = indigo[50];
const drawerWidth = 260;

function CustomerNotice() {
    const [notice, setNotice] = useState([]);
    const tableHeader = ['제목', '작성자', '작성일', ''];

    /* 모달 상태 관리 변수 */
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedNoticeId, setSelectedNoticeId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminCustomerNoticeData.json");
                setNotice(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const openConfirmModalHandler = (event, row) => {
        event.stopPropagation();
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModalHandler = () => {
        setIsConfirmModalOpen(false);
    };

    const handleConfirm = () => {
        /* modal 의 확인 을 누르면 button 이 disabled */
        setIsConfirming(true);
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
            </Box>
            {isConfirmModalOpen && (
                <ConfirmModal color={'#FF5D5D'} isOpen={isConfirmModalOpen} onClose={closeConfirmModalHandler}
                              onConfirm={handleConfirm}>
                    <div>해당 글을 삭제합니다.</div>
                </ConfirmModal>
            )}
            {selectedNoticeId !== null && (
                <NoticeModal
                    open={isDetailModalOpen} handleClose={handleCloseDetailModal} noticeId={selectedNoticeId}
                    noticeList={notice}/>
            )}
            {
                <NoticeWriteModal
                    open={isWriteModalOpen} handleClose={handleCloseWriteModal}/>
            }
        </Box>
    );
}

export default CustomerNotice;
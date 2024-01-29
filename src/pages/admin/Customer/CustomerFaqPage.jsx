import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import CustomerFaqTable from "../../../components/admin/Table/CustomerFaqTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FaqModal from "../../../components/admin/Modal/FaqModal";
import FaqWriteModal from "../../../components/admin/Modal/FaqWriteModal";

const primary = indigo[50];
const drawerWidth = 260;

function CustomerFAQ() {
    const [faqList, setFaqList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('회원문의');
    const tableHeader = ['구분', '제목', '작성자', ''];

    /* 모달 상태 관리 변수 */
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

    const [isConfirming, setIsConfirming] = useState(false);
    const [selectedFaqId, setSelectedFaqId] = useState(null);

    const menuList = [
        {title: '회원문의'},
        {title: '주문/결제 문의'},
        {title: '반품/환불 문의'},
        {title: '마일리지 문의'}
    ];

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/board/faq?type=USER`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setFaqList(response.data.data.content);
                console.log(faqList);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
        // try {
        //     const response = await axios.get(`/api/AdminCustomerFaqTestData.json`);
        //     /* 데이터를 테이블 형식에 맞게 가공하고 inquiryList 업데이트 */
        //     setFaqList(response.data);
        // } catch (error) {
        //     console.error("Error fetching data: ", error);
        // }
    };

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
            const url = `http://172.16.210.136:8080/api/admin/board/faq/${faqId}`;
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
            <LeftNav/>
            <Header title={'FAQ'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange}/>
                    <CustomerFaqTable headers={tableHeader} rows={faqList} onDeleteClick={onDeleteClick}
                                      onRowClick={handleRowClick}/>
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
                        endIcon={<BorderColorIcon />}
                        onClick={handleWriteButtonClick}>
                        작성하기
                    </Button>
                </Paper>
            </Box>
            {/* {isConfirmModalOpen && (
                <ConfirmModal color={'#FF5D5D'} isOpen={isConfirmModalOpen} onClose={closeConfirmModalHandler} onConfirm={handleConfirm}>
                    <div>해당 글을 삭제합니다.</div>
                </ConfirmModal>
            )} */}
            {
                selectedFaqId !== null && (
                    <FaqModal open={isDetailModalOpen} handleClose={handleCloseDetailModal} faqId={selectedFaqId}
                              faqList={faqList}/>
                )
            }
            {
                <FaqWriteModal open={isWriteModalOpen} handleClose={handleCloseWriteModal} />
            }
        </Box>
    );
}

export default CustomerFAQ;
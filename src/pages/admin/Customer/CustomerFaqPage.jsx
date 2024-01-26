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

const primary = indigo[50];
const drawerWidth = 260;

function CustomerFAQ() {
    const [faqList, setFaqList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('회원문의');
    const tableHeader = ['구분', '제목', '작성자', '작성일', ''];

    const [isOpen, setIsOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const menuList = [
        {title: '회원문의'},
        {title: '주문/결제 문의'},
        {title: '반품/환불 문의'},
        {title: '마일리지 문의'}
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminCustomerFaqData.json");
                setFaqList(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
        try {
            const response = await axios.get(`/api/AdminCustomerFaqTestData.json`);
            /* 데이터를 테이블 형식에 맞게 가공하고 inquiryList 업데이트 */
            setFaqList(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    const openModalHandler = (row) => {
        setIsOpen(true);
    };

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    const handleConfirm = () => {
        /* modal 의 확인 을 누르면 button 이 disabled */
        setIsConfirming(true);
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
                    <CustomerFaqTable headers={tableHeader} rows={faqList} onDeleteClick={openModalHandler} />
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
                        endIcon={<BorderColorIcon />}>
                        작성하기
                    </Button>
                </Paper>
            </Box>
            {isOpen && (
                <ConfirmModal color={'#FF5D5D'} isOpen={isOpen} onClose={closeModalHandler} onConfirm={handleConfirm}>
                    <div>해당 글을 삭제합니다.</div>
                </ConfirmModal>
            )}
        </Box>
    );
}

export default CustomerFAQ;
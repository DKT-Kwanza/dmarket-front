import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import CustomerInquiryTable from "../../../components/admin/Table/CustomerInquiryTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";

const primary = indigo[50];
const drawerWidth = 260;

function CustomerInquiry() {
    const [inquiryList, setInquiryList] = useState([]);
    const [selectedTab, setSelectedTab] = useState('회원문의');
    const tableHeader = ['구분', '제목', '작성자', '작성일', '답변상태', ''];

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
                const response = await axios.get("/api/AdminCustomerInquiryData.json");
                setInquiryList(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
        try {
            const response = await axios.get(`/api/AdminCustomerInquiryTestData.json`);
            /* 데이터를 테이블 형식에 맞게 가공하고 inquiryList 업데이트 */
            setInquiryList(response.data);
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
            <Header title={'문의 게시판'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange}/>
                    <CustomerInquiryTable headers={tableHeader} rows={inquiryList} onDeleteClick={openModalHandler} />
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

export default CustomerInquiry;
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import OrderRefundTable from "../../../components/admin/Table/OrderRefundTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import axios from "axios";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";

const primary = indigo[50];
const drawerWidth = 260;

function Refund() {
    const [orderCancel, setOrderCancel] = useState([]);
    const tableHeader = ['주분번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '요청사유', '환불 요청'];

    const [isOpen, setIsOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminOrderRefundData.json");
                setOrderCancel(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

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
            <Header title={'취소 목록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <OrderRefundTable headers={tableHeader} rows={orderCancel} onApplyClick={openModalHandler}/>
                </Paper>
            </Box>
            {isOpen && (
                <ConfirmModal color={'#3E80FF'} isOpen={isOpen} onClose={closeModalHandler} onConfirm={handleConfirm}>
                    <div>해당 주문에 대한 마일리지 환불을 요청합니다.</div>
                </ConfirmModal>
            )}
        </Box>
    );
}

export default Refund;
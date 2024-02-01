import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import OrderRefundTable from "../../../components/admin/Table/OrderRefundTable";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from '@mui/material/colors';
import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";

const primary = indigo[50];
const drawerWidth = 260;

function Refund() {
    const navigate = useNavigate();
    const [orderCancel, setOrderCancel] = useState([]);
    const [selectedTab, setSelectedTab] = useState('수거 완료');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [refundPercents, setRefundPercents] = useState({});

    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '요청사유', '환불 요청'];

    const token = sessionStorage.getItem('token');

    /* 수거 완료인 상태 리스트 조회 */
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://172.16.210.136:8080/api/admin/orders/returns?status=${selectedTab}&page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setOrderCancel(response.data.data.returnList.content);
            setTotalPages(response.data.data.returnList.totalPages);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, selectedTab, token]);

    /* 환불 요청 */
    const onChangeRefundStatusClick = async (returnId, refundPercent) => {
        try {
            await axios.put(`http://172.16.210.136:8080/api/admin/cancel-order-details`, {
                returnId: returnId,
                refundPercent: refundPercent,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            alert("환불 요청이 완료되었습니다!");
            setOrderCancel(prevStatus => prevStatus.filter(item => item.returnId !== returnId));      
    
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'환불 요청'}/>
            <Box bgcolor={primary} component="main" sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2} sx={{p: '20px 30px'}}>
                <OrderRefundTable
                    headers={tableHeader}
                    rows={orderCancel}
                    refundPercents={refundPercents}
                    onApplyClick={onChangeRefundStatusClick}
                />
                </Paper>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}

export default Refund;
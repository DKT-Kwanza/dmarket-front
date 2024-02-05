import {useEffect, useState} from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import OrderCancelTable from "../../../components/admin/Table/OrderCancelTable";
import axios from "axios";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

const primary = indigo[50];
const drawerWidth = 260;

function OrderCancel() {
    const navigate = useNavigate();
    const [orderCancel, setOrderCancel] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '주문날짜', '취소상태'];

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.136:8080/api/admin/cancel-order-details`,{
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });
                console.log(response.data);
                setOrderCancel(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    },[]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

return (
    <Box>
        <LeftNav/>
        <Header title={'취소 목록'}/>
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
                <OrderCancelTable headers={tableHeader} rows={orderCancel}/>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Paper>
        </Box>
    </Box>

);
}

export default OrderCancel;
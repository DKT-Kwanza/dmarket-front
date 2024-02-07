import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LeftNav from "@components/admin/Sidebar/LeftNav";
import Header from "@components/admin/Header/Header";
import TabMenu from "@components/admin/Common/TabMenu/TabMenu";
import ReturnStatusTable from "@components/admin/Table/ReturnStatusTable";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {adminApi} from "@api/Api";

const primary = indigo[50];
const drawerWidth = 260;

function ReturnStatus() {
    const navigate = useNavigate();
    const [returnStatus, setReturnStatus] = useState([]);
    const [selectedTab, setSelectedTab] = useState('반품 요청');
    const [menuList, setMenuList] = useState([]);
    const tableHeader = ['주문번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '요청사유', '주문날짜', '요청날짜', '반품상태 변경'];
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        fetchData();
    }, [selectedTab, currentPage, token]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${adminApi}/orders/returns?status=${selectedTab}&page=${currentPage}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setReturnStatus(response.data.data.returnList.content);
            setTotalPages(response.data.data.returnList.totalPages);
            setMenuList([
                {title: '반품 요청', count: response.data.data.returnReqCount},
                {title: '수거중', count: response.data.data.returnColCount}
            ]);
        } catch (e) {
            console.error(e);
        }
    };

    const handleTabChange = (tabTitle) => {
        setSelectedTab(tabTitle);
        setCurrentPage(1);
    };

    const onChangeReturnStatusClick = async (returnId, selectedStatus) => {
        try {
            await axios.put(`${adminApi}/orders/returns/${returnId}`, {
                returnStatus: selectedStatus,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            alert("반품 상태가 변경되었습니다.");
            setReturnStatus(prevStatus => prevStatus.filter(item => item.returnId !== returnId));
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
            <Header title={'반품 요청'}/>
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
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange}/>
                    <ReturnStatusTable headers={tableHeader} rows={returnStatus}
                                       onChangeReturnStatusClick={onChangeReturnStatusClick}/>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}/>
                </Paper>
            </Box>
        </Box>

    );
}

export default ReturnStatus;
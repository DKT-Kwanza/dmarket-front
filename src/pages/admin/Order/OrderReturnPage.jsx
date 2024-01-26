import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import ReturnStatusTable from "../../../components/admin/Table/ReturnStatusTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import {useEffect, useState} from "react";
import axios from "axios";

const primary = indigo[50];
const drawerWidth = 260;

function ReturnStatus() {
    const [returnStatus, setReturnStatus] = useState([]);
    const [selectedTab, setSelectedTab] = useState('반품 요청');
    const [menuList, setMenuList] = useState([]);
    const tableHeader = ['주분번호', '상품번호', '브랜드', '상품', '옵션', '주문수량', '요청사유', '주문날짜', '요청날짜', '반품상태 변경'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminOrderReturnStatusData.json");
                setReturnStatus(response.data);
                console.log(returnStatus);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        /* returnStatus가 업데이트되었을 때만 setMenuList 호출 */
        if (returnStatus && returnStatus.returnList) {
            setMenuList([
                {title: '반품 요청', count: returnStatus.returnReqCount},
                {title: '수거 중', count: returnStatus.returnColCount},
                {title: '수거 완료', count: returnStatus.colConfCount},
                {title: '반품 완료', count: returnStatus.returnConfcount}
            ]);
        }
    }, [returnStatus]);

    const handleTabChange = async (tabTitle) => {
        setSelectedTab(tabTitle);
        try {
            const response = await axios.get(`/api/AdminOrderReturnStatusTestData.json`);
            /* 데이터를 테이블 형식에 맞게 가공하고 returnStatus 업데이트 */
            setReturnStatus(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
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
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange} />
                    <ReturnStatusTable headers={tableHeader} rows={returnStatus.returnList} />
                </Paper>
            </Box>
        </Box>

    );
}

export default ReturnStatus;
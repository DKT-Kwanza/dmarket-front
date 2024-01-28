import {useEffect, useState} from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import ManagerTable from "../../../components/admin/Table/MangerTable";
import {Paper, Box} from "@mui/material";
import {indigo} from '@mui/material/colors';
import FilledButton from "../../../components/admin/Common/Button/FilledButton";
import axios from "axios";
import AdminModal from "../../../components/admin/Modal/AdminModal";

const primary = indigo[50];
const drawerWidth = 260;

function AdminPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const tableHeader = ['이름', '이메일', '관리자 그룹', '가입일'];

    /* 모달 상태 관리 변수 */
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

    const [manager, setManager] = useState({
        totalMangerCount: 0,
        GMCount: 0,
        SMCount: 0,
        PMCount: 0,
        managerList: []
    });

    const MENU_LIST = [
        {title: '전체관리자', count: manager.totalMangerCount},
        {title: '총괄관리자', count: manager.GMCount},
        {title: '시스템관리자', count: manager.SMCount},
        {title: '상품관리자', count: manager.PMCount},
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminManagerData.json");
                setManager(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    const handleButtonClick = () => {
        setIsAdminModalOpen(true);
        console.log('clicked')
    }

    const handleCloseAdminModal = () => {
        setIsAdminModalOpen(false);
    }

    const filteredManager = manager.managerList.filter((row) => {
        if (selectedTab === '전체관리자' || selectedTab === 0) {
            return true;
        } else if (selectedTab === '총괄관리자' && row.userRole === 'GM') {
            return true;
        } else if (selectedTab === '시스템관리자' && row.userRole === 'SM') {
            return true;
        } else if (selectedTab === '상품관리자' && row.userRole === 'PM') {
            return true;
        }
        return false;
    });

    return (
        <Box>
            <LeftNav/>
            <Header title={'관리자 목록'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2} sx={{p: '20px 30px'}}>
                    <TabMenu menu={MENU_LIST} selectedTab={selectedTab} onTabChange={handleTabChange} />
                        <ManagerTable headers={tableHeader} rows={filteredManager} />
                    <FilledButton onClick={handleButtonClick} children={'등록/변경'}>등록/변경</FilledButton>
                </Paper>
            </Box>
            {
                <AdminModal open={isAdminModalOpen} handleClose={handleCloseAdminModal} />
            }
        </Box>
    );
}

export default AdminPage;
import { useEffect, useState } from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu";
import ManagerTable from "../../../components/admin/Table/MangerTable";
import { Paper, Box } from "@mui/material";
import { indigo } from '@mui/material/colors';
import FilledButton from "../../../components/admin/Common/Button/FilledButton";
import {adminApi} from "../../../Api";
import axios from "axios";
import AdminModal from "../../../components/admin/Modal/AdminModal";

const primary = indigo[50];
const drawerWidth = 260;

function AdminPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [menuList, setMenuList] = useState([]);
    const tableHeader = ['이름', '이메일', '관리자 그룹', '가입일'];
    const [shouldReload, setShouldReload] = useState(false);


    /* 모달 상태 관리 변수 */
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

    const [manager, setManager] = useState({
        totalManagerCount: 0,
        gmcount: 0,
        smcount: 0,
        pmcount: 0,
        managerList: []
    });


    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const url = `${adminApi}/admin-users`;
            try {
                const response = await axios.get(url , {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setManager(response.data.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        if (manager) {
            setMenuList([
                { title: '전체관리자', count: manager.totalManagerCount },
                { title: '총괄관리자', count: manager.gmcount },
                { title: '시스템관리자', count: manager.smcount },
                { title: '상품관리자', count: manager.pmcount },
            ]);
        }
    },[manager]) // 의존성 배열에 manager 추가

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    const handleButtonClick = () => {
        setIsAdminModalOpen(true);
        console.log('clicked')
    }

    
    const handleCloseAdminModal = () => {
        setIsAdminModalOpen(false);
        setShouldReload(true); // 모달 창이 닫힐 때 shouldReload를 true로 설정합니다.
    }

    const filteredManager = manager.managerList.filter((row) => {
        if (selectedTab === '전체관리자' || selectedTab === 0) {
            return true;
        } else if (selectedTab === '총괄관리자' && row.userRole === 'ROLE_GM') {
            return true;
        } else if (selectedTab === '시스템관리자' && row.userRole === 'ROLE_SM') {
            return true;
        } else if (selectedTab === '상품관리자' && row.userRole === 'ROLE_PM') {
            return true;
        }
        return false;
    });

    useEffect(() => {
        const fetchData = async () => {
            const url = `${adminApi}/admin-users`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setManager(response.data.data);
                setShouldReload(false); // API 호출이 완료된 후에 shouldReload를 false로 설정합니다.
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [shouldReload]); // 의존성 배열에 shouldReload를 추가합니다.
    


    return (
        <Box>
            <LeftNav />
            <Header title={'관리자 목록'} />
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{ height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px` }}>
                <Paper square elevation={2} sx={{ p: '20px 30px' }}>
                    <FilledButton onClick={handleButtonClick} children={'등록/변경'}>등록/변경</FilledButton>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange} />
                    <ManagerTable headers={tableHeader} rows={filteredManager} />
                </Paper>
            </Box>
            {
                <AdminModal open={isAdminModalOpen} handleClose={handleCloseAdminModal} />
            }
        </Box>
    );
}

export default AdminPage;
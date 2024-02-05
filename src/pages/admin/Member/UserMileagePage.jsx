import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Paper, Box, Pagination} from "@mui/material";
import TabMenu from "../../../components/admin/Common/TabMenu/TabMenu"
import { indigo } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {adminApi} from "../../../Api";
import MileageTable from "../../../components/admin/Table/MileageTable";
import MileageReqTable from "../../../components/admin/Table/MileageReqTable";

const primary = indigo[50];
const drawerWidth = 260;

function UserMileagePage() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("마일리지 처리 요청");
    const [mileageReqData, setMileageReqData] = useState([]);
    const [mileageData, setMileageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const tableHeader = ["일자", "이름", "이메일", "사유", "마일리지", "처리", ""];
    const menuList = [
        { title: '마일리지 처리 요청'},
        { title: '마일리지 처리 내역'}
    ];

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchMileageData = async (status) => {
            try {
                const response = await axios.get(`${adminApi}/users/mileage-history?status=${status}&page=${currentPage}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (status === "PROCESSING") {
                    setMileageReqData(response.data.data.content);
                } else {
                    setMileageData(response.data.data.content);
                }
                setTotalPages(response.data.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedTab === "마일리지 처리 요청") {
            fetchMileageData("PROCESSING");
        } else if (selectedTab === "마일리지 처리 내역") {
            fetchMileageData("PROCESSED");
        }
    }, [selectedTab, currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    const handleTabChange = (tabTitle) => {
        setSelectedTab(tabTitle);
        setCurrentPage(1); 
    }

    return (
        <Box>
            <LeftNav />
            <Header title={"사용자 마일리지"} />
            <Box
                bgcolor={primary}
                component="main"
                sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                flex: 1,
                p: 3,
                mt: 9,
                ml: `${drawerWidth}px`,
                }}
            >
                <Paper square elevation={2} sx={{ p: "20px 30px" }}>
                    <TabMenu menu={menuList} selectedTab={selectedTab} onTabChange={handleTabChange} />
                    {selectedTab === "마일리지 처리 요청" && (
                        <MileageReqTable headers={tableHeader} rows={mileageReqData} />
                    )}
                    {selectedTab === "마일리지 처리 내역" && (
                        <MileageTable headers={tableHeader} rows={mileageData} />
                    )}
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Paper>
            </Box>
        </Box>
    );
}

export default UserMileagePage;

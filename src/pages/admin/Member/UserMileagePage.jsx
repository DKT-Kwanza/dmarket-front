import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Paper, Box, Button, Pagination} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MileageTable from "../../../components/admin/Table/MileageTable";
import MileageReqTable from "../../../components/admin/Table/MileageReqTable";

const primary = indigo[50];
const drawerWidth = 260;

function UserMileagePage() {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState("mileageReq");
    const [mileageReqData, setMileageReqData] = useState([]);
    const [mileageData, setMileageData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const tableHeader = ["일자", "이름", "이메일", "사유", "마일리지", "처리", ""];

    const token = sessionStorage.getItem('token');

    const fetchMileageReqData = async () => {
        try {
            const response = await axios.get(`http://172.16.210.136:8080/api/admin/users/mileage-history?status=PROCESSING&page=${currentPage}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMileageReqData(response.data.data.content);
            setTotalPages(response.data.data.totalPage);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMileageData = async () => {
        try {
            const response = await axios.get(`http://172.16.210.136:8080/api/admin/users/mileage-history?status=PROCESSED&page=${currentPage}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setMileageData(response.data.data.content);
            setTotalPages(response.data.data.totalPage);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchData = async () => {
        if (selectedTab === "mileageReq") {
            await fetchMileageReqData();
        } else if (selectedTab === "mileageInfo") {
            await fetchMileageData();
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [currentPage, selectedTab]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        fetchData(); 
    };

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
                <div>
                    <div className="button-container">
                    <Button
                        variant={selectedTab === "mileageReq" ? "contained" : "outlined"}
                        sx={{ mr: 1 }}
                        onClick={() => handleTabChange("mileageReq")}
                    >
                        마일리지 처리 요청
                    </Button>
                    <Button
                        variant={selectedTab === "mileageInfo" ? "contained" : "outlined"}
                        onClick={() => handleTabChange("mileageInfo")}
                    >
                        마일리지 처리 내역
                    </Button>
                    </div>
                </div>
                {selectedTab === "mileageReq" && (
                    <MileageReqTable headers={tableHeader} rows={mileageReqData} fetchData={fetchData} />
                )}
                {selectedTab === "mileageInfo" && (
                    <MileageTable headers={tableHeader} rows={mileageData} />
                )}
                </Paper>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Box>
        </Box>
    );
}

export default UserMileagePage;

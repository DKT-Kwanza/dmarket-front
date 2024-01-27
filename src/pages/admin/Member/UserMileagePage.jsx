import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Paper, Box, Button } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { useState, useEffect } from "react";
import axios from "axios";
import MileageTable from "../../../components/admin/Table/MileageTable";
import MileageReqTable from "../../../components/admin/Table/MileageReqTable";

const primary = indigo[50];
const drawerWidth = 260;

function UserMileagePage() {
    const [selectedTab, setSelectedTab] = useState("mileageReq");
    const [mileageReqData, setMileageReqData] = useState([]);
    const [mileageData, setMileageData] = useState([]);
    const tableHeader = ["일자", "이름", "이메일", "사유", "마일리지", "처리", ""];

    const fetchMileageReqData = async () => {
        const response = await axios.get("/api/AdminMileageReqData.json");
        setMileageReqData(response.data);
    };

    const fetchMileageData = async () => {
        const response = await axios.get("/api/AdminMileageData.json");
        setMileageData(response.data);
    };

    useEffect(() => {
        fetchMileageReqData();
        fetchMileageData();
    }, []);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
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
                    <MileageReqTable headers={tableHeader} rows={mileageReqData} />
                )}
                {selectedTab === "mileageInfo" && (
                    <MileageTable headers={tableHeader} rows={mileageData} />
                )}
                </Paper>
            </Box>
        </Box>
    );
}

export default UserMileagePage;

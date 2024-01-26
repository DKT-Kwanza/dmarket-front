import * as React from "react";
import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import TabMenu from "../../../components/admin/TabMenu";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MileageTable from '../../../components/admin/MileageTable'
import MileageReqTable from '../../../components/admin/MileageReqTable'

const primary = indigo[50];
const drawerWidth = 260;

function MemberMileage() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [mileageData, setMileageData] = useState([]);
    const [mileageReqData, setMileageReqData] = useState([]);
    const [selectedTab, setSelectedTab] = React.useState(0);

    const tableHeader = ['일자', '이름', '이메일', '사유', '마일리지', '처리', ''];

    useEffect(() => {
        if (selectedTab === 0) {
            const fetchData = async () => {
                try {
                    const response = await axios.get("/api/AdminMileageReqData.json");
                    setMileageReqData(response.data);
                } catch (e) {
                    console.error("Error fetching data: ", e);
                }
            };
            fetchData();
        }
    }, [selectedTab]);

    useEffect(() => {
        if (selectedTab === 1) {
            const fetchData = async () => {
                try {
                    const response = await axios.get("/api/AdminMileageData.json");
                    setMileageData(response.data);
                } catch (e) {
                    console.error("Error fetching data: ", e);
                }
            };
            fetchData();
        }
    }, [selectedTab]);

    const MENU_LIST = [
        {title: '마일리지 처리 요청'},
        {title: '마일리지 처리 내역'},
    ];

    const handleTabChange = (newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'사용자 마일리지'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2} sx={{p: '20px 30px'}}>
                    <TabMenu menu={MENU_LIST} selectedTab={selectedTab} onTabChange={setSelectedTab} />
                    {selectedTab === 0 && <MileageReqTable headers={tableHeader} rows={mileageReqData}/>}
                    {selectedTab === 1 && <MileageTable headers={tableHeader} rows={mileageData}/>}
                </Paper>
            </Box>
        </Box>

    );
}

export default MemberMileage;
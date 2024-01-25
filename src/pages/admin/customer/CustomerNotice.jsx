import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import CustomerNoticeTable from "../../../components/admin/Table/CustomerNoticeTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import {useEffect, useState} from "react";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import * as React from "react";

const primary = indigo[50];
const drawerWidth = 260;
function CustomerNotice() {
    const [notice, setNotice] = useState([]);
    const tableHeader = ['제목', '작성자', '작성일', ''];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminCustomerNoticeData.json");
                setNotice(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <Box>
            <LeftNav/>
            <Header title={'공지사항'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <CustomerNoticeTable headers={tableHeader} rows={notice} />
                    <Button
                        sx={{float: 'right'}}
                        variant="contained"
                        endIcon={<BorderColorIcon />}>
                        작성하기
                    </Button>
                </Paper>
            </Box>
        </Box>

    );

}

export default CustomerNotice;
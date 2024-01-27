import * as React from "react";
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import QnaTable from "../../../components/admin/Table/QnaTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const primary = indigo[50];
const drawerWidth = 260;

function ProductQnaPage() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedQnaId, setSelectedQnaId] = useState(null);

    const tableHeader = ['상품번호', '제목', '작성자', '작성일', '답변상태', ''];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminProductQnaData.json");
                setRows(response.data);
                
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleRowClick = (qnaId) => {
        setSelectedQnaId(qnaId);
        setOpen(true);
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'상품Q&A'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <QnaTable headers={tableHeader} rows={rows} onRowClick={handleRowClick} />
                </Paper>
            </Box>
        </Box>

    );
}

export default ProductQnaPage;
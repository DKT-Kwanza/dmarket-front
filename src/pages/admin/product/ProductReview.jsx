import * as React from "react";
import LeftNav from "../../../components/admin/LeftNav";
import Header from "../../../components/admin/Header";
import QnaTable from "../../../components/admin/QnaTable";
import {Paper, Box, Button} from "@mui/material";
import {indigo} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewTable from '../../../components/admin/ReviewTable'
import ReviewModal from '../../../components/admin/ReviewModal.jsx';

const primary = indigo[50];
const drawerWidth = 260;

function ProductReview() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);

    const tableHeader = ['상품', '옵션', '별점', '작성자', '작성일', ''];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminProductReviewData.json");
                setRows(response.data);
                
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    });

    const handleRowClick = (review) => {
        setSelectedReview(review);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <Box>
            <LeftNav/>
            <Header title={'상품리뷰'}/>
            {/*컨텐츠 영역입니다.*/}
            <Box
                bgcolor={primary}
                component="main"
                sx={{height: '100vh', display: 'flex', flexDirection: 'column', flex: 1, p: 3, mt: 9, ml: `${drawerWidth}px`}}>
                <Paper square elevation={2}
                    sx={{p: '20px 30px'}}>
                    <ReviewTable headers={tableHeader} rows={rows} onRowClick={handleRowClick} />
                </Paper>
            </Box>
            {selectedReview && (
                <ReviewModal open={openModal} handleClose={handleCloseModal} reviewData={selectedReview} />
            )}
        </Box>

    );
}

export default ProductReview;
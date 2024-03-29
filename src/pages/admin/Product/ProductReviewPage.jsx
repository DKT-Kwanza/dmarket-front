import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import LeftNav from "@components/admin/Sidebar/LeftNav.jsx";
import Header from "@components/admin/Header/Header.jsx";
import ReviewTable from "@components/admin/Table/ReviewTable.jsx"
import ReviewModal from "@components/admin/Modal/ReviewModal.jsx";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {adminApi} from "@api/Api";

const primary = indigo[50];
const drawerWidth = 260;

function ProductReviewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const tableHeader = ['상품', '옵션', '별점', '작성자', '작성일', ''];

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get('page') || '1', 10);
        setCurrentPage(page);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${adminApi}/products/review?pageNo=${page}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setRows(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                console.log(response.data)
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [currentPage, location.search]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };
    
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
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                </Paper>
            </Box>
            {selectedReview && (
                <ReviewModal open={openModal} handleClose={handleCloseModal} reviewData={selectedReview} />
            )}
        </Box>

    );
}

export default ProductReviewPage;
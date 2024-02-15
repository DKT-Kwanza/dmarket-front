import * as React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";
import LeftNav from "@components/admin/Sidebar/LeftNav";
import Header from "@components/admin/Header/Header";
import QnaTable from "@components/admin/Table/QnaTable";
import {Paper, Box, Pagination} from "@mui/material";
import {indigo} from "@mui/material/colors";
import axios from "axios";
import {adminApi} from "@api/Api";

const primary = indigo[50];
const drawerWidth = 260;

function ProductQnaPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedQnaId, setSelectedQnaId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const tableHeader = ['상품번호', '제목', '작성자', '작성일', '답변상태', ''];

    const token = sessionStorage.getItem('token');

    const fetchQnaList = async () => {
        try {
            const response = await axios.get(`${adminApi}/products/qna?page=${currentPage}`, {
                headers: {'Authorization': `Bearer ${token}`}
            });
            setRows(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.error("Error fetching QnA list: ", error);
        }
    };

    useEffect(() => {
        fetchQnaList();
    }, [currentPage]);


    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

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
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    p: 3,
                    mt: 9,
                    ml: `${drawerWidth}px`
                }}>
                <Paper square elevation={2}
                       sx={{p: '20px 30px'}}>
                    <QnaTable headers={tableHeader} rows={rows} onRowClick={handleRowClick}
                              fetchQnaList={fetchQnaList}/>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}/>
                </Paper>
            </Box>
        </Box>

    );
}

export default ProductQnaPage;
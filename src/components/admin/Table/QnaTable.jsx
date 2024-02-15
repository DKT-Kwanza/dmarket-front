import React, { useState } from "react";
import { formatDate } from '@utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import QnaModal from "../Modal/QnaModal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function QnaTable({ headers, rows, onRowClick, fetchQnaList={fetchQnaList} }) {
    const [selectedQnaId, setSelectedQnaId] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [isQnaDetailModalOpen, setIsQnaDetailModalOpen] = useState(false);

    const handleQnaDetailModalOpen = (qnaId) => {
        setSelectedQnaId(qnaId);
        setIsQnaDetailModalOpen(true);
    };

    const handleDeleteClick = (qnaId) => {
        setSelectedQnaId(qnaId);
        setIsConfirmModalOpen(true);
    };

    const handleCloseConfirmModal = () => {
        setIsConfirmModalOpen(false);
        fetchQnaList();
    };
    

    return (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((item, index) => (
                        <TableRow key={item.qnaId}>
                            <TableCell component="th" scope="row">
                                {item.productName}
                            </TableCell>
                            <TableCell align="center" onClick={() => handleQnaDetailModalOpen(item.qnaId)}>
                                <Box sx={{ display: 'flex' }}>
                                    {item.qnaTitle}
                                    {item.qnaIsSecret && (
                                        <LockOutlinedIcon fontSize="small" sx={{ ml: 0.5 }} />
                                    )}
                                </Box>
                            </TableCell>
                            <TableCell>{item.qnaWriter}</TableCell>
                            <TableCell>{formatDate(item.qnaCreatedDate)}</TableCell>
                            <TableCell
                                sx={{ color: item.qnaStatus === '답변 완료' ? '#3377FF' : '#FF5D5D' }}
                            >
                                {item.qnaStatus}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isQnaDetailModalOpen && ( 
                <QnaModal open={true} handleClose={() => setIsQnaDetailModalOpen(false)} qnaId={selectedQnaId} fetchQnaList={fetchQnaList} />
            )}
        </TableContainer>
    );
}

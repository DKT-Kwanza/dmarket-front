import React, {useState} from "react";
import { formatDate } from '../../../utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ConfirmCancelModal from "../../../components/commmon/Modal/ConfirmCancelModal";

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

export default function UserTable({ headers, rows }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleOpenModal = (userId) => {
        setSelectedUserId(userId);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleConfirmDelete = () => {
        setIsOpen(false);
        // 삭제 api 추가
    };

    return (
        <TableContainer component={Paper} sx={{mb: 2}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            headers.map((header)=>(
                                <TableCell>{header}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={rows.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell>{rows.userName}</TableCell>
                        <TableCell>{rows.userDktNum}</TableCell>
                        <TableCell>{rows.userEmail}</TableCell>
                        <TableCell>{rows.userRole}</TableCell>
                        <TableCell>{formatDate(rows.userJoinDate)}</TableCell>
                        <TableCell>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleOpenModal(rows.userId)}
                            >
                                삭제
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            {isOpen && (
                <ConfirmCancelModal isOpen={isOpen} onClose={handleCloseModal} onConfirm={handleConfirmDelete}>
                    <div>{rows.userName} 님의 계정을 삭제합니다.</div>
                </ConfirmCancelModal>
            )}
        </TableContainer>
    );
}
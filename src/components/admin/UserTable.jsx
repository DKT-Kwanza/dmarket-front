import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

export default function UserTable({headers, rows}) {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDeleteProduct = (userId) => {
        alert(`${userId} 삭제됩니다`);
    }

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
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {rows.userName}
                        </TableCell>
                        <TableCell>{rows.userDktNum}</TableCell>
                        <TableCell>{rows.userEmail}</TableCell>
                        <TableCell>{rows.userRole}</TableCell>
                        <TableCell>{formatDate(rows.userJoinDate)}</TableCell>
                        <TableCell>
                            <Button
                                variant="outlined"
                                color="error"
                                href="#text-buttons"
                                onClick={() => handleDeleteProduct(rows.userId)}
                            >
                                삭제
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
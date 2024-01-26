import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatPrice } from '../../../utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

export default function MileageTable({headers, rows}) {
    const navigate = useNavigate();

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
                    {rows.map((item, index ) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {formatDate(item.mileageReqDate)}
                            </TableCell>
                            <TableCell>{item.userName}</TableCell>
                            <TableCell>{item.userEmail}</TableCell>
                            <TableCell>
                                {item.mileageReqReason}
                            </TableCell>
                            <TableCell>{formatPrice(item.mileageCharge)} P</TableCell>
                            <TableCell sx={{ color: item.mileageReqStatus === '승인' ? '#3377FF' : '#FF5D5D' }}>
                                {item.mileageReqStatus}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
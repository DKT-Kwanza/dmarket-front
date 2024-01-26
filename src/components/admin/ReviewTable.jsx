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

export default function ReviewTable({headers, rows, onRowClick}) {
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
                        <TableRow key={item.reviewId} onClick={() => onRowClick(item)}>
                            <TableCell component="th" scope="row">
                                {item.productName}
                            </TableCell>
                            <TableCell>{item.optionName}</TableCell>
                            <TableCell>★{item.reviewRating}</TableCell>
                            <TableCell>{item.reviewWriter}</TableCell>
                            <TableCell>{formatDate(item.reviewCreatedDate)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
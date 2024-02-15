import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {formatDate} from "@utils/Format";

export default function CustomerInquiryTable({headers, rows, onDeleteClick, onRowClick}) {


    return (
        <TableContainer component={Paper} sx={{mb: 2}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            headers.map((header) => (
                                <TableCell>{header}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows && rows.map((row, index) => (
                        <TableRow
                            key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={(event) => onRowClick(event, row.inquiryId)}>
                            <TableCell>{row.inquiryType}</TableCell>
                            <TableCell>{row.inquiryTitle}</TableCell>
                            <TableCell>{row.inquiryWriter}</TableCell>
                            <TableCell>{formatDate(row.inquiryCreateDate)}</TableCell>
                            <TableCell>
                                {
                                    row.inquiryStatus
                                        ? <div style={{color: '#6F97FF'}}>답변완료</div>
                                        : <div style={{color: 'red'}}>답변대기</div>
                                }
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onDeleteClick(row.inquiryId);
                                    }}
                                    variant="outlined"
                                    color="error"
                                    href="#text-buttons">삭제</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
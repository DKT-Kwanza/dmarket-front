import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function CustomerFaqTable({headers, rows, onDeleteClick, onRowClick}) {
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.faqId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={(event) => onRowClick(event, row.faqId)}>
                            <TableCell>{row.faqType}</TableCell>
                            <TableCell>{row.faqQuestion}</TableCell>
                            <TableCell>관리자</TableCell>
                            <TableCell>
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onDeleteClick(row.faqId);
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
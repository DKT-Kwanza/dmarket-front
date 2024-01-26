import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SelectBox from "../../commmon/SelectBox/SelectBox";

export default function CustomerNoticeTable({headers, rows, onDeleteClick}) {
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
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{row.noticeTitle}</TableCell>
                            <TableCell>관리자</TableCell>
                            <TableCell>{row.noticeCreatedDate}</TableCell>
                            <TableCell>
                                <Button
                                    onClick={()=>{onDeleteClick(row.noticeId)}}
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
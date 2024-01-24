import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function OrderStatusTable({headers, rows}) {
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
                    {/*데이터 확인용 로그*/}
                    {console.log(rows)}
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.orderId}</TableCell>
                            <TableCell>{row.productId}</TableCell>
                            <TableCell>{row.productBrand}</TableCell>
                            <TableCell>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <img
                                        width='50px'
                                        height='60px'
                                        style={{marginRight: '6px'}}
                                        src={row.productImg}/>
                                    <div>
                                        {row.productName}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{row.optionValue}</TableCell>
                            <TableCell>{row.productCount}</TableCell>
                            <TableCell>{row.orderDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
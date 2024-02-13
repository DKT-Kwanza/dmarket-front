import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SelectBox from "../../common/SelectBox/SelectBox";
import { formatDate } from "@utils/Format";

export default function ReturnStatusTable({ headers, rows, onChangeReturnStatusClick }) {
    const rowData = Array.isArray(rows) ? rows : rows.content || [];

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
                    {rowData.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{row.orderId}</TableCell>
                            <TableCell>{row.productId}</TableCell>
                            <TableCell>{row.productBrand}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        width='50px'
                                        height='60px'
                                        style={{ marginRight: '6px' }}
                                        src={row.productImg} />
                                    <div>
                                        {row.productName}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{row.optionValue}</TableCell>
                            <TableCell>{row.productCount}</TableCell>
                            <TableCell>{row.returnContents}</TableCell>
                            <TableCell>{formatDate(row.orderDate)}</TableCell>
                            <TableCell>{formatDate(row.returnReqDate)}</TableCell>
                            <TableCell>
                                <SelectBox
                                    key={`${row.returnId}-${row.returnStatus}`}
                                    text={row.returnStatus}
                                    options={['반품 준비중', '수거중', '수거 완료']}
                                    onChange={(selectedStatus) => onChangeReturnStatusClick(row.returnId, selectedStatus)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

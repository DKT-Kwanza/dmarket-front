import {useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SelectBox from "../../common/SelectBox/SelectBox";
import Button from "@mui/material/Button";
import {formatDate} from "@utils/Format";

export default function OrderStatusTable({headers, rows, onChangeOrderStatusClick}) {
    /* 선택된 select box 옵션 */
    const [selectedStatus, setSelectedStatus] = useState('결제 완료');
    const handleStatusChange = (selectedValue) => {
        setSelectedStatus(selectedValue);
    };

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
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
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
                            <TableCell>{formatDate(row.orderDate)}</TableCell>
                            <TableCell>
                                <SelectBox text={row.orderStatus} options={['결제 완료', '배송 준비', '배송중', '배송 완료']} onChange={handleStatusChange}/>
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onChangeOrderStatusClick(row.detailId, selectedStatus);
                                    }}
                                    variant="outlined">등록</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
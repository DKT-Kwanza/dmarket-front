import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SelectBox from "../../commmon/SelectBox/SelectBox";

export default function OrderRefundTable({ headers, rows, refundPercents, onApplyClick }) {

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
                            <TableCell>{row.returnContents}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                <SelectBox
                                    key={`${row.returnId}-${row.returnStatus}`}
                                    text={'환불 선택'}
                                    options={['100% 환불', '90% 환불']}
                                    value={refundPercents[row.returnId]}
                                    onChange={(selectedValue) => { 
                                        const selectedRefundPercent = selectedValue === '100% 환불' ? 100 : 90;
                                        onApplyClick(row.returnId, selectedRefundPercent);
                                    }}
                                />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
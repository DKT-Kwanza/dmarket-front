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
import Button from '@mui/material/Button';

export default function EditProductTable({headers, rows}) {
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate("./edit")
    }

    const handleDeleteProduct = (productId) => {
        alert(`${productId} 삭제됩니다`);
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
                    {rows.product.map((row, index ) => (
                        row.optionList.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.productId}
                                </TableCell>
                                <TableCell>{row.productBrand}</TableCell>
                                <TableCell>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <img
                                            width='50px'
                                            height='60px'
                                            style={{marginRight: '6px'}}
                                            src={row.productImg[0]} />
                                        <div>
                                            {row.productName}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.optionValue}</TableCell>
                                <TableCell>{formatPrice(row.productSalePrice)}</TableCell>
                                <TableCell>{row.productCategory}</TableCell>
                                <TableCell
                                    sx={{ color: item.optionStatus === '판매중' ? '#3377FF' : '#FF5D5D' }}
                                >
                                    {item.optionStatus}
                                </TableCell>
                                <TableCell>{item.optionQuantity}</TableCell>
                                <TableCell>{formatDate(row.productRegistDate)}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined"
                                        onClick={navigateToEdit}
                                        sx={{ mr: "20px"}}
                                    >
                                        수정
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleDeleteProduct(row.productId)}
                                        color="error"
                                    >
                                        삭제
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
import * as React from 'react';
import { useState } from 'react';
import { formatDate, formatPrice } from '../../../utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ConfirmCancelModal from '../../commmon/Modal/ConfirmCancelModal';

export default function EditProductTable({headers, rows}) {

    const [addOptionQuantities, setAddOptionQuantities] = useState({}); 
    const [isOpen, setIsOpen] = useState(false);
    const [addSubmitted, setAddSubmitted] = useState(false);
    
    const handleQuantityChange = (event, optionId) => {
        const value = event.target.value;

        setAddOptionQuantities(prevQuantities => ({
            ...prevQuantities,
            [optionId]: value,
        }));
    };


    const handleAddSubmit = (optionId) => {
        const quantity = addOptionQuantities[optionId];

        if (quantity !== undefined) {
            // 재고 추가 api 
            setAddSubmitted(true);
            setIsOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };


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
                    {rows.map((row, index ) => (
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
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={addOptionQuantities[item.optionId] || ''}
                                        onChange={(event) => handleQuantityChange(event, item.optionId)}
                                        sx={{ width: "70px"}}
                                    />
                                </TableCell>
                                <TableCell>{formatDate(row.productRegistDate)}</TableCell>
                                <TableCell>
                                    <Button 
                                        type="submit"
                                        variant="outlined"
                                        onClick={() => handleAddSubmit(item.optionId)}
                                    >
                                        등록
                                    </Button>
                                </TableCell>
                                {addSubmitted && isOpen && (
                                    <ConfirmCancelModal color={'#3377FF'} isOpen={isOpen} onClose={handleCloseModal} onConfirm={handleCloseModal}>
                                        <div>재고를 추가하시겠습니까?</div>
                                    </ConfirmCancelModal>
                                )}
                            </TableRow>
                        ))
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
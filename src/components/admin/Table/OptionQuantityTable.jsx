import * as React from 'react';
import axios from 'axios';
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
import {adminApi} from "../../../Api";

export default function EditProductTable({headers, rows, fetchData, setRows}) {

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

    const handleAddSubmit = (optionId, productId) => {
        const quantity = addOptionQuantities[optionId];
        
        if (quantity !== undefined) {
            const token = sessionStorage.getItem('token');
        
            const requestBody = {
                productId: productId,
                optionId: optionId,
                addCount: parseInt(quantity),
            };
            
            axios.put(`${adminApi}/products/stock`, requestBody, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                const updatedRows = rows.map((row) => {
                    if (row.productId === productId && row.optionList) {
                        return {
                            ...row,
                            optionList: row.optionList.map((item) => {
                                if (item.optionId === optionId) {
                                    return {
                                        ...item,
                                        optionQuantity: item.optionQuantity + parseInt(quantity),
                                    };
                                }
                                return item;
                            }),
                        };
                    }
                    return row;
                });
                
                setRows(updatedRows); 
                setAddSubmitted(true); 
                alert('재고가 추가되었습니다.');
                setAddOptionQuantities({});
            })
            .catch((error) => {
                console.error(error);
            });
        }
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
                                        src={row.imgList[0]} />
                                    <div>
                                        {row.productName}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{row.optionValue}</TableCell>
                            <TableCell>{formatPrice(row.productSalePrice)}</TableCell>
                            <TableCell>{row.productCategory}</TableCell>
                            <TableCell>{row.optionQuantity}</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    value={addOptionQuantities[row.optionId] || ''}
                                    onChange={(event) => handleQuantityChange(event, row.optionId)}
                                    sx={{ width: "70px"}}
                                />
                            </TableCell>
                            <TableCell>{formatDate(row.productRegistDate)}</TableCell>
                            <TableCell>
                            <Button 
                                type="submit"
                                variant="outlined"
                                onClick={() => handleAddSubmit(row.optionId, row.productId)}
                            >
                                등록
                            </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
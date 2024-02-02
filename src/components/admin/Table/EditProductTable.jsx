import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {adminApi} from "../../../Api";
import { formatDate, formatPrice } from '../../../utils/Format';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function EditProductTable({headers, rows, products, setProducts}) {
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    const navigateToEdit = () => {
        navigate("./edit")
    }
    
    // 주석 친 부분들은 모달창
    // const [isOpen, setIsOpen] = useState(false);
    // const [targetProductId, setTargetProductId] = useState(null);
    // const [targetOptionId, setTargetOptionId] = useState(null);

    // const handleOpenModal = (productId, optionId) => {
    //     setIsOpen(true);
    //     setTargetProductId(productId);
    //     setTargetOptionId(optionId);
    // };

    // const handleCloseModal = () => {
    //     setIsOpen(false);
    // };

    const handleConfirmDelete = async (targetProductId, targetOptionId) => {
        const url = adminApi + `/products/${targetProductId}/${targetOptionId}`;
        try {
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            alert("해당 상품에 대한 옵션이 삭제되었습니다!");

            const updatedProducts = products.map(product => ({
                ...product,
                optionList: product.optionList.filter(option => option.optionId !== targetOptionId)
            })).filter(product => product.optionList.length > 0);

            setProducts(updatedProducts);
        } catch (e) {
            console.error(e);
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
                    {rows.product.map((row, index) => (
                        row.optionList.map((item, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                                            src={row.productImg} />
                                        <div>
                                            {row.productName}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.optionValue}</TableCell>
                                <TableCell>{formatPrice(row.productSalePrice)}</TableCell>
                                <TableCell>{row.productCategory}</TableCell>
                                <TableCell>{item.optionQuantity}</TableCell>
                                <TableCell>{formatDate(row.productRegistDate)}</TableCell>
                                <TableCell>
                                    <Button 
                                        variant="outlined"
                                        onClick={navigateToEdit}
                                        sx={{ mr: "20px"}}>
                                        수정
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => handleConfirmDelete(row.productId, item.optionId)}
                                        color="error">
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

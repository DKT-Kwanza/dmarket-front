import * as React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Box, Paper, TextField, Button, Chip, Table, TableBody, TableCell, TableContainer, 
        TableHead, TableRow, InputAdornment, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import Stack from '@mui/material/Stack';
import { indigo } from '@mui/material/colors';
import ImageIcon from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import Write from "../../../components/admin/Common/Input/Write";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import axios from "axios";
import { adminApi, bucketToken, bucketURL } from "../../../Api";

const primary = indigo[50];
const drawerWidth = 260;

const categories = ['여성 의류', '남성 의류', '유아 의류', '신발', '가방/잡화', '생필품', '주방용품', 
                    '메이크업', '바디/헤어', '가구', '침구', '인테리어', '문구/사무용품', '데스크탑/노트북', 
                    '모바일/태블릿', '영상가전', '음향가전', '주방가전', '생활가전', '휘트니스', '등산/수영', 
                    '구기', '골프', '캠핑', '자전거/기타레저'];
                    
function ProductAddPage () {
    const navigate = useNavigate();
    const {v4} = require('uuid');
    const token = sessionStorage.getItem('token');
    const [productDes, setProductDes] = useState("");
    const [images, setImages] = useState(Array(5).fill(null));
    const [objecImages, setObjectImages] = useState(Array(5).fill(null));
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState(''); 
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState({ cost: '', sale: '' });
    const [options, setOptions] = useState([]);
    const [optionInput, setOptionInput] = useState('');
    const [optionValueInput, setOptionValueInput] = useState('');
    const [optionTags, setOptionTags] = useState([]);
    const [optionQuantities, setOptionQuantities] = useState({}); 

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                const objectNewImages = [...objecImages];
                newImages[index] = reader.result;
                objectNewImages[index] = file;
                setImages(newImages);
                setObjectImages(objectNewImages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleBrandChange = (event) => {
        setBrand(event.target.value);
    };

    const handleProductNameChange = (event) => {
        setProductName(event.target.value);
    };

    function onEditorChange(value) {
        setProductDes(value);
    }

    const handleOptionChange = (e) => {
        setOptionInput(e.target.value);
    };
    
    const handleOptionValueChange = (e) => {
        setOptionValueInput(e.target.value);
    };

    /* 옵션 값 */
    const handleAddOptionTag = () => {
        if (optionValueInput.trim()) { 
            const newOptionTag = {
                optionValue: optionValueInput.trim(),
                optionQuantity: 0 
            };
            setOptionTags([...optionTags, newOptionTag]);
            setOptionValueInput('');
        }
    };
    
    /* 옵션 값에 수량 업데이트 */
    const handleOptionQuantityChange = (index, quantity) => {
        const updatedOptionTags = [...optionTags];
        updatedOptionTags[index] = {
            ...updatedOptionTags[index],
            optionQuantity: parseInt(quantity, 10)
        };
        setOptionTags(updatedOptionTags);
    };

    /* 옵션값 삭제 */
    const handleDeleteOptionTag = (tagToDelete) => {
        setOptionTags(optionTags.filter(tag => tag !== tagToDelete));
        const updatedQuantities = {...optionQuantities};
        delete updatedQuantities[tagToDelete];
        setOptionQuantities(updatedQuantities);
    };

    const handlePriceChange = (prop) => (event) => {
        setPrice({ ...price, [prop]: event.target.value });
    };

    /* 옵션 추가하기 */
    const handleAddOption = () => {
        if (optionInput && optionTags.length > 0) {
            const newOptions = optionTags.map(tag => ({
                optionName: optionInput,
                optionValue: tag,
                optionQuantity: parseInt(optionQuantities[tag], 10) || 0,
            }));
            setOptions([...options, ...newOptions]);
            setOptionInput('');
            setOptionTags([]);
            setOptionQuantities({});
        }
    };
    

    /* 옵션값 스페이스바, 엔터로 분리 */
    const handleKeyUp = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            handleAddOptionTag();
        }
    };
    
    const handleAddSubmit = async(e) => {
    
        // Object Storage 저장
        const newImgList = [];
        for (let index = 0; index < objecImages.length; index++) {
            const file = objecImages[index];
            if (file) {
                const newProductImgSrc = `${bucketURL}${v4()}.${file.type.split('/')[1]}`;
                newImgList.push(newProductImgSrc);
                try {
                    await axios.put(newProductImgSrc, file, {
                        headers: {
                            'X-Auth-Token': bucketToken,
                            'Content-Type': file.type
                        }
                    });
                } catch (error) {
                    console.error('Error during request:', error);
                }
            }
        }
    
        // 서버로 이미지 및 새 상품 데이터 전송
        if (!token) {
            console.log('Token is missing');
            return;
        }

        try {
            const finalOptionList = optionTags.map(tag => ({
                optionName: optionInput, 
                optionValue: tag.optionValue,
                optionQuantity: tag.optionQuantity
            }));
    
            const response = await axios.post(`${adminApi}/product`, {
                brand: brand,
                productName: productName,
                categoryName: category,
                productPrice: price.cost,
                productDes: productDes,
                productSalePrice: price.sale,
                imgList: newImgList,
                optionList: finalOptionList
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert(`상품이 등록되었습니다.`);
            navigate('/productMng');
        } catch (error) {
            console.error("상품 등록 에러:", error);
            alert("상품 등록 중 오류가 발생했습니다.");
        }
    };
    
    return (
        <Box>
            <LeftNav />
            <Header title={'상품추가'} />
            <Box
            bgcolor={primary}
            component="main"
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                p: 3,
                mt: 9,
                ml: `${drawerWidth}px`
            }}>
            <Paper square elevation={2} sx={{ p: '20px 30px' }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    {images.map((img, index) => (
                        <Box key={index}>
                            <Stack direction="column" alignItems="center" spacing={1}>
                                {img && (
                                    <img
                                        src={img}
                                        alt={`preview ${index}`}
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                )}
                                <Button
                                    variant="contained"
                                    component="label"
                                    startIcon={<ImageIcon />}>
                                    이미지 업로드
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleImageChange(e, index)}
                                    />
                                </Button>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="category-select-label">카테고리</InputLabel>
                        <Select
                            labelId="category-select-label"
                            id="category-select"
                            value={category}
                            label="카테고리"
                            onChange={handleCategoryChange}
                        >
                            {categories.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="브랜드"
                        id="brand-input"
                        sx={{ mb: 2 }}
                        value={brand}
                        onChange={handleBrandChange}
                    />
                    <TextField
                        fullWidth
                        label="상품명"
                        id="product-name-input"
                        sx={{ mb: 2 }}
                        value={productName}
                        onChange={handleProductNameChange}
                    />
                    <div>상세설명</div>
                    <Write value={productDes} onChange={onEditorChange} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="옵션명"
                        variant="outlined"
                        value={optionInput}
                        onChange={handleOptionChange}
                    />
                    <TextField
                        label="옵션값"
                        variant="outlined"
                        value={optionValueInput}
                        onChange={handleOptionValueChange}
                        onKeyUp={handleKeyUp}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {optionTags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={`${tag.optionValue} 수량: ${tag.optionQuantity}`}
                                onDelete={() => handleDeleteOptionTag(tag)}
                                variant="outlined"
                            />
                        ))}
                    </Box>
                    {optionInput.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{optionInput}</TableCell>
                                        <TableCell>수량</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {options.map((option) => (
                                        <TableRow key={option.name}>
                                            <TableCell>{option.name}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {optionTags.map((tag, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{tag.optionValue}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    size="small"
                                                    value={tag.optionQuantity}
                                                    onChange={(e) => handleOptionQuantityChange(index, e.target.value)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography sx={{ mt: 2 }}>
                            옵션이 없습니다. 옵션을 추가해주세요.
                        </Typography>
                    )}
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                        label="원가"
                        type="number"
                        value={price.cost}
                        onChange={handlePriceChange('cost')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">KRW</InputAdornment>,
                        }}
                        />
                        <TextField
                        label="판매가"
                        type="number"
                        value={price.sale}
                        onChange={handlePriceChange('sale')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">KRW</InputAdornment>,
                        }}
                        />
                    </Box>
                </Box>
                <Button
                    sx={{ float: 'right'}}
                    variant="outlined"
                    onClick={() => {
                        handleAddOption(); 
                        handleAddSubmit();
                    }}
                >
                    등록
                </Button>
            </Paper>
        </Box>
    </Box>
    );
}
                            
export default ProductAddPage;

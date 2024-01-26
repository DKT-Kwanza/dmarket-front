import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Box, Paper, TextField, Button, Chip, Table, TableBody, TableCell, TableContainer, 
        TableHead, TableRow, InputAdornment, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import Stack from '@mui/material/Stack';
import { indigo } from '@mui/material/colors';
import ImageIcon from '@mui/icons-material/Image';
import Write from "../../../components/admin/Common/Input/Write";

const primary = indigo[50];
const drawerWidth = 260;

const categories = ['여성 의류', '남성 의류', '유아 의류', '신발', '가방/잡화', '생필품', '주방용품', 
                    '메이크업', '바디/헤어', '가구', '침구', '인테리어', '문구/사무용품', '데스크탑/노트북', 
                    '모바일/태블릿', '영상가전', '음향가전', '주방가전', '생활가전', '휘트니스', '등산/수영', 
                    '구기', '골프', '캠핑', '자전거/기타레저'];
                    
function EditProduct() {
    const [productDes, setProductDes] = useState("");
    const [images, setImages] = useState(Array(5).fill(null));
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [productName, setProductName] = useState('');
    const [optionName, setOptionName] = useState('');
    const [options, setOptions] = useState([]);
    const [optionInput, setOptionInput] = useState('');
    const [optionValueInput, setOptionValueInput] = useState('');
    const [optionTags, setOptionTags] = useState([]);
    const [price, setPrice] = useState({ cost: '', sale: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/AdminEditProductData.json");
                
                setBrand(response.data.productBrand);
                setProductName(response.data.productName);
                setCategory(response.data.cateId);
                setPrice({ cost: response.data.productPrice, sale: response.data.productSalePrice });
                setProductDes(response.data.productDes);
                setOptionName(response.data.optionList[1].optionName);
                console.log(optionName)
                setOptions(response.data.optionList.map(o => ({
                    name: o.optionName,
                    values: [o.optionValue],
                    quantity: o.optionQuantity
                })));
                setImages(response.data.imgList);
                
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const handleImageChange = (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newImages = [...images];
                newImages[index] = reader.result;
                setImages(newImages);
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
        const content = value;
        setProductDes(content);
    }

    const handleOptionChange = (e) => {
        setOptionInput(e.target.value);
    };
    
    const handleOptionValueChange = (e) => {
        setOptionValueInput(e.target.value);
    };

    const handleAddOptionTag = () => {
    if (optionValueInput) {
        setOptionTags([...optionTags, optionValueInput]);
        setOptionValueInput('');
    }
    };

    const handleDeleteOptionTag = (tagToDelete) => {
        setOptionTags(optionTags.filter(tag => tag !== tagToDelete));
    };

    const handlePriceChange = (prop) => (event) => {
        setPrice({ ...price, [prop]: event.target.value });
    };

    /* 옵션 추가하기 */
    const handleAddOption = () => {
        if (optionInput && optionTags.length > 0) {
            const newOption = { name: optionInput, values: [...optionTags] };
            setOptions([...options, newOption]);
            setOptionInput('');
            setOptionTags([]);
        }
    };

    /* 옵션값 스페이스바로 분리 */
    const handleKeyUp = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            handleAddOptionTag();
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
                        <InputLabel id="category-select-label">{category}</InputLabel>
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
                        onKeyUp={(e) => { if (e.key === ' ') handleAddOptionTag(); }}
                    />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {optionTags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleDeleteOptionTag(tag)}
                            variant="outlined"
                        />
                        ))}
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{optionName}</TableCell>
                                    <TableCell>수량</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {options.map((option, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{option.values.join(', ')}</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                size="small"
                                                value={option.quantity}
                                                onChange={(e) => {
                                                    const updatedOptions = [...options];
                                                    updatedOptions[index].quantity = e.target.value;
                                                    setOptions(updatedOptions);
                                                }}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                        label="원가"
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
                    }}
                >
                    저장
                </Button>
            </Paper>
        </Box>
    </Box>
    );
}
                            
export default EditProduct;

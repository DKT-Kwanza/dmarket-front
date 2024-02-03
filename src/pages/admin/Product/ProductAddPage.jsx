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
    const [options, setOptions] = useState([]);
    const [optionInput, setOptionInput] = useState('');
    const [optionValueInput, setOptionValueInput] = useState('');
    const [optionTags, setOptionTags] = useState([]);
    const [price, setPrice] = useState({ cost: '', sale: '' });
    const [isOpen, setIsOpen] = useState(false);
    const [addSubmitted, setAddSubmitted] = useState(false);

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
        const content = value.replace(/<p>/gi, "").replace(/<\/p>/gi, "");
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
    const uuid = require('uuid');

    const handleAddSubmit = async(e) => {
        e.preventDefault(); 
    
        // 상품 등록 api 연동
        // 서버로 전송할 이미지 src 리스트
        const newImgList = [];
        console.log(images);
        console.log(objecImages);

        // Object Storage 저장
        for (let index = 0; index < objecImages.length; index++) {
            const file = objecImages[index];
            
            if (file) {
                const newProductImgSrc = `${bucketURL}${uuid.v4()}.${file.type.split('/')[1]}`;
                newImgList.push(newProductImgSrc);
                try {
                    const response = await axios.put(newProductImgSrc, 
                        file, {
                        headers: {
                            'X-Auth-Token': `${bucketToken}`,
                            'Content-Type': file.type
                        }
                    });
                } catch (error) {
                console.error('Error during request:', error);
                }
            }
        }

        // 서버로 이미지 새 상품 데이터 전송
        if(!token){
            console.log('Toekn is missing');
            return;
        }

        try{
            const response = await axios.post(`${adminApi}/product`, {
                brand: brand,
                productName: productName,
                categoryName: category,
                productPrice: price.cost,
                productDes: productDes,
                productSalePrice: price.sale,
                imgList: newImgList,
                optionList: options
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
        }catch(error){
            console.log("Error :" , error);
        }

        setAddSubmitted(true);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        navigate('/productMng');
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
                                {optionTags.map((tag) => (
                                <TableRow key={tag}>
                                    <TableCell>{tag}</TableCell>
                                    <TableCell>
                                    <TextField
                                        type="number"
                                        size="small"
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
                    onClick={handleAddSubmit}
                >
                    등록
                </Button>
            </Paper>
        </Box>
        {addSubmitted && isOpen && (
            <ConfirmModal color={'#3377FF'} isOpen={isOpen} onClose={handleCloseModal} onConfirm={handleCloseModal}>
                <div>상품 등록이 완료되었습니다.</div>
            </ConfirmModal>
        )}
    </Box>
    );
}
                            
export default ProductAddPage;

import * as React from "react";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import LeftNav from "../../../components/admin/Sidebar/LeftNav";
import Header from "../../../components/admin/Header/Header";
import { Box, Paper, TextField, Button, Chip, Table, TableBody, TableCell, TableContainer, 
        TableHead, TableRow, InputAdornment, FormControl, InputLabel, Select, MenuItem, } from "@mui/material";
import Stack from '@mui/material/Stack';
import { indigo } from '@mui/material/colors';
import ImageIcon from '@mui/icons-material/Image';
import Write from "../../../components/admin/Common/Input/Write";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import { adminApi, bucketToken, bucketURL } from "../../../Api";

const primary = indigo[50];
const drawerWidth = 260;

const categories = ['여성 의류', '남성 의류', '유아 의류', '신발', '가방/잡화', '생필품', '주방용품', 
                    '메이크업', '바디/헤어', '가구', '침구', '인테리어', '문구/사무용품', '데스크탑/노트북', 
                    '모바일/태블릿', '영상가전', '음향가전', '주방가전', '생활가전', '휘트니스', '등산/수영', 
                    '구기', '골프', '캠핑', '자전거/기타레저'];
                    
function ProductEditPage() {
    const navigate = useNavigate();
    const {v4} = require('uuid');
    const { productId } = useParams();
    const [productDes, setProductDes] = useState("");
    const [images, setImages] = useState(Array(5).fill(null));
    const [objecImages, setObjectImages] = useState(Array(5).fill(null));
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [productName, setProductName] = useState('');
    const [optionName, setOptionName] = useState('');
    const [options, setOptions] = useState([]);
    const [optionInput, setOptionInput] = useState('');
    const [optionValueInput, setOptionValueInput] = useState('');
    const [optionTags, setOptionTags] = useState([]);
    const [optionQuantities, setOptionQuantities] = useState({}); 
    const [price, setPrice] = useState({ cost: '', discount: '', sale: '' });
    const [product, setProduct] = useState({
        productDes: '',
        images: [],
        category: '',
        brand: '',
        productName: '',
        price: { cost: '', discount: '', sale: '' },
        options: [],
    });

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const url = `${adminApi}/products/${productId}`;
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data)
                const data = response.data.data;
                setProduct({
                    productDes: data.productDes,
                    images: data.imgList,
                    category: data.productCategory,
                    brand: data.productBrand,
                    productName: data.productName,
                    price: { cost: data.productPrice, discount: data.productDiscountRate, sale: data.productSalePrice },
                    options: data.optionList.map(o => ({
                        optionName: o.optionName,
                        optionValue: o.optionValue,
                        optionQuantity: o.optionQuantity,
                    })),
                });
                setBrand(response.data.data.productBrand);
                setProductName(response.data.data.productName);
                setCategory(response.data.data.productCategory);
                setPrice({ cost: response.data.data.productPrice, discount:response.data.data.productDiscountRate, sale: response.data.data.productSalePrice });
                setProductDes(response.data.data.productDes);
                setOptionName(response.data.data.optionList[0].optionName);
                setOptions(response.data.data.optionList.map(o => ({
                    name: o.optionName,
                    values: [o.optionValue],
                    quantity: o.optionQuantity
                })));
                setImages(response.data.data.imgList);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, [productId, token]);

    useEffect(()=>{
        if(price.cost && price.discount){
            setPrice({...price, sale: Number(price.cost) * (1 - Number(price.discount) * 0.01)});
        }
    }, [price.cost, price.discount])

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

    /* 옵션값 스페이스바, 엔터로 분리 */
    const handleKeyUp = (event) => {
        if (event.key === ' ' || event.key === 'Enter') {
            handleAddOptionTag();
        }
    };
    
    const handleEditSubmit = async(e) => {
    
        // Object Storage 저장
        const newImgList = images.length > 0 ? [...images] : product.images; 
        for (let index = 0; index < objecImages.length; index++) {
            const file = objecImages[index];
            if (file) {
                const newProductImgSrc = `${bucketURL}${v4()}.${file.type.split('/')[1]}`;
                newImgList[index] = newProductImgSrc;
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
            const newOptions = optionTags.map(tag => ({
                optionName: optionName,
                optionValue: tag.optionValue,
                optionQuantity: tag.optionQuantity
            }));
    
            const updatedOptions = options.map(option => ({
                optionName: option.name,
                optionValue: option.values[0],
                optionQuantity: option.quantity
            })).concat(newOptions);

            const updatedProductData = {
                productBrand: brand || product.brand,
                productName: productName || product.productName,
                categoryName: category || product.category,
                productPrice: price.cost || product.price.cost,
                productSalePrice: price.sale || product.price.sale,
                productDes: productDes || product.productDes,
                optionList: updatedOptions,
                imgList: newImgList
            };

            await axios.put(`${adminApi}/products/${productId}`, updatedProductData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            alert(`상품이 수정되었습니다.`);
            navigate('/productMng');
        } catch (error) {
            console.error("상품 등록 에러:", error);
            alert("상품 등록 중 오류가 발생했습니다.");
        }
    };
    
    return (
        <Box>
            <LeftNav />
            <Header title={'상품편집'} />
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
                                    <TableRow key={`existing-option-${index}`}>
                                        <TableCell>{option.name}</TableCell>
                                        <TableCell>{option.values}</TableCell>
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
                            <TableBody>
                                {optionTags.map((tag, index) => (
                                    <TableRow key={`new-option-${index}`}>
                                        <TableCell>{optionName}</TableCell>
                                        <TableCell>{tag.optionValue}</TableCell>
                                        <TableCell>
                                            <TextField
                                                type="number"
                                                size="small"
                                                value={tag.optionQuantity}
                                                onChange={(e) => {
                                                    const updatedOptionTags = [...optionTags];
                                                    updatedOptionTags[index].optionQuantity = e.target.value;
                                                    setOptionTags(updatedOptionTags);
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
                        label="할인율"
                        type="number"
                        value={price.discount}
                        onChange={handlePriceChange('discount')}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        }}
                        />
                        <TextField
                        label="판매가"
                        type="number"
                        value={price.sale}
                        InputProps={{
                            readOnly: true,
                            endAdornment: <InputAdornment position="end">KRW</InputAdornment>
                        }}
                        />
                    </Box>
                </Box>
                <Button
                    sx={{ float: 'right'}}
                    variant="outlined"
                    onClick={handleEditSubmit}
                >
                    저장
                </Button>
            </Paper>
        </Box>
    </Box>
    );
}
                            
export default ProductEditPage;

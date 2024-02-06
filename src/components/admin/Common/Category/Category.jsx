import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {productsApi} from "../../../../Api";

export default function Category({ onCategoryClick }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${productsApi}/categories`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data.code === 200) {
                    const levelTwoCategories = response.data.data.reduce((acc, curr) => [...acc, ...curr.child], []);
                    setCategories(levelTwoCategories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategoryId(categoryId);
        onCategoryClick(categoryId);
    };

    useEffect(() => {
        onCategoryClick(selectedCategoryId);
    }, [selectedCategoryId, onCategoryClick]);

    return (
        <FormControl sx={{paddingBottom: '12px'}}>
            <FormLabel id="demo-row-radio-buttons-group-label">카테고리를 선택하세요.</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
            >
                {categories.map((category, index) => (
                    <FormControlLabel
                        key={index}
                        value={category.categoryName}
                        control={<Radio size="small" />}
                        label={category.categoryName}
                        onClick={() => onCategoryClick(category.categoryId)}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProductPage.css'
import ProductItem from '../../../components/user/Item/ProductItem';
import Filter from '../../../components/user/Common/Filter/Filter';
import Dropdown from '../../../components/user/Common/Select/Dropdown';
import ScrollToTopBtn from "../../../components/user/Common/Button/ScrollToTopBtn";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Pagination } from "@mui/material";
import { FaAngleRight } from "react-icons/fa6";

function ProductPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();
    const [category1depthName, setCategory1depthName] = useState("");
    const [category2depthName, setCategory2depthName] = useState("");
    const [sorter, setSorter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [star, setStar] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://172.16.210.136:8080/api/products/categories/${categoryId}?sorter=${sorter}&min-price=${minPrice}&max-price=${maxPrice}&star=${star}&page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [categoryId, sorter, minPrice, maxPrice, star, currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        navigate(`?page=${value}`);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category1Name = queryParams.get('category1depthName');
        const category2Name = queryParams.get('category2depthName');
    
        if (category1Name) {
            setCategory1depthName(decodeURIComponent(category1Name));
        }
    
        if (category2Name) {
            setCategory2depthName(decodeURIComponent(category2Name));
        }
    }, [location]);

    return (
        <div className="productList-body">
            <div className='productList-category'>{category1depthName} <FaAngleRight /> {category2depthName}</div>
            <div className='productList-title'>{category2depthName}</div>
            <div className='productList-title-bar'></div>
            <Filter setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setStar={setStar} />
            <div className='productList-bar'></div>
            <Dropdown setSorter={setSorter} />
            <div className='productList-bar'></div>
            <div className='productList-container'>
                {products.map((item, index) => (
                    <ProductItem 
                        key={index}
                        imgSrc={item.productImg}
                        brand={item.productBrand}
                        productName={item.productName}
                        sales={item.productSalePrice}
                        ratingAvg={item.productRating}
                        reviewCnt={item.productReviewCount}
                    />
                ))}
            </div>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            <ScrollToTopBtn />
        </div>
    )
}

export default ProductPage;

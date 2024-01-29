import React, { useState, useEffect } from "react";
import axios from "axios";
import './ProductPage.css'
import ProductItem from '../../../components/user/Item/ProductItem';
import Filter from '../../../components/user/Common/Filter/Filter';
import Dropdown from '../../../components/user/Common/Select/Dropdown';
import ScrollToTopBtn from "../../../components/user/Common/Button/ScrollToTopBtn";
import { useLocation, useParams } from 'react-router-dom';

function ProductPage(){
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const { categoryId } = useParams();
    const [category1depthName, setCategory1depthName] = useState("");
    const [category2depthName, setCategory2depthName] = useState("");
    const [sorter, setSorter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [star, setStar] = useState('');

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://172.16.210.136:8080/api/products/categories/${categoryId}?sorter=${sorter}&min-price=${minPrice}&max-price=${maxPrice}&star=${star}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.data.productList);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    
        const queryParams = new URLSearchParams(location.search);
        const category1depthName = queryParams.get('category1depthName');
        const category2depthName = queryParams.get('category2depthName');
    
        if (category1depthName) {
            setCategory1depthName(decodeURIComponent(category1depthName));
        }
        if (category2depthName) {
            setCategory2depthName(decodeURIComponent(category2depthName));
        }
    }, [categoryId, sorter, minPrice, maxPrice, star]);
    

    return (
        <div className="productList-body">
            <div className='productList-category'>{category1depthName} &#47; {category2depthName}</div>
            <div className='productList-title'>{category2depthName}</div>
            <div className='productList-title-bar'></div>
            {/* //NOTE filter 컴포넌트로 분리했는데 별로면 주석 해제하세요 */}
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
            <ScrollToTopBtn />
        </div>
    )
}

export default ProductPage;

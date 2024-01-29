import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import './SearchPage.css';
import ProductItem from '../../../components/user/Item/ProductItem';
import Filter from '../../../components/user/Common/Filter/Filter';
import Dropdown from '../../../components/user/Common/Select/Dropdown';
import ScrollToTopBtn from "../../../components/user/Common/Button/ScrollToTopBtn";

function SearchList() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [sorter, setSorter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [star, setStar] = useState('');
    const query = new URLSearchParams(location.search).get('q');
    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const url = `http://172.16.210.136:8080/api/products/search?q=${query}&sorter=${sorter}&min-price=${minPrice}&max-price=${maxPrice}&star=${star}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.data.productList);
            } catch (e) {
                console.error("Error fetching filtered products: ", e);
            }
        };
        fetchData();
    }, [query, sorter, minPrice, maxPrice, star]);

    return (
        <div className="searchList-body">
            <div className='searchList-title'>{`'${query}'에 대한 검색 결과입니다.`}</div>
            <div className='searchList-title-bar'></div>
            <Filter setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setStar={setStar} />
            <div className='searchList-bar'></div>
            <Dropdown setSorter={setSorter} />
            <div className='searchList-bar'></div>
            <div className='searchList-container'>
                {products.map((item) => (
                    <ProductItem 
                        key={item.productId}
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

export default SearchList;

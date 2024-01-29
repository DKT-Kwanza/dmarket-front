import React, {useState, useEffect} from "react";
import {useLocation} from 'react-router-dom';
import axios from "axios";
import './SearchPage.css';
import ProductItem from '../../../components/user/Item/ProductItem';
import Filter from '../../../components/user/Common/Filter/Filter';
import Dropdown from '../../../components/user/Common/Select/Dropdown';
import ScrollToTopBtn from "../../../components/user/Common/Button/ScrollToTopBtn";

function SearchList(){
    const [products, setProducts] = useState([]);
    const location = useLocation();

    const token = sessionStorage.getItem('token');
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://172.16.210.136:8080/api/products/search?q=${query}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setProducts(response.data.data.productList);
            } catch (e) {
                console.error("Error fetching search results: ", e);
            }
        };
        fetchData();
    }, [location.search]);

    return (
        <div className="searchList-body">
            <div className='searchList-title'>{`'${query}'에 대한 검색 결과입니다.`}</div>
            <div className='searchList-title-bar'></div>
            <Filter/>
            <div className='searchList-bar'></div>
            <Dropdown />
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

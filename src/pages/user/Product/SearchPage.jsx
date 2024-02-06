import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";
import './SearchPage.css';
import ProductItem from '../../../components/user/Item/ProductItem';
import Filter from '../../../components/user/Common/Filter/Filter';
import Dropdown from '../../../components/user/Common/Select/Dropdown';
import ScrollToTopBtn from "../../../components/user/Common/Button/ScrollToTopBtn";
import { Pagination } from "@mui/material";
import { removeCommas } from "../../../utils/Format";
import {productsApi} from "../../../Api";

function SearchPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const [sorter, setSorter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [star, setStar] = useState('');
    const query = new URLSearchParams(location.search).get('q');
    const token = sessionStorage.getItem('token');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            const formattedMinPrice = removeCommas(minPrice);
            const formattedMaxPrice = removeCommas(maxPrice);
           
            const url = `${productsApi}/search?q=${query}&sorter=${sorter}&min-price=${formattedMinPrice}&max-price=${formattedMaxPrice}&star=${star}&page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProducts(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
                console.log(response.data)
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, [query, sorter, minPrice, maxPrice, star, currentPage]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');
        const currentPage = page ? parseInt(page, 10) : 1;
        setCurrentPage(currentPage);
    
    }, [location.search]);
    

    const handlePageChange = (event, value) => {
        navigate(`?q=${query}&page=${value}`);
    };
    

    return (
        <div className="searchList-body">
            <div className="searchList-filter">
                <div className='searchList-title'>{`'${query}'에 대한 검색 결과입니다.`}</div>
                <div className='searchList-title-bar'></div>
                <Filter setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setStar={setStar} setSorter={setSorter} />
                <div className='searchList-bar'></div>
            </div>
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
                        discountRate={item.productDiscountRate}
                    />
                ))}
            </div>
            <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            <ScrollToTopBtn />
        </div>
    )
}

export default SearchPage;

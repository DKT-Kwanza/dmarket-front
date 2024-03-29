import './ProductPage.css'
import React, {useState, useEffect} from "react";
import ProductItem from '@components/user/Item/ProductItem';
import Filter from '@components/user/Common/Filter/Filter';
import ScrollToTopBtn from "@components/user/Common/Button/ScrollToTopBtn";
import {useLocation, useParams, useNavigate} from 'react-router-dom';
import {Pagination} from "@mui/material";
import {FaAngleRight} from "react-icons/fa6";
import {removeCommas} from "@utils/Format";
import axios from "axios";
import {productsApi} from "@api/Api";

function ProductPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const {categoryId} = useParams();
    const [category1depthName, setCategory1depthName] = useState("");
    const [category2depthName, setCategory2depthName] = useState("");
    const [sorter, setSorter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [star, setStar] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isEmpty, setIsEmpty] = useState(false);

    const token = sessionStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            const formattedMinPrice = removeCommas(minPrice);
            const formattedMaxPrice = removeCommas(maxPrice);

            const url = `${productsApi}/categories/${categoryId}?sorter=${sorter}&min-price=${formattedMinPrice}&max-price=${formattedMaxPrice}&star=${star}&page=${currentPage}`;
            try {
                const response = await axios.get(url, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
                /* 검색 결과가 없을 때 */
                if (response.data.data.content.length <= 0) {
                    setIsEmpty(true);
                } else {
                    setIsEmpty(false);
                    setProducts(response.data.data.content);
                    setTotalPages(response.data.data.totalPages);
                }
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

    const navigateToProductDetail = ({productId}) => {
        navigate(`/product/detail/${productId}`);
    }

    return (
        <div className="productList-body">
            <div className="productList-filter">
                <div className='productList-category'>{category1depthName} <FaAngleRight color='#878d91' style={{marginTop: '2px'}} /> {category2depthName}</div>
                <div className='productList-title'>{category2depthName}</div>
                <div className='productList-title-bar'></div>
                <Filter setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setStar={setStar} setSorter={setSorter}/>
                <div className='productList-bar'></div>
            </div>
            {
                isEmpty
                    ? <div className='productList-empty'>해당하는 상품이 없습니다.</div>
                    : <>
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
                                    discountRate={item.productDiscountRate}
                                    onClick={() => {
                                        navigateToProductDetail({productId: item.productId})
                                    }}/>
                            ))}
                        </div>
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange}/>
                    </>

            }
            <ScrollToTopBtn/>
        </div>
    )
}

export default ProductPage;

import React, {useState, useEffect} from "react";
import axios from "axios";
import './ProductList.css'
import ProductItem from '../../../components/user/ProductList/ProductItem';
import Filter from '../../../components/user/ProductList/Filter';
import Dropdown from '../../../components/user/ProductList/Dropdown';

function ProductList(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/ProductListData.json");
                setProducts(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="productList-body">
            <div className='productList-category'>홈데코 / 문구 / 가구</div>
            <div className='productList-title'>가구</div>
            <div className='productList-title-bar'></div>
            {/* //NOTE filter 컴포넌트로 분리했는데 별로면 주석 해제하세요 */}
            <Filter/>
            <div className='productList-bar'></div>
            <Dropdown />
            <div className='productList-bar'></div>
            <div className='productList-container'>
                {products.map((item, index) => (
                    <ProductItem 
                        key={index}
                        imgSrc={item.imgSrc}
                        brand={item.brand}
                        productName={item.name}
                        sales={item.price}
                        ratingAvg={item.rating}
                        reviewCnt={item.reviews}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductList;

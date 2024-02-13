import styled from "styled-components";
import ProductItem from "@components/user/Item/ProductItem";
import React from "react";
import {useNavigate} from "react-router-dom";

function RecommendProductList({recommendProducts}) {

    const navigate = useNavigate();
    const navigateToProductDetail = (productId) => {
        navigate(`/product/detail/${productId}`);
    }

    return (
        <Area>
            {
                recommendProducts.map((value, index) => (
                    <ProductItem key={index}
                                     onClick={() => navigateToProductDetail(value.productId)}
                                     brand={value.productBrand}
                                     productName={value.productName}
                                     productImg={value.productImg}
                                     sales={value.productSalePrice}
                                     ratingAvg={value.productRatingAvg}
                                     reviewCnt={value.productReviewCount}/>
                ))
            }
        </Area>
    );
}

const Area = styled.div`
  display: flex;
  margin-top: 22px;
`;

export default RecommendProductList;
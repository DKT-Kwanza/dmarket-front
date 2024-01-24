import styled from "styled-components";
import ProductListItem from "../../../pages/user/ProductList/ProductListItem";
import React from "react";
import {useNavigate} from "react-router-dom";

function RecommendProductList({recommendProducts}) {

    const navigate = useNavigate();
    const navigateToProductDetail = (productId) => {
        navigate(`../main/detail/${productId}`);
    }

    return (
        <Area>
            {
                recommendProducts.map((value, index) => (
                    <ProductListItem key={index}
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
import styled from "styled-components";
import ProductListItem from "../../pages/ProductList/ProductListItem";
import React from "react";
import {useNavigate} from "react-router-dom";

function RecommendProductList({data}) {

    const navigate = useNavigate();
    const navigateToProductDetail = (productId) => {
        navigate(`../main/detail/${productId}`);
    }

    return (
        <Area>
            {
                data.map((value, index) => (
                    <ProductListItem key={index} onClick={() => navigateToProductDetail(value.productId)}
                                     brand={value.brand} productName={value.productName} sales={value.sales}
                                     ratingAvg={value.ratingAvg} reviewCnt={value.reviewCnt}/>
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
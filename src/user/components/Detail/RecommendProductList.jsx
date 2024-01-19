import styled from "styled-components";
import ProductListItem from "../../pages/ProductList/ProductListItem";
import React from "react";

function RecommendProductList() {
    return (
        <Area>
            <ProductListItem/>
            <ProductListItem/>
            <ProductListItem/>
            <ProductListItem/>
        </Area>
    );
}

const Area = styled.div`
  display: flex;
  margin-top: 22px;
`;

export default RecommendProductList;
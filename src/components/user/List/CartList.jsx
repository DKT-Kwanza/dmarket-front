import React from 'react';
import {useNavigate} from "react-router-dom";
import CartItem from '../Item/CartItem'

const CartList = ({ items, checkedItems, onItemCheck }) => {
    const navigate = useNavigate();
    const navigateToDetailPage = (productId) => {
        navigate(`/product/detail/${productId}`);
    }

    return (
        <div>
            {console.log(items)}
          {items.map((item, index) => (
            <CartItem
              key={index}
              productImg={item.productImg}
              brand={item.productBrand}
              productName={item.productName}
              option={item.productOption}
              quantity={item.productCount}
              price={item.productTotalSalePrice}
              checked={checkedItems[index]}
              onCheck={() => onItemCheck(index)}
              onClick={() => navigateToDetailPage(item.productId)}
            />
          ))}
        </div>
    );
};

export default CartList;
import React from 'react';
import CartItem from '../Item/CartItem'

const CartList = ({ items, checkedItems, onItemCheck }) => {
    return (
        <div>
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
            />
          ))}
        </div>
    );
};

export default CartList;
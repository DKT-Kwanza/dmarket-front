import React from 'react';
import CartItem from './CartItem'

const CartList = ({ items, checkedItems, onItemCheck }) => {
    return (
        <div>
          {items.map((item, index) => (
            <CartItem
              key={index}
              productImg={item.productImg}
              brand={item.brand}
              productName={item.productName}
              option={item.option}
              quantity={item.quantity}
              price={item.price}
              checked={checkedItems[index]}
              onCheck={() => onItemCheck(index)}
            />
          ))}
        </div>
    );
};

export default CartList;
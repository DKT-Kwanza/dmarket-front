import React from 'react';
import CartItem from './CartItem'

const CartList = ({ items, checkedItems, onItemCheck }) => {
    return (
        <div>
          {items.map((item, index) => (
            <CartItem
              key={index}
              imgSrc={item.imgSrc}
              brand={item.brand}
              name={item.name}
              option={item.option}
              count={item.count}
              price={item.price}
              checked={checkedItems[index]}
              onCheck={() => onItemCheck(index)}
            />
          ))}
        </div>
    );
};

export default CartList;
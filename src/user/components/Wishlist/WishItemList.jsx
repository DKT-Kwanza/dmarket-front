import React from 'react';
import WishItem from './WishItem'

const WishItemList = ({ items, checkedItems, onItemCheck }) => {
    return (
        <div>
          {items.map((item, index) => (
            <WishItem
              key={index}
              imgSrc={item.imgSrc}
              brand={item.brand}
              name={item.name}
              price={item.price}
              checked={checkedItems[index]}
              onCheck={() => onItemCheck(index)}
            />
          ))}
        </div>
    );
};

export default WishItemList;
import React from 'react';
import WishItem from '../Item/WishItem'

const WishItemList = ({ items, checkedItems, onItemCheck }) => {
    return (
        <div>
          {items.map((item, index) => (
            <WishItem
              key={index}
              productImg={item.productImg}
              brand={item.brand}
              productName={item.productName}
              sales={item.sales}
              checked={checkedItems[index]}
              onCheck={() => onItemCheck(index)}
            />
          ))}
        </div>
    );
};

export default WishItemList;
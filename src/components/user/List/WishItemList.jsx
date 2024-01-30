import React from 'react';
import WishItem from '../Item/WishItem'

const WishItemList = ({ items, checkedItems, onItemCheck }) => {
    return (
        <div>
          {items && items.map((item, index) => (
            <WishItem
              key={index}
              productImg={item.productImg}
              brand={item.productBrand}
              productName={item.productName}
              sales={item.productSalePrice}
              checked={checkedItems[index]}
              onCheck={() => onItemCheck(index)}
            />
          ))}
        </div>
    );
};

export default WishItemList;
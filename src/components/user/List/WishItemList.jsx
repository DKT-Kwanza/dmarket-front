import {useNavigate} from "react-router-dom";
import WishItem from '../Item/WishItem'

const WishItemList = ({ items, checkedItems, onItemCheck }) => {
    const navigate = useNavigate();
    const navigateToDetailPage = (productId) => {
        navigate(`/product/detail/${productId}`);
    }

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
              onClick={() => navigateToDetailPage(item.productId)}
            />
          ))}
        </div>
    );
};

export default WishItemList;
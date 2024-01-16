import './WishList.css';
import WishItem from './WishItem';
import CheckBox from '../../components/CheckBox';

function WishList(){

    return(
        <div className='wishList-body'>
            <div className='wishList-title'>
                <div className='wishList-title-content'>위시리스트</div>
            </div>
            <div className='wishList-container'>
                <CheckBox/>
                <div className='wishList-count'>전체 상품 : <span>2</span>개</div>
                <button className='wishList-delete-button'>삭제</button>
            </div>
            <div className='wishList-bar'></div>
            <div className='wishList-item-list'>
                <WishItem/>
                <WishItem/>
            </div>    
        </div>
    )
}

export default WishList;
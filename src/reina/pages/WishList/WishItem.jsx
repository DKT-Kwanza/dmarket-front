import './WishItem.css';
import CheckBox from '../../components/CheckBox';

function WishItem(){

    return(
        <div className='wishItem-container'>
            <CheckBox />
            <div className='wishItem-item'>
                <div className='wishItem-img'>
                    이미지
                </div>
                <div>
                    <div className='wishItem-brand'>브랜드</div>
                    <div className='wishItem-name'>상품명</div>
                </div>
            </div>
            <div className='wishItem-bar'></div>
            <div className='wishItem-price'>88,536원</div>
        </div>
    )
}

export default WishItem;
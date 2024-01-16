import './ProductList.css'
// import { PiStarFill, PiStarLight } from "react-icons/pi";
import ProductListItem from './ProductListItem';
import Filter from './Filter';

function ProductList(){
    return (
        <div className="productList-body">
            <div className='productList-category'>홈데코 / 문구 / 가구</div>
            <div className='productList-title'>가구</div>
            <div className='productList-title-bar'></div>
            {/* //NOTE filter 컴포넌트로 분리했는데 별로면 주석 해제하세요 */}
            <Filter/>
            {/* <div className='productList-filter-container'>
                <div className='productList-price-container'>
                    <div className='productList-label'>가격</div>
                    <input className='productList-filter-price' placeholder='0₩'/>
                    <div className='productList-font'>~</div>
                    <input className='productList-filter-price' placeholder='0₩'/>
                </div>
                <div className='productList-rating-container'>
                    <div className='productList-label'>별점</div>
                    <div>
                        <input type="radio" name="rating" id="star4" className="productList-radio-btn" value="4"/>
                        <label for="star4" className="productList-radio-label">
                            <div className='productList-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                            </div>
                            <span> 4점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star3" className="productList-radio-btn" value="3"/>
                        <label for="star3" className="productList-radio-label">
                            <div className='productList-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 3점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star2" className="productList-radio-btn" value="2"/>
                        <label for="star2" className="productList-radio-label">
                            <div className='productList-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 2점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star1" className="productList-radio-btn" value="1"/>
                        <label for="star1" className="productList-radio-label">
                            <div className='productList-star'>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 1점 이상</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='productList-btn-container'>
                <button className='productList-search-btn'>검색</button>
                <button className='productList-clear-btn'>전체해제</button>
            </div> */}
            <div className='productList-bar'></div>
            <div className='productList-dropdown-container'>
                <select className='productList-dropdown'>
                    <option>최신순</option>
                    <option>판매순</option>
                    <option>별점순</option>
                    <option>리뷰개수순</option>
                </select>
            </div>
            <div className='productList-bar'></div>
            <div className='productList-container'>
                <ProductListItem/>
                <ProductListItem/>
                <ProductListItem/>
                <ProductListItem/>
                <ProductListItem/>
                <ProductListItem/>
                <ProductListItem/>
                <ProductListItem/>
            </div>
        </div>
    )
}

export default ProductList;
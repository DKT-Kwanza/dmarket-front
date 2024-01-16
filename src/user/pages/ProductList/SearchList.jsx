import './SearchList.css';
// import { PiStarFill, PiStarLight } from "react-icons/pi";
import ProductListItem from './ProductListItem';
import Filter from './Filter';

function SearchList(){

    return (
        <div className="searchList-body">
            <div className='searchList-title'>'<span>후드티</span>'에 대한 검색 결과입니다.</div>
            <div className='searchList-title-bar'></div>
            <Filter/>
            {/* <div className='searchList-filter-container'>
                <div className='searchList-price-container'>
                    <div className='searchList-label'>가격</div>
                    <input className='searchList-filter-price' placeholder='0₩'/>
                    <div className='searchList-font'>~</div>
                    <input className='searchList-filter-price' placeholder='0₩'/>
                </div>
                <div className='searchList-rating-container'>
                    <div className='searchList-label'>별점</div>
                    <div>
                        <input type="radio" name="rating" id="star4" className="searchList-radio-btn" value="4"/>
                        <label for="star4" className="searchList-radio-label">
                            <div className='searchList-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                            </div>
                            <span> 4점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star3" className="searchList-radio-btn" value="3"/>
                        <label for="star3" className="searchList-radio-label">
                            <div className='searchList-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 3점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star2" className="searchList-radio-btn" value="2"/>
                        <label for="star2" className="searchList-radio-label">
                            <div className='searchList-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 2점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star1" className="searchList-radio-btn" value="1"/>
                        <label for="star1" className="searchList-radio-label">
                            <div className='searchList-star'>
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
            <div className='searchList-btn-container'>
                <button className='searchList-search-btn'>검색</button>
                <button className='searchList-clear-btn'>전체해제</button>
            </div> */}
            <div className='searchList-bar'></div>
            <div className='searchList-dropdown-container'>
                <select className='searchList-dropdown'>
                    <option>최신순</option>
                    <option>판매순</option>
                    <option>별점순</option>
                    <option>리뷰개수순</option>
                </select>
            </div>
            <div className='searchList-bar'></div>
            <div className='searchList-container'>
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

export default SearchList;
import './Filter.css';
import { PiStarFill, PiStarLight } from "react-icons/pi";

function Filter(){
    return (
        <div>
            <div className='filter-container'>
                <div className='filter-price-container'>
                    <div className='filter-label'>가격</div>
                    <input className='filter-price' placeholder='0₩'/>
                    <div className='filter-font'>~</div>
                    <input className='filter-price' placeholder='0₩'/>
                </div>
                <div className='filter-rating-container'>
                    <div className='filter-label'>별점</div>
                    <div>
                        <input type="radio" name="rating" id="star4" className="filter-radio-btn" value="4"/>
                        <label for="star4" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                            </div>
                            <span> 4점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star3" className="filter-radio-btn" value="3"/>
                        <label for="star3" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 3점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star2" className="filter-radio-btn" value="2"/>
                        <label for="star2" className="filter-radio-label">
                            <div className='filter-star'>
                                <PiStarFill/>
                                <PiStarFill/>
                                <PiStarLight/>
                                <PiStarLight/>
                                <PiStarLight/>
                            </div>
                            <span> 2점 이상</span>
                        </label>
                        <input type="radio" name="rating" id="star1" className="filter-radio-btn" value="1"/>
                        <label for="star1" className="filter-radio-label">
                            <div className='filter-star'>
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
            <div className='filter-btn-container'>
                <button className='filter-search-btn'>검색</button>
                <button className='filter-clear-btn'>전체해제</button>
            </div>
        </div>
    )
}

export default Filter;
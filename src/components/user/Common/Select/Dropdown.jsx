import './Dropdown.css';

function Dropdown({ setSorter }){
    return (
        <div className='productList-dropdown-container'>
            <select className='productList-dropdown' onChange={(e) => setSorter(e.target.value)}>
                <option value="review_count">리뷰개수순</option>
                <option value="product_created_date">최신순</option>
                <option value="prdouct_rating">별점순</option>
            </select>
        </div>
    );
}

export default Dropdown;
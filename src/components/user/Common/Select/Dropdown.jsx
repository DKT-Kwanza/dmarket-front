import './Dropdown.css';

function Dropdown({ setSorter }){
    return (
        <div className='productList-dropdown-container'>
            <select className='productList-dropdown' onChange={(e) => setSorter(e.target.value)}>
                <option value="saleCount">판매순</option>
                <option value="productId">최신순</option>
                <option value="productRating">별점순</option>
                <option value="reviewCount">리뷰개수순</option>
            </select>
        </div>
    );
}

export default Dropdown;
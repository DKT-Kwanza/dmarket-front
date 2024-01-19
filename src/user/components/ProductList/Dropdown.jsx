import './Dropdown.css';

function Dropdown(){
    return (
        <div className='productList-dropdown-container'>
            <select className='productList-dropdown'>
                <option>최신순</option>
                <option>판매순</option>
                <option>별점순</option>
                <option>리뷰개수순</option>
            </select>
        </div>
    );
}

export default Dropdown;
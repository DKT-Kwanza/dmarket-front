import './SubCategory.css'
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

const SubCategory = ({onMouseLeave}) =>{
    const navigate = useNavigate();
    const [isHoverd, setIsHovered] = useState(true);

    const navigateToCategory = () => {
        navigate(`./category`);
    }

    return(
    <div className='sub-sub-category-container' onMouseLeave={onMouseLeave}>
        <div className='sub-sub-category-contents'>
            <div className='sub-sub-category-contents-details'>
                <div className='sub-sub-category-contents-details-style'>
                    <button onClick={navigateToCategory}>여성 의류</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>남성 의류</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>유아 의류</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>신발</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>가방/잡화</button>
                </div>
            </div>
            <div className='sub-sub-category-contents-details'>
                <div className='sub-sub-category-contents-details-style'>
                    <button>생필품</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>주방용품</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>메이크업</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>바디&#47;헤어</button>
                </div>
            </div>
            <div className='sub-sub-category-contents-details'>
                <div className='sub-sub-category-contents-details-style'>
                    <button>가구</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>침구</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>인테리어</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>문구&#47;사무용품</button>
                </div>
            </div>
            <div className='sub-sub-category-contents-details'>
                <div className='sub-sub-category-contents-details-style'>
                    <button>데스크탑&#47;노트북</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>모바일&#47;태블릿</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>영상가전</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>음향가전</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>주방가전</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>생활가전</button>
                </div>
            </div>
            <div className='sub-sub-category-contents-details'>
                <div className='sub-sub-category-contents-details-style'>
                    <button>휘트니스</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>등산&#47;수영</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>구기</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>골프</button>
                </div>
                <div className='sub-sub-category-contents-details-style'>
                    <button>캠핑</button>
                </div>
                <div>
                    <button>자전거&#47;기타레저</button>
                </div>
            </div>
        </div>
    </div>

    )
}
export default SubCategory;
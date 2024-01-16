import { useNavigate } from 'react-router-dom';
import './MyPageSubHeader.css'
import right from '../../../assets/icons/chevron-right.svg'

const MyPageSubHeader = () => {

    const navigate = useNavigate();
    const temp = () => {
        navigate('/');
    }

    return (
        <div className='myPage-subHeader'>
            <div className='myPage-subHeader-wrapper'>
                <div className='myPage-subHeader-wrapper-userInfo'>
                    <div className='myPage-subHeader-wrapper-userInfo-name'>안현영님</div>
                    <div className='myPage-subHeader-wrapper-userInfo-date'>입사일: 2024.01.04</div>
                </div>
                <div className='myPage-subHeader-wrapper-mileage'>
                    <div className='myPage-subHeader-wrapper-mileage-title'>마일리지</div>
                    <div className='myPage-subHeader-wrapper-mileage-content'>0원</div>
                </div>
                <div className='myPage-subHeader-box'>
                    <button className='myPage-subHeader-button' onClick={temp}>
                        <span>충전하기</span>
                        <span className='myPage-subHeader-button-right'><img src={right} alt='>'/></span>
                    </button>
                    <button className='myPage-subHeader-button' onClick={temp}>
                        <span>사용내역 조회</span>
                        <span className='myPage-subHeader-button-right'><img src={right} alt='>'/></span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyPageSubHeader;

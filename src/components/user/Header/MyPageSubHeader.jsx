import React, {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { formatDate, formatPrice } from '../../../utils/Format'
import './MyPageSubHeader.css'
import right from '../../../assets/icons/chevron-right.svg'
import { userApi } from '../../../Api';

const MyPageSubHeader = () => {

    const navigate = useNavigate();

    const [info, setInfo] = useState([]);

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${userApi}/${userId}/mypage/mileage`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setInfo(response.data.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    const navigateToPage = (path) => {
        navigate(`/mydkt/${path}`);
    }

    return (
        <div className='myPage-subHeader'>
            <div className='myPage-subHeader-wrapper'>
                <div className='myPage-subHeader-wrapper-userInfo'>
                    <div className='myPage-subHeader-wrapper-userInfo-name'>{info.userName} 님</div>
                    <div className='myPage-subHeader-wrapper-userInfo-date'>입사일: {formatDate(info.userJoinDate)}</div>
                </div>
                <div className='myPage-subHeader-wrapper-mileage'>
                    <div className='myPage-subHeader-wrapper-mileage-title'>마일리지</div>
                    <div className='myPage-subHeader-wrapper-mileage-content'>{formatPrice(info.userMileage)}원</div>
                </div>
                <div className='myPage-subHeader-box'>
                    <button className='myPage-subHeader-button' onClick={() => navigateToPage('charge')}>
                        <span>충전하기</span>
                        <span className='myPage-subHeader-button-right'><img src={right} alt='>'/></span>
                    </button>
                    <button className='myPage-subHeader-button' onClick={() => navigateToPage('mileageInfo')}>
                        <span>사용내역 조회</span>
                        <span className='myPage-subHeader-button-right'><img src={right} alt='>'/></span>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MyPageSubHeader;

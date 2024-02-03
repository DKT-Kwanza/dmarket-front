import './HistoryMileage.css'
import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {Pagination} from "@mui/material";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import MileageHistoryItem from "../../../components/user/Item/MileageHistoryItem";
import {formatDate} from "../../../utils/Format";
import {userApi} from "../../../Api";

function HistoryMileage() {
    const navigate = useNavigate();
    const [historyMileages, setHistoryMileages] = useState([]);

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 마일리지 내역 페이지네이션 */
    const [mileageCurrentPage, setMileageCurrentPage] = useState(1);
    const [mileageTotalPages, setMileageTotalPages] = useState(0);
    const handleMileagePageChange = (event, value) => {
        setMileageCurrentPage(value);
        navigate(`?page=${value}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${userApi}/${userId}/mypage/mileage-usage?page=${mileageCurrentPage}`;
                const response = await axios.get(url, {
                    headers: {'Authorization': `Bearer ${token}`}
                });
                setHistoryMileages(response.data.data.content);
                console.log(response.data.data);
                setMileageTotalPages(response.data.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [mileageCurrentPage]);

    return (
        <div className='history-mileage'>
            <MyPageSubHeader/>
            <div className='mileage-contents-reigon'>
                <div className='mileage-contents-main'>
                    <MyPageSidebar/>
                    <div className='mileage-contents'>
                        <div className='mileage-contents-title'>
                            <div className='mileage-empty-div'></div>
                            <div className='mileage-contents-title-div'>
                                <div className='mileage-contents-title-bar'></div>
                                <div>마일리지 사용내역</div>
                            </div>
                        </div>
                        <div className='mileage-contents-right'>
                            <div className='mileage-contents-right-intro'>
                                <div className='mileage-contents-right-intro-title'>마일리지</div>
                                <div className='mileage-contents-right-intro-contents'>
                                    <div className='mileage-contents-right-intro-contents-style'>*마일리지는 매년 1월 1일 연 120만원
                                        자동 충전 됩니다.
                                    </div>
                                    <div className='mileage-contents-right-intro-contents-style'>*신규 입사자에 한 하여 입사 분기에 따라
                                        마일리지 지급 금액이 달라집니다. (한 분기당 30만원)
                                    </div>
                                    <div className='mileage-contents-right-intro-contents-style'>*사용하지 않은 마일리지는 매년 말일에
                                        자동 소멸 됩니다.
                                    </div>
                                </div>
                            </div>
                            <div className='Mileage-contents-content-data'>
                                <hr className='Mileage-contents-content-data-hr'/>
                                <div className='Mileage-contents-content-data-title'>
                                    <div className='Mileage-contents-content-data-1'>날짜</div>
                                    <div className='Mileage-contents-content-data-2'>사용내역</div>
                                    <div className='Mileage-contents-content-data-3'>마일리지</div>
                                    <div className='Mileage-contents-content-data-4'>잔여 마일리지</div>
                                </div>
                                {historyMileages.map((mileage, index) => (
                                    <MileageHistoryItem
                                        key={index}
                                        date={formatDate(mileage.mileageChangeDate)}
                                        contents={mileage.mileageContents}
                                        addMileage={mileage.changeMileage}
                                        curMileage={mileage.remainMileage}
                                    />
                                ))}
                                <Pagination count={mileageTotalPages} page={mileageCurrentPage}
                                            onChange={handleMileagePageChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryMileage;
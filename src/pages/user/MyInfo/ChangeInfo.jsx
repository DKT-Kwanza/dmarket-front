import React, {useEffect, useState} from 'react';
import axios from "axios";
import './ChangeInfo.css';
import MyPageSubHeader from '../../../components/user/SubHeader/MyPageSubHeader';
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";

function ChangeInfo() {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/UserInfoData.json");
                setUserInfo(response.data);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='InfoChange'>
            <MyPageSubHeader/>
            <div className="InfoChange-body">
                <div className="InfoChange-container">
                    {/*왼쪽 메뉴 바 영역 입니다.*/}
                    <MyPageSidebar/>
                    <div className="InfoChange-content">
                        {/*주문/배송 조회 제목 영역 입니다.*/}
                        <div className="InfoChange-title">
                            <div className="InfoChange-title-bar"/>
                            <div className="InfoChange-title-content">배송지 변경</div>
                        </div>
                        <div className="InfoChange-title-line"></div>
                        <div className='InfoChange-info'>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>이름</div>
                                <div className='InfoChange-info-contents'>{userInfo.userName}</div>
                            </div>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>이메일</div>
                                <div className='InfoChange-info-contents'>{userInfo.userEmail}</div>
                            </div>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>사원번호</div>
                                <div className='InfoChange-info-contents'>{userInfo.userDktNum}</div>
                            </div>
                            <div className='InfoChange-info-box'>
                                <div className='InfoChange-info-title'>입사일</div>
                                <div className='InfoChange-info-contents'>{userInfo.userJoinDate}</div>
                            </div>
                        </div>
                        <div className='InfoChange-address'>
                            <div className='InfoChange-address-title'>기본배송지</div>
                            <div className='InfoChange-address-border'></div>
                            <div className='InfoChange-address-box'>
                                <div className='InfoChange-info-title'>받는 분</div>
                                <div className="InfoChange-info-contents">{userInfo.userName}</div>
                            </div>
                            <div className='InfoChange-address-box'>
                                <div className='InfoChange-info-title'>핸드폰 번호</div>
                                <div className="InfoChange-info-contents">{userInfo.userPhoneNum}</div>
                            </div>
                            <div className='InfoChange-address-box2'>
                                <div className='InfoChange-info-title'>배송지</div>
                                <input
                                    type="text"
                                    className="InfoChange-address-name"
                                    placeholder={userInfo.userPostalCode}
                                />
                                <div className="InfoChange-address-essential">우편번호</div>
                            </div>
                            <div className='InfoChange-address-box2'>
                                <div className='InfoChange-info-title'></div>
                                <input
                                    type="text"
                                    className="InfoChange-address-detail"
                                    placeholder={userInfo.userAddress}
                                />
                                <div className="InfoChange-address-essential">기본주소</div>
                            </div>
                            <div className='InfoChange-address-box'>
                                <div className='InfoChange-info-title'></div>
                                <input
                                    type="text"
                                    className="InfoChange-address-detail"
                                    placeholder={userInfo.userDetailedAddress}
                                />
                                <div className="InfoChange-address-essential">나머지주소</div>
                            </div>
                            <div className='InfoChange-btn-container'>
                                <button type='submit' className='InfoChange-btn'>수정</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangeInfo;
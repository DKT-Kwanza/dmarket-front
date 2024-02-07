import React, { useState } from 'react';
import axios from 'axios';
import './ChargeMileage.css'
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import { userApi } from '../../../api/Api';

function ChargeMileage(){

    const [chargeAmount, setChargeAmount] = useState('');

    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    const handleChargeRequest = async () => {
        if (!chargeAmount) {
            alert('충전 금액을 입력해주세요.');
            return;
        }

        console.log(chargeAmount);

        try {
            const response = await axios.post(`${userApi}/${userId}/mypage/mileage-charge`, {
                mileageCharge: chargeAmount
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            alert('충전 요청이 성공적으로 처리되었습니다!\n\n아래 가상 계좌로 24시간 내 입금 부탁드립니다.\n입금 확인이 완료된 후 충전 금액을 확인하실 수 있습니다.\n\ndkt은행 000000-00-000000\n');
            setChargeAmount('');
        } catch (error) {
            console.error('Error submitting charge request:', error);
            alert('충전 요청 처리 중 오류가 발생했습니다.');
        }
    };

    return(
        <div className='chargemileage'>
            <MyPageSubHeader />
            <div className='contents-reigon'>
                <div className='contents-main'>
                    <MyPageSidebar />
                    <div className='contents'>
                    <div className='contents-title'>
                        <div className='empty-div'></div>
                        <div className='contents-title-div'>
                            <div className='contents-title-bar'></div>
                            <div>마일리지 충전하기</div>
                        </div>
                    </div>
                        <div className='contents-right'>
                            <div className='contents-right-intro'>
                                <div className='contents-right-intro-title'>마일리지</div>
                                <div className='contents-right-intro-contents'>
                                    <div className='contents-right-intro-contents-style'>*마일리지는 매년 1월 1일 연 120만원 자동 충전 됩니다.</div>
                                    <div className='contents-right-intro-contents-style'>*신규 입사자에 한 하여 입사 분기에 따라 마일리지 지급 금액이 달라집니다. (한 분기당 30만원)</div>
                                    <div className='contents-right-intro-contents-style'>*사용하지 않은 마일리지는 매년 말일에 자동 소멸 됩니다.</div>
                                </div>
                            </div>
                            <div className='contents-right-flow'>
                                <div className='contents-right-flow-details'>
                                    <div className='contents-right-flow-details-title'>1</div>
                                    <div className='contents-right-flow-details-contents'>마일리지 충전 금액을 입력한 후, 관리자에게 충전 요청 버튼을 눌러주세요.</div>
                                </div>
                                <div className='contents-right-flow-bar'></div>
                                <div className='contents-right-flow-details'>
                                    <div className='contents-right-flow-details-title'>2</div>
                                    <div className='contents-right-flow-details-contents'>회사계좌를 통한 무통장 입금이 확인 이후, 관리자 승인 후 마일리지 충전이 이루어 집니다.</div>
                                </div>
                                <div className='contents-right-flow-bar'></div>
                                <div className='contents-right-flow-details'>
                                    <div className='contents-right-flow-details-title'>3</div>
                                    <div className='contents-right-flow-details-contents'>업무일 기준 하루 소요됩니다. 이후의 문의 사항은 고객센터에 문의해 주세요.</div>
                                </div>
                            </div>
                            <div className='contents-right-charge'>
                                <div className='contents-right-charge-price'>
                                    <div className='contents-right-charge-price-enalbe'>
                                        <div className='contents-right-charge-price-enalbe-A'>*충전 가능 금액</div>
                                        <div className='contents-right-charge-price-enalbe-B'>1,000,000원</div>
                                    </div>
                                    <input placeholder='   충전 금액을 입력하세요.' 
                                        className='contents-right-charge-price-inputbox' 
                                        value={chargeAmount}
                                        onChange={(e) => setChargeAmount(e.target.value)}
                                    />
                                </div>
                                <div className='contents-right-charge-request'>
                                    <div className='contents-right-charge-request-button-div'>
                                        <button onClick={handleChargeRequest} className='contents-right-charge-request-button'>충전요청</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ChargeMileage;
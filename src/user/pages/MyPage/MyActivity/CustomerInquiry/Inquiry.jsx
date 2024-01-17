import './Inquiry.css';
import MyPageSidebar from "../../../../components/MyPage/Sidebar/MyPageSidebar";
import MyPageSubHeader from "../../../../components/MyPage/SubHeader/MyPageSubHeader";
import { useNavigate } from 'react-router-dom';

const Inquiry = () => {

    const navigate = useNavigate();
    const temp = () => {
        navigate('/');
    }

    return (
        <div className='Inquiry'>
        <div><MyPageSubHeader /></div>
            <div className='Inquiry-contents-body'>
                <MyPageSidebar />
                <div className='Inquiry-container'>
                    <div className='Inquiry-title'>
                        <div className='Inquiry-title-bar'></div>
                        <div className='Inquiry-title-info'>고객문의</div>
                    </div>
            <div className='Inquiry-contents-content'>
                <div className='Inquiry-contents-content-hr' />
                <div className='Inquiry-contents-content-info'>
                    <p>* 관련 없는 내용, 비방, 광고, 불건전한 내용의 글은 사전 동의 없이 삭제될 수 있습니다.</p>
                    <p>* 고객님께서 고객문의에 작성하신 내용입니다.</p>
                </div>
                <div className='Inquiry-contents-content-data'>
                    <hr className='Inquiry-contents-content-data-hr' />
                    <div className='Inquiry-contents-content-data-title'>
                        <div className='Inquiry-contents-content-data-1'>유형</div>
                        <div className='Inquiry-contents-content-data-2'>제목</div>
                        <div className='Inquiry-contents-content-data-3'>작성일</div>
                        <div className='Inquiry-contents-content-data-4'>답변 상태</div>
                    </div>
                    <ul className='Inquiry-contents-content-data-list'>

                        <li className='Inquiry-contents-content-data-list-temp'>
                            <div className='Inquiry-contents-content-data-1'>주문/결제</div>
                            <div className='Inquiry-contents-content-data-2'>포인트 충전 어떻게 하나요?</div>
                            <div className='Inquiry-contents-content-data-3'>2014.01.08</div>
                            <div className='Inquiry-contents-content-data-4'>답변 대기</div>
                        </li>
                        <hr className='Inquiry-contents-content-data-list-hr' />
                        <div className='Inquiry-contents-content-data-list-detail'>
                            <div className='Inquiry-contents-content-data-list-data'>
                                <p>포인트 충전 어디서 하나요?</p>
                                <p>여기에서 하면 되나요?</p>
                            </div>
                            <hr className='Inquiry-contents-content-data-list-hr' />
                            <div className='Inquiry-contents-content-data-list-data'>
                                <p>답변 준비중입니다.</p>
                            </div>
                            <hr className='Inquiry-contents-content-data-list-hr' />
                            <div className='Inquiry-contents-content-data-list-btn-wrap'>
                                <button className='Inquiry-contents-content-data-list-btn' onClick={temp}>확인</button>
                            </div>
                            <hr className='Inquiry-contents-content-data-list-btn-hr' />
                        </div>

                        <li className='Inquiry-contents-content-data-list-temp' onClick={temp}>
                            <div className='Inquiry-contents-content-data-1'>반품/환불</div>
                            <div className='Inquiry-contents-content-data-2'>반품 신청했는데 언제 환불 되나요?</div>
                            <div className='Inquiry-contents-content-data-3'>2014.01.08</div>
                            <div className='Inquiry-contents-content-data-4'>답변 완료</div>
                        </li>
                        <hr className='Inquiry-contents-content-data-list-hr' />
                        <div className='Inquiry-contents-content-data-list-detail'>
                            <div className='Inquiry-contents-content-data-list-data'>
                                <p>포인트 충전 어디서 하나요?</p>
                                <p>여기에서 하면 되나요?</p>
                            </div>
                            <hr className='Inquiry-contents-content-data-list-hr' />
                            <div className='Inquiry-contents-content-data-list-data'>
                                <p>답변 준비중입니다.</p>
                            </div>
                            <hr className='Inquiry-contents-content-data-list-hr' />
                            <div className='Inquiry-contents-content-data-list-btn-wrap'>
                                <button className='Inquiry-contents-content-data-list-btn' onClick={temp}>확인</button>
                            </div>
                            <hr className='Inquiry-contents-content-data-list-btn-hr' />
                        </div>
                    </ul>
                </div>
            </div>
        </div>
            </div>
    </div>
    );
};

export default Inquiry;

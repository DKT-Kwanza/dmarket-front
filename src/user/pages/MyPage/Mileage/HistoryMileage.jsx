import './HistoryMileage.css'
import MyPageSubHeader from "../../../components/MyPage/SubHeader/MyPageSubHeader";
import MyPageSidebar from "../../../components/MyPage/Sidebar/MyPageSidebar";
import MileageHistoryItem from "../../../components/Mileage/MileageHistoryItem";

function HistoryMileage(){
    const mileageData = [
        {
            mileageId: 1,
            date: "2024-01-08 09:48:00",
            contents: "충전",
            addMileage: "+60,000",
            curMileage: "126,000"
        },
        {
            mileageId: 2,
            date: "2024-01-08 09:48:00",
            contents: "구매",
            addMileage: "-30,000",
            curMileage: "96,000"
        },
    ]

    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return(
        <div className='history-mileage'>
            <MyPageSubHeader />
            <div className='mileage-contents-reigon'>
                <div className='mileage-contents-main'>
                    <MyPageSidebar />
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
                                    <div className='mileage-contents-right-intro-contents-style'>*마일리지는 매년 1월 1일 연 120만원 자동 충전 됩니다.</div>
                                    <div className='mileage-contents-right-intro-contents-style'>*신규 입사자에 한 하여 입사 분기에 따라 마일리지 지급 금액이 달라집니다. (한 분기당 30만원)</div>
                                    <div className='mileage-contents-right-intro-contents-style'>*사용하지 않은 마일리지는 매년 말일에 자동 소멸 됩니다.</div>
                                </div>
                            </div>
                            <div className='Mileage-contents-content-data'>
                            <hr className='Mileage-contents-content-data-hr' />
                            <div className='Mileage-contents-content-data-title'>
                                <div className='Mileage-contents-content-data-1'>날짜</div>
                                <div className='Mileage-contents-content-data-2'>사용내역</div>
                                <div className='Mileage-contents-content-data-3'>마일리지</div>
                                <div className='Mileage-contents-content-data-4'>잔여 마일리지</div>
                            </div>
                            {mileageData.map((mileage, index) => (
                                <MileageHistoryItem
                                    key={index}
                                    date={formatDate(mileage.date)}
                                    contents={mileage.contents}
                                    addMileage={mileage.addMileage}
                                    curMileage={mileage.curMileage}
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HistoryMileage;
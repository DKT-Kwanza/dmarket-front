import React from 'react';
import './DetailQnaReply2.css';
function DetailQnaReply2({ onClose }) {

    const handleConfirmClick = () => {
        onClose();
      };
  return (
    <>
    <div id="container">
        <div className='questionContents'><text>포인트 충전 어떻게 하나요?<br />여기에서 하면 되나요?</text></div>
        <div className='questionReply1'>
            <div className='questionReplyWriter'>
                <text>관리자</text>
                <div className='questionReplyDate'><text>2024.01.08</text></div>
            </div>
            <div className='questionReplyContents'><text>비밀입니다.</text></div>
        </div>
        <div className='questionClose'>
            <button className='closeButton' onClick={handleConfirmClick}>확인</button>
        </div>
    </div>

    </>
  );
}

export default DetailQnaReply2;
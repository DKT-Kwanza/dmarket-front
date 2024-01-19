import React from 'react';
import './DetailQnaReply.css';
function DetailQnaReply({ onClose }) {

    const handleConfirmClick = () => {
        onClose();
      };
  return (
    <>
    <div id="container">
        <div className='questionContents'><text>상품 사이즈 상세를 알고싶습니다.</text></div>
        <div className='questionReply'><text>답변 준비 중 입니다.</text></div>
        <div className='questionClose'>
            <button className='closeButton' onClick={handleConfirmClick}>확인</button>
        </div>
    </div>

    </>
  );
}

export default DetailQnaReply;
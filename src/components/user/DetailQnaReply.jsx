import React from 'react';
import styled from "styled-components";
import { formatDate } from '../../utils/Format';

function DetailQnaReply({onClose, content, qnaReplyContent, replyAt}) {

    const handleConfirmClick = () => {
        onClose();
    };

    return (
        <Area>
            <Content className='qnaContentsTest'>{content}</Content>
            {
                qnaReplyContent
                    ?
                    <ReplyArea>
                        <ReplyWriter>
                            <div>관리자</div>
                            <ReplyDate>{formatDate(replyAt)}</ReplyDate>
                        </ReplyWriter>
                        <div style={{marginTop: "20px"}}>{qnaReplyContent}</div>
                        <ConfirmBtn onClick={handleConfirmClick}>확인</ConfirmBtn>
                    </ReplyArea>
                    :
                    <ReplyArea>
                        답변 준비 중 입니다.
                        <ConfirmBtn onClick={handleConfirmClick}>확인</ConfirmBtn>
                    </ReplyArea>
            }
        </Area>
    );
}

const Area = styled.div`
  margin-left: 5px;
  background: #f8fafb;
`;

const Content = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 1px solid #DBDBDB;
`;

const ReplyArea = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 400;
  border-bottom: 2px solid #DBDBDB;
`;

const ReplyWriter = styled.div`
  display: flex;
  font-weight: 700;
  height: 22px;
`;

const ReplyDate = styled.div`
  height: 22px;
  font-weight: 400;
  margin-left: 40px;
`;

const ConfirmBtn = styled.div`
  margin-left: auto;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  text-align: center;
  padding: 12px 0;
  width: 100px;
  font-size: 16px;
  font-weight: 500;
  color: #444444;
  background-color: #FFD465;
  cursor: pointer;
`;

export default DetailQnaReply;
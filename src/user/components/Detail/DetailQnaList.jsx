import styled from "styled-components";
import DetailQnaListItem from "./DetailQnaListItem";
import React, {useState} from "react";
import DetailQnaReply from "./DetailQnaReply";

function DetailQnaList({qnas}) {

    const [openReplyIndexes, setOpenReplyIndexes] = useState([]);

    // DetailQnaListItem 에 onClick 이 일어나면 DetailQnaReply 가 보이도록
    const qnaClickHandler = (index) => {    // 각 item 의 index
        const isOpen = openReplyIndexes.includes(index);
        if (isOpen) {
            setOpenReplyIndexes(openReplyIndexes.filter((i) => i !== index));   // 체크 해제
        } else {
            setOpenReplyIndexes([...openReplyIndexes, index]);  // 배열에 추가
        }
    };
    
    return (
        <>
            {/*표의 title 부분*/}
            <Area>
                <Title>제목</Title>
                <Date>작성일</Date>
                <State>답변상태</State>
            </Area>
            {/*표의 내용 부분*/}
            {
                qnas.map((data, index) => (
                    <div key={index}>
                        <DetailQnaListItem onClick={() => qnaClickHandler(index)} title={data.title}
                                           createdAt={data.createdAt} status={data.status}/>
                        {openReplyIndexes.includes(index) &&
                            <DetailQnaReply onClose={() => qnaClickHandler(index)} content={data.content}
                                            qnaReplyContent={data.qnaReplyContent} replyAt={data.replyAt}/>}
                    </div>
                ))
            }
        </>
    );
}

// styled-component 선언
const Area = styled.div` 
  margin-top: 15px;
  border-top: 1px solid #b3b3b3;
  display: flex;
  height: 56px;
  background-color: #FAFAFA;
  font-size: 14px;
  font-weight: 500;
  color: #444444;
`;

const Title = styled.div`
  margin-top: 18px;
  margin-left: 5px;
`;

const Date = styled.div`
  margin-top: 18px;
  margin-left: 365px;
`;

const State = styled.div`
  margin-top: 18px;
  margin-left: 153px;
`;

export default DetailQnaList;
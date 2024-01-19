import styled from "styled-components";
import DetailQnaListItem from "./DetailQnaListItem";
import React, {useState} from "react";
import DetailQnaReply from "./DetailQnaReply";

function DetailQnaList({datas}) {

    const [openReplyIndexes, setOpenReplyIndexes] = useState([]);

    const qnaClickHandler = (index) => {
        const isOpen = openReplyIndexes.includes(index);
        if (isOpen) {
            setOpenReplyIndexes(openReplyIndexes.filter((i) => i !== index));
        } else {
            setOpenReplyIndexes([...openReplyIndexes, index]);
        }
    };

    return (
        <>
            <Area>
                <Title>제목</Title>
                <Date>작성일</Date>
                <State>답변상태</State>
            </Area>
            {
                datas.map((data, index) => (
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
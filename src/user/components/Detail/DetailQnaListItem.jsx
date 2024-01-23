import styled from "styled-components";
import React from "react";

function DetailQnaListItem({onClick, title, createdAt, status, writer}) {
    const formatDate = (datetime) => { // 날짜만 남기기
        const date = new Date(datetime);
        return date.toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'});
    };
    return (
        <QnaArea onClick={onClick}>
            <Title>{title}</Title>
            <Writer>{writer}</Writer>
            <Date>{createdAt}</Date>
            <State status={status}>{status}</State>
        </QnaArea>
    );
}

const QnaArea = styled.div`
  height: 58px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 2px solid #c4c4c4;
  margin-left: 5px;
`;

const Title = styled.div`
  background-color: #FFFFFF;
  font-size: 14px;
  font-weight: 400;
  width: 530px;
`;

const Writer = styled.div`
  font-size: 14px;
  font-weight: 400;
  width: 186px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  width: 188px;
`;

const State = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.status === "답변 완료" ? "#FF0000" : "#6F97FF"};
`;
export default DetailQnaListItem;
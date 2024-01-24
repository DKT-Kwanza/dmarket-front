import styled from "styled-components";
import React from "react";
import { formatDate } from "../../../utils/Format";


function DetailQnaListItem({onClick, title, createdAt, status, writer}) {
  
    return (
        <QnaArea onClick={onClick}>
            <Title>{title}</Title>
            <Writer>{writer}</Writer>
            <Date>{formatDate(createdAt)}</Date>
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
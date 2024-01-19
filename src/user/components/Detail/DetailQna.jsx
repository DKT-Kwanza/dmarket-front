import styled from "styled-components";
import React from "react";

function DetailQna({onClick, title, }) {
    return (
        <QnaArea onClick={onClick}>
            <Title>포인트 충전 어떻게 하나요?</Title>
            <Date>2024.01.08</Date>
            <State1>답변 대기</State1>
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
  border: none;
  background-color: #FFFFFF;
  font-size: 14px;
  font-weight: 400;
  width: 392px;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  width: 192px;
`;

const State1 = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #FF0000;
`;

const State2 = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #6F97FF;
`;
export default DetailQna;
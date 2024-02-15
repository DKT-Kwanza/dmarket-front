import styled from "styled-components";
import theme from "../../../styles/commonStyles"
import React from "react";
import { formatDate } from "../../../utils/Format";
import { CiLock } from "react-icons/ci";

function DetailQnaListItem({onClick, title, qnaIsSecret, createdAt, status, writer}) {

    return (
        <QnaArea onClick={onClick}>
            <Title className='qnaTitleTest'>
              {title}
              {qnaIsSecret && (
                <CiLock fontSize="large" />
              )}
            </Title>
            <Writer>{writer}</Writer>
            <Date>{formatDate(createdAt)}</Date>
            <State status={status}>
              {status}
            </State>
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
  width: 477px;
  display: flex;
  align-items: center;
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
  color: ${(props) => props.status === "답변 완료" ? theme.colors.$blue_0 : theme.colors.$red_0};
`;
export default DetailQnaListItem;
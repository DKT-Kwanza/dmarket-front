import React from 'react';
import styled from "styled-components";
import theme from "../../../styles/commonStyles";
import {FaChevronDown} from "react-icons/fa6";
import {FaChevronUp} from "react-icons/fa6";

function CustomerCenterNoticeItem({ noticeTitle, isExpanded, onToggle, noticeCreatedDate, children }) {
    return (
        <div>
            <ContainerArea onClick={onToggle}>
                <Title>
                    {noticeTitle}
                </Title>
                <Date>
                    {noticeCreatedDate}
                </Date>
                <ExpandButton>
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </ExpandButton>
            </ContainerArea>
            {isExpanded && (
                <ExpandedContent>
                    {children}
                </ExpandedContent>
            )}
            <Line />
        </div>
    );
}

const ContainerArea = styled.div`
  display: flex;
  margin: 30px 10px 20px 10px;
  cursor: pointer;
`

const Title = styled.div`
  width: 906px;
  height: 20px;
  flex-shrink: 0;
  margin-left: 4px;
  color: ${theme.colors.black};
  font-size: 16px;
  font-weight: 400;
`

const Date = styled.div`
  width: 135px;
  height: 34px;
  flex-shrink: 0;
  color: #919191;
  text-align: right;
  font-size: 16px;
  font-weight: 500;
  margin-left: 180px;
`

const ExpandButton = styled.div`
  margin-left: 20px;
  margin-top: 2px;
`

const ExpandedContent = styled.div`
  width: 1216px;
  flex-shrink: 0;
  font-size: 16px;
  background: ${theme.colors.$grey_0};
  padding: 30px 30px;
`

const Line = styled.div`
  width: 1275px;
  height: 1px;
  background: 1px ${theme.colors.$grey_2};
`

export default CustomerCenterNoticeItem;


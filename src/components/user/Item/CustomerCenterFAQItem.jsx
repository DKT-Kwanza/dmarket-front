import React from 'react';
import styled from "styled-components";
import theme from "../../../styles/commonStyles"
import {FaChevronDown} from "react-icons/fa6";
import {FaChevronUp} from "react-icons/fa6";

function CustomerCenterFAQItem({faqId, faqTitle, isExpanded, onToggle, children}) {
    return (
        <div>
            <ContainerArea onClick={onToggle}>
                <Title>Q. {faqTitle}</Title>
                <ExpandButton>
                    {isExpanded ? <FaChevronUp/> : <FaChevronDown/>}
                </ExpandButton>
            </ContainerArea>
            {isExpanded && <ExpandedContent>{children}</ExpandedContent>}
            <Line />
        </div>
    );
}

const ContainerArea = styled.div`
  display: flex;
  margin: 30px 10px;
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

const ExpandButton = styled.div`
  margin-left: 325px;
  margin-top: 4px;
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

export default CustomerCenterFAQItem;

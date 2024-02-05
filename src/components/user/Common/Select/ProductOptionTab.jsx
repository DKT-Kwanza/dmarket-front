import styled from "styled-components";
import {useEffect, useState} from "react";
import cancel from "../../../../assets/icons/cancel.svg";
import plus from "../../../../assets/icons/plus.svg";
import minus from "../../../../assets/icons/minus.svg";

function ProductOptionTab({option, name, onCountChange}) {
    const [tab, setTab] = useState(option);
    const [count, setCount] = useState(1);

    useEffect(() => {
        if (tab) {
            onCountChange({ count, optionId: option.optionId });
        } else {
            onCountChange({ count: 0, optionId: option.optionId });
        }
    }, [count, option.optionId, tab]);

    if (!tab) {
        return null;
    }
    const closeTabHandler = () => {
        setTab(null);
    }

    const addCount = () => {
        if (count < option.optionQuantity) {
            const newCount = count + 1;
            setCount(newCount);
            onCountChange({ count: newCount, optionId: option.optionId });
        }
    }

    const minusCount = () => {
        /* count가 0이 되면 tab 이 닫힘 */
        if (count === 1) {
            closeTabHandler();
        } else {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange({ count: newCount, optionId: option.optionId });
        }
    }

    return(
        <TabArea>
            <InfoArea>
                <Text>[{option.optionValue}] {name}</Text>
                <CancelBtn onClick={closeTabHandler}>
                    <img
                        alt={"cancel btn"}
                        src={cancel}/>
                </CancelBtn>
            </InfoArea>
                <CountArea>
                    <CountBtn onClick={minusCount}>
                        <img
                            alt={"minus btn"}
                            src={minus}/>
                    </CountBtn>
                    <Count>{count}</Count>
                    {/* count가 option.optionQuantity 이상이면 버튼 비활성화 */}
                    <CountBtn onClick={addCount} disabled={count >= option.optionQuantity}>
                        <img
                            alt={"plus btn"}
                            src={plus}/>
                    </CountBtn>
                    <QuantityText>{option.optionQuantity}개 수량 제한</QuantityText>
                </CountArea>
        </TabArea>
    );
}

const QuantityText = styled.div`
  color: red;
  padding-left: 10px;
  font-size: 14px;
`;

const TabArea = styled.div`
  width: 538px;
  background: #F1F1F1;
  padding: 16px 16px 20px 23px;
  margin-bottom: 10px;
`;

const InfoArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 8px;
`;

const CancelBtn = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const CountArea = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const CountBtn = styled.button`
  border: 1px solid #D9D9D9;
  /* 배경 색 동적으로 변경 */
  background: ${props => props.disabled ? '#F1F1F1' : '#FFF'}; 
  outline: none;
  padding-top: 4px;
  height: 27px;
  /* 비활성화일 때 커서 스타일 변경 */
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const Count = styled.div`
  width: 48px;
  border: 1px solid #D9D9D9;
  background: #FFF;
  text-align: center;
  outline: none;
  height: 26px;
`;

export default ProductOptionTab;
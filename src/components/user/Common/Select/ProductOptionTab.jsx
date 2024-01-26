import styled from "styled-components";
import cancel from "../../../../assets/icons/cancel.svg";
import plus from "../../../../assets/icons/plus.svg";
import minus from "../../../../assets/icons/minus.svg";
import {useState} from "react";

function ProductOptionTab({option, name}) {
    const [tab, setTab] = useState({option});
    const [count, setCount] = useState(1);

    if (!tab) {
        return null;
    }

    const closeTabHandler = () => {
        setTab(null);
    }

    const addCount = () => {
        setCount(count+1);
    }

    const minusCount = () => {
        setCount(count-1);
    }

    return(
        <TabArea>
            <InfoArea>
                <Text>[{option}] {name}</Text>
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
                    <CountBtn onClick={addCount}>
                        <img
                            alt={"plus btn"}
                            src={plus}/>
                    </CountBtn>
                </CountArea>
        </TabArea>
    );
}

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
`;

const CountBtn = styled.button`
  border: 1px solid #D9D9D9;
  background: #FFF;
  outline: none;
  padding-top: 4px;
`;

const Count = styled.div`
  width: 48px;
  border: 1px solid #D9D9D9;
  background: #FFF;
  text-align: center;
`;

export default ProductOptionTab;
/* 확인 버튼이 있는 popup modal 입니다. */
import styled from 'styled-components';
import {useState} from 'react';
import {darken} from 'polished';

function ConfirmModal({isOpen, onClose, onConfirm, children, color}) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleConfirm = () => {
        setIsConfirmed(true);
        onConfirm();
        onClose(); // Close the modal after confirmation
    };

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalView onClick={(e) => e.stopPropagation()}>
                <TextArea>{children}</TextArea>
                <BtnArea>
                    <ConfirmBtn color={color}
                                onClick={handleConfirm}>확인</ConfirmBtn>
                </BtnArea>
            </ModalView>
        </ModalBackdrop>
    );
}

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalView = styled.div.attrs((props) => ({
    /* attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있다.*/
    role: 'dialog',
}))`
  /* Modal CSS */
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 231px;
  border-radius: 5px;
  background: #FFF;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.25);
`;

const TextArea = styled.div`
  display: flex;
  flex-basis: 180px;
  text-align: center;
  align-items: center;
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const BtnArea = styled.div`
  display: flex;
  flex-direction: row;
  height: 51px;
`

const ConfirmBtn = styled.button`
  width: 400px;
  outline: none;
  border: none;
  border-radius: 0 0 5px 5px;
  background: ${props => props.color || '#FFD465'};

  &:active,
  &:hover,
  &:focus {
    background: ${props => darken(0.1, props.color) || '#ffb84a'};
  }
`

export default ConfirmModal;
import styled from "styled-components";

function GreyBtn({ disabled, onClick, children }) {
    return <StyledButton disabled={disabled} onClick={onClick}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  font-family: "Noto Sans KR", sans-serif;
  border-radius: 4px;
  border: 1px solid #505050;
  outline: none;
  background-color: #FFFFFF;
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  margin-left: auto;
  padding: 8px 19px;
  color: #505050;
  font-weight: 400;

  &:active,
  &:hover,
  &:focus {
    background: #e1e4e6;
    border: 1px solid #191919;
  }
`;

export default GreyBtn;
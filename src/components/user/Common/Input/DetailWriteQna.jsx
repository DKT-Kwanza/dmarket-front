import CheckBox from "../CheckBox/CheckBox";
import Button from "../Button/Button";
import React, {useState} from "react";
import styled from "styled-components";

function DetailWriteQna({onClick}) {
    const [checkboxState, setCheckboxState] = useState(false);
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');

    /* qna 작성 공개 여부 체크박스 */
    const handleCheckboxChange = (newState) => {
        console.log(newState);
        if (checkboxState === newState) {
            setCheckboxState(true);
        } else {
            setCheckboxState(newState);
            console.log(newState);
        }
    };

    const handleEnrollClick = () => {
        /* onClick 콜백 함수 호출하여 데이터 전달 */
        onClick(title, contents, checkboxState);
    };

    return (
        <Area>
            <Title>
                <div>제목</div>
                <TitleInput type="text" name="title" placeholder="제목을 입력해주세요." value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required></TitleInput>
            </Title>
            <Content>
                <ContentTitle>
                    <div>내용</div>
                </ContentTitle>
                <ContentInput type="text" name="contents" value={contents} placeholder="내용을 입력해주세요."
                              onChange={(e) => setContents(e.target.value)}
                              required></ContentInput>
            </Content>
            <SecretState>
                <Secret>비밀글</Secret>
                <Public>
                    공개
                </Public>
                <CheckBox
                    checked={checkboxState === false}
                    onChange={() => handleCheckboxChange(false)}
                />
                <Private>
                    비공개
                </Private>
                <CheckBox
                    checked={checkboxState === true}
                    onChange={() => handleCheckboxChange(true)}
                />
            </SecretState>
            <BtnArea>
              <Button variant='primary' width='base' label='등록' onClick={handleEnrollClick} />
            </BtnArea>
        </Area>
    );
}

const Area = styled.div`
  height: 300px;
  border-bottom: 1px solid #c4c4c4;
`;

const Title = styled.div`
  display: flex;
  margin-top: 26px;
  height: 30px;
  font-size: 15px;
  font-weight: 500;
  padding-left: 5px;
`;

const TitleInput = styled.input`
  margin-left: 20px;
  padding-left: 25px;
  flex: 1;
  height: 36px;
  font-size: 15px;
  border: 1px solid #C6C6C6;
  border-radius: 0;
  outline: none;
`;

const Content = styled.div`
  display: flex;
  margin-top: 26px;
  height: 110px;
  font-size: 15px;
  font-weight: 500;
  padding-left: 5px;
`;

const ContentTitle = styled.div`
  height: 22px;
  padding-top: 5px;
`;

const ContentInput = styled.textarea`
  margin-left: 20px;
  font-size: 15px;
  padding-left: 25px;
  padding-top: 5px;
  flex: 1;
  height: 110px;
  border: 1px solid #C6C6C6;
  border-radius: 0;
  outline: none;
`;

const SecretState = styled.div`
  display: flex;
  justify-content: right;
  margin-top: 25px;
  height: 26px;
  font-size: 15px;
  font-weight: 400;
`;

const Secret = styled.div`
  font-weight: 500;
`;

const Public = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 20px;
  cursor: pointer;
  font-size: 15px;
`;

const Private = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  font-size: 15px;
`;

const BtnArea = styled.div`
  float: inline-end;
  margin-top: 16px;
`;
export default DetailWriteQna;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CheckBox from "../../../components/user/Common/CheckBox/CheckBox";
import './Login.css';
import logo from '../../../assets/images/logo.png'
import chevronRight from '../../../assets/icons/chevron-right.svg'

function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [inputId,setInputId] = useState("");
  const [inputPw,setInputPw] = useState("");

  const formData = new FormData();

  formData.append("email", inputId);
  formData.append("password", inputPw);

  const handleInputIdChange = (e) => {
    setInputId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = () => {
    axios
        .post('http://172.16.210.136:8080/api/users/login', formData)
        .then(res =>{
          const token = res.data.data.accesstoken;
          const userId = res.data.data.userId;
          sessionStorage.setItem('token', token);
          alert("로그인 되었습니다!");
          navigate("../../");
        })
        .catch(error => {
          console.error("Login failed:", error);
          alert("로그인 정보를 확인해주세요");
        });
  };

  return (
      <div className="login-container">
        <div className="login-box">
          <div className='login-contents'>
            <img src={logo} alt="Logo" className="login-logo" />
            <div className='login-form'>
              <input
                  type="email"
                  className="login-id-input"
                  value={inputId}
                  placeholder="아이디를 입력하세요"
                  onChange={handleInputIdChange}
              />
              <div className="login-possible">
                *사내 이메일로 로그인이 가능합니다.
              </div>
              <input
                  type="password"
                  className={`login-pw-input ${!passwordValid ? 'login-pw-input-error' : ''}`}
                  placeholder="비밀번호를 입력하세요"
                  value={inputPw}
                  onChange={handlePasswordChange}
              />
              {/* {!passwordValid && (
              <div className="password-error-msg">
                비밀번호가 일치하지 않습니다
              </div>
            )} */}
              <div className="login-maintain">
                <CheckBox />
                <label className='login-checkbox-label'>
                  로그인 상태 유지
                </label>
              </div>
              <button type="submit" className="login-btn" onClick={onClickLogin}>
                로그인
              </button>
              <div className="login-signup">
                <span>회원이 아니신가요?</span>
                <Link to="../signin" className="login-signup-btn">
                  회원가입<img src={chevronRight} alt="Logo" className="login-chevronRight" />
                </Link>
              </div>
              <div className='login-info'>
                <p>
                  DKTechin 임직원들을 위한 쇼핑몰 입니다.
                  임직원 인증을 통해 로그인한 고객만 세부 내용을 확인할 수 있습니다.
                </p>
                <p>
                  이용 중 불편한 사항이 있는 경우 고객센터로 문의하시기 바랍니다.
                  고객센터 운영시간 : 평일 09:00 ~ 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Login;

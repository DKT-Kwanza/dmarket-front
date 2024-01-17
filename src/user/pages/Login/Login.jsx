import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../../components/CheckBox/CheckBox';
import './Login.css';
import logo from '../../../assets/images/logo.png'
import chevronRight from '../../../assets/icons/chevron-right.svg'

function Login() {
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);

  const handlePasswordChange = (e) => { // 입력한 비밀번호와 임시 비밀번호 "1234"와 비교
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(newPassword === "1234");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='login-contents'>
          <img src={logo} alt="Logo" className="login-logo" />
          <div className='login-form'>
            <input
              type="text"
              className="login-id-input"
              placeholder="아이디를 입력하세요"
            />
            <div className="login-possible">
              *사내 이메일로 로그인이 가능합니다.
            </div>
            <input
              type="password"
              className={`login-pw-input ${!passwordValid ? 'login-pw-input-error' : ''}`}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
            />
            {!passwordValid && (
              <div className="password-error-msg">
                비밀번호가 일치하지 않습니다
              </div>
            )}
            <div className="login-maintain">
              <CheckBox />
              <label className='login-checkbox-label'>
                로그인 상태 유지
              </label>
            </div>
            <button type="submit" className="login-btn">
              로그인
            </button>
            <div className="login-signup">
              <span>회원이 아니신가요?</span>
              <Link to="/signin" className="login-signup-btn">
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

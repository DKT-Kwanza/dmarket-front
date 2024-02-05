import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from "../../../components/user/Common/CheckBox/CheckBox";
import './SignInForm.css';
import { userApi } from '../../../Api';

function SignInForm() {
    const navigate = useNavigate();
    const [state, setState] = useState({
        inputId: '',
        inputPw: '',
        inputName: '',
        phoneNumber: '',
        dktNum: '',
        joinDate: '',
        postalCode: '',
        address: '',
        detailedAddress: '',
        Agreed: false
    });
    
    const isPasswordValid = (password) => {
        return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    };

    const handleCheckboxChange = (e) => {
        setState({ ...state, termsAgreed: e.target.checked });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name === 'phoneNumber') {
            const input = value.replace(/\D/g, '');
            const formattedPhoneNumber = input.replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
                if (p3) {
                    return `${p1}-${p2}-${p3}`;
                } else if (p2) {
                    return `${p1}-${p2}`;
                } else {
                    return p1;
                }
            });
            setState({ ...state, [name]: formattedPhoneNumber });
        } else {
            setState({ ...state, [name]: value });
        }
    };
    
    
    const handleSignUpSubmit = (e) => {
        e.preventDefault(); // 폼의 기본 제출 이벤트를 방지
        
        if (state.inputPw !== state.confirmPassword) {
            alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        if (!isPasswordValid(state.inputPw)) {
            alert("최소 8자리 이상 영대문자, 숫자, 특수문자를 포함해주세요.");
            return;
        }

        if (!state.termsAgreed) {
            alert("이용약관 및 개인정보수집 이용 동의는 필수입니다.");
            return;
        }

        axios
            .post(`${userApi}/join`,{
                userEmail: state.inputId,
                userPassword: state.inputPw,
                userDktNum: state.dktNum,
                userName: state.inputName,
                userJoinDate: state.joinDate,
                userPhoneNum: state.phoneNumber,
                userPostalCode: state.postalCode,
                userAddress: state.address,
                userDetailedAddress: state.detailedAddress
            })
            .then((res)=> {
                alert("회원가입에 성공했습니다!");
                navigate("../login",{replace : true});
            })
            .catch(function(error){
                console.log(error);
            })
    }

    return (
        <div className='signInForm-container'>
            <p className='signInForm-title'>
                회원가입 인증
            </p>
            <div className='signInForm-border'></div>
            <div className='signInForm-essential-container'>
                <span className='signInForm-essential'>필수입력사항</span>
            </div>
            <div className='signInForm-box'>
                <div className='signInForm-contents'>
                    <form onSubmit={handleSignUpSubmit}>
                        <div className='signInForm-form'>
                            <label htmlFor='email'>이메일</label>
                            <input
                                type='email'
                                id='email'
                                name='inputId'
                                value={state.inputId} 
                                onChange={handleInputChange}
                                required
                                className='signInForm-input'
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='password'>비밀번호</label>
                            <input
                                type='password'
                                id='password'
                                name='inputPw'
                                value={state.inputPw}
                                autoComplete="new-password"
                                onChange={handleInputChange}
                                required
                                className='signInForm-input'
                                placeholder='비밀번호를 입력하세요.'
                            />
                        </div>
                        <div className='signInForm-password-essential'>
                            *최소 8자리 이상 영대문자, 숫자, 특수문자를 포함해주세요.
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='confirmPassword'>비밀번호 확인</label>
                            <input
                                type='password'
                                id='confirmPassword'
                                name='confirmPassword'
                                autoComplete="current-password"
                                required
                                className='signInForm-input'
                                placeholder='비밀번호를 다시 입력하세요.'
                                value={state.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='name'>이름</label>
                            <input
                                type='text'
                                id='name'
                                name='inputName'
                                value={state.inputName}
                                onChange={handleInputChange}
                                required
                                className='signInForm-input'
                                placeholder='이름을 입력하세요.'
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='name'>핸드폰 번호</label>
                            <input
                                type='tel'
                                id='tel'
                                name='phoneNumber'
                                required
                                className='signInForm-input'
                                placeholder='핸드폰 번호를 입력하세요.'
                                value={state.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='employeeNumber'>사원번호</label>
                            <input
                                type='text'
                                id='employeeNumber'
                                name='dktNum'
                                required
                                className='signInForm-input'
                                placeholder='사원번호를 입력하세요.'
                                value={state.dktNum}
                                onChange={handleInputChange}
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='employeeDate'>입사일</label>
                            <input
                                type='date'
                                id='employeeDate'
                                name='joinDate'
                                required
                                className='signInForm-input'
                                placeholder='입사일을 입력하세요.'
                                value={state.joinDate}
                                onChange={handleInputChange}
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='address' className='signInForm-no-asterisk'>기본 배송지</label>
                            <input
                                type='text'
                                id='zipCode'
                                name='postalCode'
                                className='signInForm-input'
                                placeholder='우편번호'
                                value={state.postalCode}
                                onChange={handleInputChange}
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='address' className='signInForm-no-asterisk'></label>
                            <input
                                type='text'
                                id='address'
                                name='address'
                                className='signInForm-input'
                                placeholder='기본주소'
                                value={state.address}
                                onChange={handleInputChange}
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='address' className='signInForm-no-asterisk'></label>
                            <input
                                type='text'
                                id='addressDetail'
                                name='detailedAddress'
                                className='signInForm-input'
                                placeholder='상세주소를 입력하세요'
                                value={state.detailedAddress}
                                onChange={handleInputChange}
                                autoComplete="on"
                            />
                        </div>
                        <div className='signInForm-agreement'>
                            <div className='signInForm-agreement-title'>약관 동의</div>
                            <div className='signInForm-agreement-contents'>
                                이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.
                            </div>
                            <div className='signInForm-agreement-form'>
                                <div className="signInForm-checkbox">
                                    <CheckBox
                                        checked={state.termsAgreed}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                                <label htmlFor='agreement'>[필수] 이용약관 및 개인정보수집 및 이용</label>
                                <button className='signInForm-agreement-btn'>약관 보기</button>
                            </div>
                            <div className='signInForm-agreement-form'>
                                <div className="signInForm-checkbox">
                                    <CheckBox/>
                                </div>
                                <label htmlFor='agreement'>[선택] 쇼핑정보 수신</label>
                                <button className='signInForm-agreement-btn'>약관 보기</button>
                            </div>
                        </div>
                        <div className='signInForm-btn-container'>
                            <button type='submit' className='signInForm-btn'>회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;

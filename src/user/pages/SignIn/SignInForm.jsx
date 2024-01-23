import React from 'react';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../components/CheckBox/CheckBox';
import './SignInForm.css';

function SignInForm() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = React.useState("");

    /* 핸드폰 번호 입력 시 - 추가 */
    const handlePhoneChange = (event) => {
        const input = event.target.value.replace(/\D/g, '');
        const formattedPhoneNumber = input.replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
            if (p3) {
                return `${p1}-${p2}-${p3}`;
            } else if (p2) {
                return `${p1}-${p2}`;
            } else {
                return p1;
            }
        });
        setPhoneNumber(formattedPhoneNumber);
    };

    const navigateToMain = () => {
        navigate("../main");
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
                    <form>
                        <div className='signInForm-form'>
                            <label htmlFor='email'>이메일</label>
                            <input
                                type='email'
                                id='email'
                                name='email'
                                required
                                className='signInForm-input'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='password'>비밀번호</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
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
                                required
                                className='signInForm-input'
                                placeholder='비밀번호를 다시 입력하세요.'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='name'>이름</label>
                            <input
                                type='text'
                                id='name'
                                name='name'
                                required
                                className='signInForm-input'
                                placeholder='이름을 입력하세요.'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='name'>핸드폰 번호</label>
                            <input
                                type='tel'
                                id='name'
                                name='name'
                                required
                                className='signInForm-input'
                                placeholder='핸드폰 번호를 입력하세요.'
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='employeeNumber'>사원번호</label>
                            <input
                                type='text'
                                id='employeeNumber'
                                name='employeeNumber'
                                required
                                className='signInForm-input'
                                placeholder='사원번호를 입력하세요.'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='employeeDate'>입사일</label>
                            <input
                                type='date'
                                id='employeeDate'
                                name='employeeDate'
                                required
                                className='signInForm-input'
                                placeholder='입사일을 입력하세요.'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='address' className='signInForm-no-asterisk'>기본 배송지</label>
                            <input
                                type='text'
                                id='zipCode'
                                name='zipCode'
                                required
                                className='signInForm-input'
                                placeholder='우편번호'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='address' className='signInForm-no-asterisk'></label>
                            <input
                                type='text'
                                id='address'
                                name='address'
                                required
                                className='signInForm-input'
                                placeholder='기본주소'
                            />
                        </div>
                        <div className='signInForm-form'>
                            <label htmlFor='address' className='signInForm-no-asterisk'></label>
                            <input
                                type='text'
                                id='addressDetail'
                                name='addressDetail'
                                required
                                className='signInForm-input'
                                placeholder='상세주소를 입력하세요'
                            />
                        </div>
                        <div className='signInForm-agreement'>
                            <div className='signInForm-agreement-title'>약관 동의</div>
                            <div className='signInForm-agreement-contents'>
                                이용약관 및 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.
                            </div>
                            <div className='signInForm-agreement-form'>
                                <div className="signInForm-checkbox">
                                    <CheckBox/>
                                </div>
                                <label htmlFor='agreement'>[필수] 개인정보 수집 및 이용 동의</label>
                                <button className='signInForm-agreement-btn'>약관 보기</button>
                            </div>
                            <div className='signInForm-agreement-form'>
                                <div className="signInForm-checkbox">
                                    <CheckBox/>
                                </div>
                                <label htmlFor='agreement'>[필수] 개인정보 수집 및 이용 동의</label>
                                <button className='signInForm-agreement-btn'>약관 보기</button>
                            </div>
                        </div>
                        <div className='signInForm-btn-container'>
                            <button type='submit' onClick={navigateToMain} className='signInForm-btn'>회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignInForm;

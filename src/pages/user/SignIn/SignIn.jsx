import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';
import logo from '../../../assets/images/logo.png'

function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState(''); // 사용자 이메일 상태
    const [code, setCode] = useState(''); // 인증 코드 입력 상태
    const [showVerification, setShowVerification] = useState(false); // 인증 코드 입력칸 상태
    const [timer, setTimer] = useState(600); // 10분을 초로 환산

    useEffect(() => {
        let interval;
        if (showVerification && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [showVerification, timer]);

    /* MM:SS 형식으로 변환 */
    const changeTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://172.16.210.136:8080/api/users/email', email, {
                headers: {
                    'Content-Type': 'text/plain',
                },
            });
            if (response.status === 200) {
                setShowVerification(true);
                setTimer(600);
            }
        } catch (error) {
            console.error('Email verification error:', error);
        }
    };
    
    

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        try {
            const codeInt = parseInt(code, 10);
            const response = await axios.post('http://172.16.210.136:8080/api/users/email/verify', {
                userEmail: email,
                code: codeInt,
            });
    
            if (response.status === 200) {
                navigate("../signinForm");
            }
        } catch (error) {
            console.error('Code verification error:', error);
        }
    };
    

    const navigateToSignForm = () => {
        navigate("../signinForm");
    }

    return (
        <div className="signIn-container">
            <div className="signIn-box">
                <div className='signIn-contents'>
                <img src={logo} alt="Logo" className="signIn-logo" />
                {!showVerification ? (
                    <div className='signIn-form'>
                        <p className='signIn-title1'>회원가입 인증</p>
                        <div className='signIn-border1'></div>
                        <p className='signIn-title2'>고객님의 회사 이메일을 입력해주세요.</p>
                        <p className='signIn-title3'>입력한 이메일은 인증에만 사용됩니다.</p>
                        <p className='signIn-title4'>사내 이메일만 인증 가능합니다.</p>
                        <input
                            type="text"
                            className="signIn-email-input"
                            placeholder="회사이메일을 입력하세요"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <button onClick={handleSubmitEmail} className="signIn-btn1">
                            인증하기
                        </button>
                    </div>
                ) : (
                    <div className='signIn-form'>
                        <p className='signIn-title1'>회원가입 인증</p>
                        <div className='signIn-border2'></div>
                        <p className='signIn-title5'>메일함에서 인증 코드를 확인하세요.</p>
                        <p className='signIn-title6'>인증코드가 오지 않았다면 스팸함을 확인해 주세요.</p>
                        <div className='signIn-email-display'>
                            {email}
                        </div>
                        <div className="signIn-code-input-box">
                            <input
                                type="text"
                                className="signIn-code-input"
                                placeholder="인증코드를 입력해주세요"
                                value={code}
                                onChange={handleCodeChange}
                            />
                            {showVerification && (
                                <div className='signIn-timer'>
                                    {changeTime()}
                                </div>
                            )}
                        </div>
                        <button onClick={handleSubmitCode} className="signIn-btn2">
                            인증하기
                        </button>
                    </div>
                )}
                <div className='signIn-info'>
                    <p>
                        업무 시 개인 메일 사용 임직원은 <br />
                        고객센터로 인증 요청 후 가입 가능합니다. 
                    </p>
                    <p> 
                        이용 중 불편한 사항이 있는 경우 고객센터로 문의하시기 바랍니다.<br />
                        고객센터 운영시간 : 평일 09:00 ~ 18:00 
                    </p>
                </div>
            </div>
        </div>
    </div>
    );
}

export default SignIn;
import React, {useEffect, useState} from "react";
import "./ChangePwd.css";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {userApi} from "../../../api/Api";

function ChangePwd() {
    const navigate = useNavigate();
    /* 현재 비밀번호 변수 */
    const [currentPassword, setCurrentPassword] = useState("");
    const [lengthCheck, setLengthCheck] = useState(false);
    /* 새 비밀번호 변수 */
    const [newPassword, setNewPassword] = useState("");
    const [newLengthCheck, setNewLengthCheck] = useState(false);
    /* 새 비밀번호 확인 변수 */
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    useEffect(() => {
        /* 비밀번호와 비밀번호 확인이 일치하는지 확인 */
        setPasswordsMatch(newPassword === confirmPassword);
    }, [newPassword, confirmPassword]);

    /* 현재 비밀번호 값 */
    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
        if (currentPassword.length >= 7) {
            setLengthCheck(true);
        } else {
            setLengthCheck(false);
        }
    };

    /* 새 비밀번호 값 */
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
        if (newPassword.length >= 7) {
            setNewLengthCheck(true);
        } else {
            setNewLengthCheck(false);
        }
    };

    /* 새 비밀번호 확인 값 */
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    /* 확인 모달 handler */
    const closeModalHandler = () => {
        setIsOpen(false);
        setErrorMsg(''); // 모달 닫을 때 메시지 초기화
        setModalColor(''); // 모달 닫을 때 색상 초기화

        // 확인 버튼을 눌렀을 때 navigate
        if (isConfirming) {
            navigate("/member/login");
        }
    };

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    /* 비밀번호 변경 버튼 클릭 */
    const [errorMsg, setErrorMsg] = useState('');
    const [modalColor, setModalColor] = useState('');
    const changePasswordConfirm = async () => {
        const requestData = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        };

        try {
            const url = `${userApi}/${userId}/mypage/change-pwd`;
            const response = await axios.put(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            /* 성공 시 sessionStorage 비우기 */
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');
            /* 성공 메시지 설정 */
            setErrorMsg('비밀번호 변경이 완료되었습니다. 자동으로 로그아웃됩니다.');
            setIsOpen(true);
            setModalColor('#ffd465');
            setIsConfirming(true); // 성공했음을 표시
        } catch (e) {
            console.error('요청 실패:', e);
            setErrorMsg(e.response.data.msg);
            setIsOpen(true);
            setModalColor('#ff5d5d');
            setIsConfirming(false); // 실패했음을 표시
        }
    };

    return (
        <div className='changePwd'>
            <MyPageSubHeader/>
            <div className="changePwd-body">
                <div className="changePwd-container">
                    <MyPageSidebar/>
                    <div className="changePwd-content">
                        <div className="changePwd-title">
                            <div className="changePwd-title-bar"/>
                            <div className="changePwd-title-content">비밀번호 변경</div>
                        </div>
                        <div className="changePwd-title-line"></div>
                        <div className="changePwd-content-div">
                            <div className="changePwd-inputDiv">
                                <table>
                                    <colgroup>
                                        <col style={{width: "200px"}}/>
                                        <col/>
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <td>현재 비밀번호</td>
                                        <td>
                                            <input type="password" value={currentPassword}
                                                   onChange={handleCurrentPasswordChange}/>
                                            {currentPassword.length >= 7 && lengthCheck
                                                ? null
                                                : (
                                                    <span style={{color: 'red'}}>비밀번호는 8자리 이상이어야 합니다.</span>
                                                )}
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="changePwd-inputDiv">
                                <table>
                                    <colgroup>
                                        <col style={{width: "200px"}}/>
                                        <col/>
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <td>새 비밀번호</td>
                                        <td>
                                            <input type="password" value={newPassword}
                                                   onChange={handlePasswordChange}/>
                                            {newPassword.length >= 7 && newLengthCheck
                                                ? null
                                                : (
                                                    <span style={{color: 'red'}}>비밀번호는 8자리 이상이어야 합니다.</span>
                                                )}
                                        </td>
                                        <td><span>*최소 8자리 이상 영문자, 숫자, 특수문자 조합으로 등록해주세요.</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="changePwd-inputDiv">
                                <table>
                                    <colgroup>
                                        <col style={{width: "200px"}}/>
                                        <col/>
                                    </colgroup>
                                    <tbody>
                                    <tr>
                                        <td>새 비밀번호 확인</td>
                                        <td>
                                            <input type="password" value={confirmPassword}
                                                   onChange={handleConfirmPasswordChange}></input>
                                            {
                                                newPassword && passwordsMatch
                                                    ? <span style={{color: 'blue'}}>비밀번호가 일치합니다.</span>
                                                    : <span style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</span>
                                            }
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="changePwd-button-div">
                            <button
                                className="changePwd-button-conf"
                                disabled={!passwordsMatch || !lengthCheck || !newLengthCheck}
                                onClick={changePasswordConfirm}>확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <ConfirmModal isOpen={isOpen} onClose={closeModalHandler} onConfirm={closeModalHandler} color={modalColor}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>{errorMsg}</div>
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
}

export default ChangePwd;
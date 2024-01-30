import React, {useEffect, useState} from "react";
import "./ChangePwd.css";
import MyPageSubHeader from "../../../components/user/Header/MyPageSubHeader";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";
import ConfirmModal from "../../../components/commmon/Modal/ConfirmModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ChangePwd() {
    const navigate = useNavigate();
    /* 현재 비밀번호 변수 */
    const [currentPassword, setCurrentPassword] = useState("");
    /* 새 비밀번호 변수 */
    const [newPassword, setNewPassword] = useState("");
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
    };

    /* 새 비밀번호 값 */
    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    /* 새 비밀번호 확인 값 */
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    /* 확인 모달 handler */
    const openModalHandler = () => {
        setIsOpen(true);
    }
    const closeModalHandler = () => {
        setIsOpen(false);
    };

    /* 세션 스토리지에서 토큰 가져오기 */
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('userId');

    const changePasswordConfirm = async () => {
        const requestData = {
            currentPassword: currentPassword,
            newPassword: newPassword,
        };

        try {
            const response = await axios.put(`http://172.16.210.136:8080/api/users/${userId}/mypage/change-pwd`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                }
            });
            console.log('요청 성공:', response.data);

            /* 성공 시 sessionStorage 비우기 */
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userId');

            /* 로그인 페이지로 이동 */
            navigate("/member/login");
        } catch (e) {
            console.error('요청 실패:', e);
        }
        setIsConfirming(true);
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
                                        <td><input type="password" value={currentPassword} onChange={handleCurrentPasswordChange}/></td>
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
                                            <span>*최소 6자리 이상 영문자, 숫자 조합으로 등록해주세요.</span>
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
                                disabled={!passwordsMatch}
                                onClick={openModalHandler}>확인
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <ConfirmModal isOpen={isOpen} onClose={closeModalHandler} onConfirm={changePasswordConfirm}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <div>비밀번호 변경이 완료되었습니다.</div>
                        <div>자동으로 로그아웃됩니다.</div>
                    </div>
                </ConfirmModal>
            )}
        </div>
    );
}

export default ChangePwd;
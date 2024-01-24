import React, {useEffect, useState} from "react";
import "./ChangePwd.css";
import MyPageSubHeader from "../../../components/user/SubHeader/MyPageSubHeader";
import MyPageSidebar from "../../../components/user/Sidebar/MyPageSidebar";

function ChangePwd() {
    // 현재 비밀번호 변수
    const [currentPassword, setCurrentPassword] = useState("");
    // 새 비밀번호 변수
    const [newPassword, setNewPassword] = useState("");
    // 새 비밀번호 확인 변수
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    useEffect(() => {
        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        setPasswordsMatch(newPassword === confirmPassword);
    }, [newPassword, confirmPassword]);

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
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
                                        <td><input type="password" value={currentPassword}></input></td>
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
                                                passwordsMatch
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
                            <button className="changePwd-button-conf" disabled={!passwordsMatch}>확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePwd;
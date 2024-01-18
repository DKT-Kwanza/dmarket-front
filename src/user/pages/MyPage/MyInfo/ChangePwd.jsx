import React from "react";
import "./ChangePwd.css";
import MyPageSubHeader from "../../../components/MyPage/SubHeader/MyPageSubHeader";
import MyPageSidebar from "../../../components/MyPage/Sidebar/MyPageSidebar";

function ChangePwd(){
    return(
        <div className='changePwd'>
            <MyPageSubHeader />
            <div className="changePwd-body">
                <div className="changePwd-container">
                    <MyPageSidebar />
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
                                        <col style={{width:"200px"}}/><col/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>현재 비밀번호</td>
                                            <td><input type="password"></input></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="changePwd-inputDiv">
                                <table>
                                    <colgroup>
                                        <col style={{width:"200px"}}/><col/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>새 비밀번호</td>
                                            <td>
                                                <input type="password"></input>
                                                <span>*최소 6자리 이상 영문자, 숫자 조합으로 등록해주세요.</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="changePwd-inputDiv">
                                <table>
                                    <colgroup>
                                        <col style={{width:"200px"}}/><col/>
                                    </colgroup>
                                    <tbody>
                                        <tr>
                                            <td>새 비밀번호 확인</td>
                                            <td><input type="password"></input></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="changePwd-button-div">
                            <button className="changePwd-button-conf">확인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePwd;
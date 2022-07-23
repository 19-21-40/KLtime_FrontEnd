import { useState } from "react";

function LoginForm({totalInfo}){

    document.querySelector("#lbtn").addEventListener("click", () => {
    const id = document.getElementById('id').value;
    const pw = document.getElementById('password').value;

    if(totalInfo.studentnumber.includes(id)) {
        if(totalInfo.pw.includes(pw)) {
            alert("로그인 완료!");
        }
        else {
            alert("비밀번호가 맞지 않습니다.");
        }
    }
    else {
        alert("아이디 혹은 비밀번호가 맞지 않습니다.");
    }
});


return (
    <div id="wrap">
        <div class="login_form">
            <h1>로그인</h1>
            <input id="id" type="text" placeholder="학번을 입력하세요"/><br/>
            <input id="password" type="text" placeholder="비밀번호를 입력하세요"/><br/>
            <button id="lbtn">로그인</button>
            <button id="fbtn">비밀번호 찾기</button>
        </div>
    </div>
    )
}

export default LoginForm;
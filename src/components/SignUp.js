import { useState } from "react";

function SignupForm(){
  
  let pw_check = 0;

  function check_pw(){
    var pw = document.getElementById('pw').value;
    var SC = ["!","@","#","$","%"];
    var check_SC = 0;

    if(pw.length < 8 || pw.length>16){
        window.alert('비밀번호는 8글자 이상, 16글자 이하만 이용 가능합니다.');
        document.getElementById('pw').value='';
    }
    for(var i=0;i<SC.length;i++){
        if(pw.indexOf(SC[i]) != -1){
            check_SC = 1;
        }
    }
    if(check_SC == 0){
        window.alert('!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.')
        document.getElementById('pw').value='';
    }
    if(document.getElementById('pw').value !='' && document.getElementById('pw2').value!=''){
        if(document.getElementById('pw').value==document.getElementById('pw2').value){
            document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
            document.getElementById('check').style.color='blue';
            pw_check=1;

        }
        else{
            document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
            document.getElementById('check').style.color='red';
        }
    }
  }

  document.querySelector("#signup").addEventListener("click", () => {
    const stdnu = document.getElementById('stdnum').value;
    const p_pw = document.getElementById('pw').value;
    const department = document.getElementById('depar').value;
    const mail = document.getElementById('email').value;
  
    if(pw_check === 0){
      alert("비밀번호가 일치하지 않습니다.");
    }
    else{
      let per_info = {
        stnu: stdnu,
        pw: p_pw,
        dep: department,
        p_mail: mail
      }
      pw_check=0;    
      console.log(per_info);
    }
    
  });


  return (
  <div>
    <h1>시간표 회원가입</h1>
    <div><span class="S_s">학번<br/></span><input id="stdnum" type="text"/></div>
    <div><span class="S_s">비밀번호<br/></span>
    <input type="password" name="userPW" id="pw" onchange="check_pw()"/>
    </div>
    <div><span class="S_s">비밀번호 재확인<br/></span>
    <input type="password" name="userPW2" id="pw2" onchange="check_pw()"/>&nbsp;<span id="check"></span>
    </div>
    <div><span class="S_s">학과<br/></span><input id="depar" type="text"/></div>
    <div><span class="S_s">이메일<br/></span><input id="email" type="text"/><button id="prove">이메일 인증</button></div>
    <button id="signup">가입하기</button>
  </div>
  )
}

export default SignupForm;
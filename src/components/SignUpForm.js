
import React, {useState, useContext, useCallback, useRef} from "react";
import useInputs from "../hooks/useInputs";

function SignupFrom() {
  const [{ number, password, password_check, department, email,multiMajor,multDept,grade,semester}, onChange, reset] = useInputs({
    number: '',
    name:'',
    password: '',
    password_check: '',
    department: '',
    email: '@kw.ac.kr',
    multiMajor:'',
    multDept:'',
    grade:0,
    semester:''
  });

const onClick = () => {
  if(password !== password_check){
    console.log("비밀번호 확인 불일치");
    reset();
  }
};

return (
    <div>
      <label htmlFor="number">학번<br/></label>
      <input name="number" value={number} onChange={onChange} placeholder="학번 입력" type="text" /><br/>
      <label htmlFor="password">비밀번호<br/></label>
      <input name="password" value={password} onChange={onChange} placeholder="비밀번호 입력" type="password" /><br/>
      <label htmlFor="password_check">비밀번호 재입력<br/></label>
      <input name="password_check" value={password_check} onChange={onChange} placeholder="비밀번호 재입력" type="password" /><br/>
      <label htmlFor="department">학과<br/></label>
      <input name="department" value={department} onChange={onChange} placeholder="학과 입력" type="text" /><br/>
      <label htmlFor="email">이메일<br/></label>
      <input name="email" value={email} onChange={onChange} placeholder="이메일 입력" type="text" /><br/>
      <button onClick={onClick}>가입하기</button>
    </div>
);
}
//비어있을떄 가입 안되게
export default React.memo(SignupFrom);

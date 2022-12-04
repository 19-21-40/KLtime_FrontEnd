
import axios from "axios";
import React, {useState, useContext, useCallback, useRef} from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../app-config";
import useInputs from "../hooks/useInputs";

function SignupFrom() {
  const navigate=useNavigate();
  const [{ number,name, password, password_check, department, email,multiMajor,multDept,grade,semester}, onChange, reset] = useInputs({
    number: '',
    name:'',
    password: '',
    password_check: '',
    department: '',
    email: '',
    multiMajor:'',
    multDept:'',
    grade:0,
    semester:''
  });

const onClick = () => {
  if(password == password_check){
    axios.post(`${API_BASE_URL}/auth/sign_up`,{
      number: number,
      name:name,
      password: password,
      departmentName: department,
      email: email!=''?email+"@kw.ac.kr":null,
      multiMajor:multiMajor,
      multDept:multDept,
      grade: grade,
      semester:semester
    }).then(res=>{
      if(res.status==200){
        navigate("/Login")
      }else{
        //error
      } 
    })

  }
  reset();
};

return (
    <div>
      <label htmlFor="number">학번<br/></label>
      <input name="number" value={number} onChange={onChange} placeholder="학번" type="text" /><br/>
      <label htmlFor="password">비밀번호<br/></label>
      <input name="password" value={password} onChange={onChange} placeholder="비밀번호" type="password" /><br/>
      <label htmlFor="password_check">비밀번호 확인<br/></label>
      <input name="password_check" value={password_check} onChange={onChange} placeholder="비밀번호 확인" type="password" /><br/>
      <label htmlFor="department">학과<br/></label>
      <input name="department" value={department} onChange={onChange} placeholder="학과" type="text" /><br/>
      <label htmlFor="email">학교 이메일<br/></label>
      <input name="email" value={email} onChange={onChange} placeholder="학교 이메일" type="text" />@kw.ac.kr<br/>
      <label htmlFor="grade">학년<br/></label>
      <input name="grade" value={grade} onChange={onChange} placeholder="학년" type="text" /><br/>
      <label htmlFor="semester">학기<br/></label>
      <input name="semester" value={semester} onChange={onChange} placeholder="학기" type="text" /><br/>
      <button onClick={onClick}>가입하기</button>
    </div>
);
}
//비어있을떄 가입 안되게
export default React.memo(SignupFrom);
import PropTypes from "prop-types";
import React, {useState, useContext, useCallback, useRef} from "react";
import { UserDispatch } from "../context/UserInfoContext";
import useInputs from "../hooks/useInputs";

function SignupFrom() {
  const [{ stdnum, password, pw_c, department, email }, onChange, reset] = useInputs({
    stdnum: '',
    password: '',
    pw_c: '',
    department: '',
    email: ''
  });
  const dispatch = useContext(UserDispatch);
  const nextId = useRef(4);
//   const [info, setInfo] = useState({
//     stdnum: "",
//     pw: "",
//     pw_c: "",
//     department: "",
//     email: ""
// })

// const {
//     stdnum, pw, pw_c, department, email
// } = info;

// const onChange = e => {
//     setInfo({
//         ...info,
//         [e.target.name]: e.target.value
//     });
// };

// const onSubmit = (e) => {
//   e.preventDefault();
//   console.log(user_info);
//   if(pw !== pw_c){
//     console.log("비밀번호 확인 불일치");
//   }
//   else{
//     setUser_info([
//       // 기존 데이터 보존
//       ...user_info,
//       {
//         stdnum: stdnum,
//         pw: pw,
//         department: department,
//         email: email,
//       }
//     ])
//   // const user_info = {
//   //   stdnum: stdnum,
//   //   pw: pw,
//   //   department: department,
//   //   email: email
//   // }
//   console.log(user_info);
//   }
// }

// const [user_info, setUser_info] = useState([
//   {
//     stdnum: "2021203022",
//     pw: "heljol!",
//     department: "소프트웨어학부",
//     email: "sour_jam0220@naver.com",
//   },
// ])

// const addInfo = (event) => {
//   // refresh 막기 위해 사용
//   event.preventDefault();
//   setUser_info([
// 		// 기존 데이터 보존
//     ...movies,
//     {
//       stdnum: stdnum,
//       pw: pw,
//       department: department,
//       email: email,
//     }
//   ])
// };


// function check_pw(){
//   const SC = ["!","@","#","$","%"];
//   let check_SC = 0;

//   if(pw.length < 8 || pw.length > 16){
//       alert('비밀번호는 8글자 이상, 16글자 이하만 이용 가능합니다.');
//   }
//   for(let i=0;i<SC.length;i++){
//       if(pw.indexOf(SC[i]) != -1){
//           check_SC = 1;
//       }
//   }
//   if(check_SC == 0){
//       alert('!,@,#,$,% 의 특수문자가 들어가 있지 않습니다.')
//   }
  // if(pw != '' && pw_c != ''){
      // if(pw=pw_c){
          // document.getElementById('check').innerHTML='비밀번호가 일치합니다.'
          // document.getElementById('check').style.color='blue';
          // pw_check=1;

      // }
      // else{
          // document.getElementById('check').innerHTML='비밀번호가 일치하지 않습니다.';
          // document.getElementById('check').style.color='red';
      // }
  // }


// document.querySelector("#signup").addEventListener("click", () => {
//   const stdnu = document.getElementById('stdnum').value;
//   const p_pw = document.getElementById('pw').value;
//   const department = document.getElementById('depar').value;
//   const mail = document.getElementById('email').value;

//   if(pw_check === 0){
//     alert("비밀번호가 일치하지 않습니다.");
//   }
//   else{
//     let per_info = {
//       stnu: stdnu,
//       pw: p_pw,
//       dep: department,
//       p_mail: mail
//     }
//     pw_check=0;    
//     console.log(per_info);
//   }
// });

// const onChange = useCallback(e => {
//   const { name, value } = e.target;
//   dispatch({
//     type: 'CHANGE_INPUT',
//     name,
//     value
//   });
// }, []);

// const onClick = useCallback(() => {
//   dispatch({
//     type: 'CREATE_USER',
//     user: {
//       id: nextId.current,
//       stdnum,
//       password,
//       department,
//       email
//     }
//   });
//   nextId.current += 1;
// }, [stdnum, password, department, email]);
const onClick = () => {
  if(password !== pw_c){
    console.log("비밀번호 확인 불일치");
    reset();
  }
  else{
    dispatch({
    type: 'CREATE_USER',
    user: {
    id: nextId.current,
    stdnum,
    password,
    department,
    email
    }
  });
  reset();
  nextId.current += 1;
  }
};

return (
    <div>
      <label htmlFor="stdnum">학번<br/></label>
      <input name="stdnum" value={stdnum} onChange={onChange} placeholder="학번 입력" type="text" /><br/>
      <label htmlFor="password">비밀번호<br/></label>
      <input name="password" value={password} onChange={onChange} placeholder="비밀번호 입력" type="password" /><br/>
      <label htmlFor="pw_c">비밀번호 재입력<br/></label>
      <input name="pw_c" value={pw_c} onChange={onChange} placeholder="비밀번호 재입력" type="password" /><br/>
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

import PropTypes from "prop-types";
import React, {useState} from "react";

function PasswdSearchFrom() {

  const [Pwsinfo, setPwsInfo] = useState({
      stdnum: "",
      code: "",
      email: "",
  })
  
  const {
      stdnum, email, code
  } = Pwsinfo;
  
  const onChange = e => {
      setPwsInfo({
          ...Pwsinfo,
          [e.target.name]: e.target.value
      });
  };

  return(
  <div>
    <h1>비밀번호 찾기</h1>
    <div>
      <div>
        <label htmlFor="stdnum">학번<br/></label>
        <input  onChange={onChange} id="stdnum" type="text" name="stdnum" value={stdnum} placeholder="학번을 입력하시오." />
      </div>
      <div>
        <label htmlFor="Email_i">이메일<br/></label>
        <input  onChange={onChange} id="Email_i" type="text" name="email" value={email} placeholder="이메일을 입력하시오." />
        <button>인증코드 전송</button>
      </div>
      <div>
        <label htmlFor="code">인증코드<br/></label>
        <input  onChange={onChange} id="code" type="text" name="code" value={code} placeholder="코드를 입력하시오." />
        <button>인증</button>
      </div>
      </div>
    </div>
    );
}
//가입하기 눌렀을 때state 초기화
// LoginForm.propTypes={
//   text: PropTypes.string.isRequired,
// }

export default PasswdSearchFrom;
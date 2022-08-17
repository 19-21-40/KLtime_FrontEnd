import PropTypes from "prop-types";
import {useState} from "react";

function PasswdSearchFrom() {

  const [info, setInfo] = useState({
      stdnum: "",
      code: "",
      email: ""
  })
  
  const {
      stdnum, email, code
  } = info;
  
  const onChange = e => {
      setInfo({
          ...info,
          [e.target.name]: e.target.value
      });
  };

  return(
  <div>
    <h1>비밀번호 찾기</h1>
    <div>
      <div>
        <label htmlFor="stdnum_i">학번<br/></label>
        <input onChange={onChange} id="stdnum_i" type="text" name="name" value={stdnum} placeholder="학번을 입력하시오." />
      </div>
      <div>
        <label htmlFor="pw_i">이메일<br/></label>
        <input  onChange={onChange} id="pw_i" type="text" name="email" value={email} placeholder="이메일을 입력하시오." />
        <button>인증코드 전송</button>
      </div>
      <div>
        <label htmlFor="v_code">이메일<br/></label>
        <input  onChange={onChange} id="v_code" type="text" name="v_code" value={code} placeholder="코드를 입력하시오." />
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
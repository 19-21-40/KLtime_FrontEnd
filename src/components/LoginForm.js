import PropTypes from "prop-types";
import {useState} from "react";

function LoginFrom() {
    const [stdnum, setStdnum] = useState("");
    const [pw, setPw] = useState("");

    const onChange_std = (event) => setStdnum(event.target.value);
    const onChange_pw = (event) => setPw(event.target.value);

    const onClick_l = () => {
    if(stdnum === "2021203022"){
        if(pw === "jolelj"){
        alert("로그인 성공!");
    }
    else{
        alert("비밀번호가 맞지 않습니다.")
    }
    }
    else{
    alert("학번 혹은 비밀번호가 알맞지 않습니다.");
    }
    }

    return(
    <div>
        <h1>시간표 추천 로그인</h1>  
        <div>
        <div>
            <label htmlFor="stdnum_i">학번<br/></label>
            <input onChange={onChange_std} id="stdnum_i" type="text" name="name" value={stdnum} placeholder="학번을 입력하시오." />
        </div>
        <div>
            <label htmlFor="pw_i">비밀번호<br/></label>
            <input  onChange={onChange_pw} id="pw_i" type="password" name="password" value={pw} placeholder="비밀번호를 입력하시오." />
        </div>
        </div>
        <div>
        <button onClick={onClick_l} >로그인</button>
        <button>비밀번호 찾기</button>
        </div>
    </div>
    );
}
//가입하기 눌렀을 때state 초기화
// LoginForm.propTypes={
//   text: PropTypes.string.isRequired,
// }

export default LoginFrom;
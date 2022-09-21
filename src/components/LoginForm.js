import PropTypes from "prop-types";
import React, {useState, useContext} from "react";
import useInputs from "../hooks/useInputs";
import { UserState } from '../context/UserInfoContext';

function LoginFrom() {
    const [{ stdnum, password }, onChange, reset] = useInputs({
        stdnum: '',
        password: '',
    });
    const userInfoState = useContext(UserState);
    // const [stdnum_1, setStdnum] = useState("");
    // const [pw, setPw] = useState("");

    const onClick_l = () => {
    if(stdnum === userInfoState.users[0].stdnum){
        if(password === userInfoState.users[0].password){
        alert("로그인 성공!");
        reset();
    }
    else{
        alert("비밀번호가 맞지 않습니다.");
        reset();
    }
    }
    else{
        alert("학번 혹은 비밀번호가 알맞지 않습니다.");
        reset();
    }
    }

    return(
    <div>
        <h1>시간표 추천 로그인</h1>  
        <div>
        <div>
            <label htmlFor="stdnum">학번<br/></label>
            <input onChange={onChange} id="stdnum" type="text" name="stdnum" value={stdnum} placeholder="학번을 입력하시오." />
        </div>
        <div>
            <label htmlFor="password">비밀번호<br/></label>
            <input  onChange={onChange} id="password" type="password" name="password" value={password} placeholder="비밀번호를 입력하시오." />
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
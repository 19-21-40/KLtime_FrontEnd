import PropTypes from "prop-types";
import React, {useState, useContext} from "react";
import useInputs from "../hooks/useInputs";
import { UserState } from '../context/UserInfoContext';
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../app-config";

function LoginFrom() {
    const [{ stdnum, password }, onChange, reset] = useInputs({
        stdnum: '',
        password: '',
    });
    const userInfoState = useContext(UserState);
    // const [stdnum_1, setStdnum] = useState("");
    // const [pw, setPw] = useState("");
    useEffect(()=>{
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
            if (accessToken && accessToken !== null) {
                window.location.href="/"
            }
    },[])

    const onClick_l = () => {
        axios.post(`${API_BASE_URL}/auth/sign_in`,{number:stdnum,password:password})
        .then(res=>{
            localStorage.setItem("ACCESS_TOKEN",res.data.token)
            window.location.href="/"
        })
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
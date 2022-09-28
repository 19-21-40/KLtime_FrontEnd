import { useEffect, useState } from "react";
import SignupFrom from "../components/SignUp";
import UserInfoProvider from "../context/UserInfoContext";
import { call } from "../service/ApiService";

function SignUp(){
    // const [user,setUser]=useState();
    // useEffect(
    //     call("/auth/sign_up/","POST",
    //     {
    //         name:"이성훈",
    //         number:"2019203029",
    //         email:"skqnrua5123@naver.com",
    //         password:"1234"
    //     }).then((response)=>setUser(response))
    //     ,[]); //백엔드 코드 아직 연결 X
    return (
        <div>
            <UserInfoProvider>
                <SignupFrom />
            </UserInfoProvider>
        </div>
    )
}

export default SignUp;
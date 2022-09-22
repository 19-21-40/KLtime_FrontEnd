import { useEffect, useState } from "react";
import LoginForm from "../components/LoginForm";
import UserInfoProvider from "../context/UserInfoContext";
import { call } from "../service/ApiService";

function Login(){
    

    return (
        <div>
            <UserInfoProvider>
                <LoginForm />
            </UserInfoProvider>
        </div>
    )
}

export default Login;
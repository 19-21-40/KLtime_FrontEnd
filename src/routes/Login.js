import { useState } from "react";
import LoginForm from "../components/LoginForm";
import UserInfoProvider from "../context/UserInfoContext";

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
import { useState } from "react";
import SignupFrom from "../components/SignUp";
import UserList from "../components/Userinfo";
import UserInfoProvider from "../context/UserInfoContext";

//유저정보가져와
function Userinfo(){
    return (
        <div>
            <UserInfoProvider />
        </div>
    )
}

export default Userinfo;
import { useState } from "react";
import LoginForm from "../components/LoginForm";

function Login(){
    
    const test = [
        {
            studentnumber: "2021203022",
            pw: "jol925!",
            department: "소프트웨어학부",
            email: "sour_jam0220@naver.com"
        },
        {
            studentnumber: "2021203021",
            pw: "jel925!",
            department: "소프트웨어학부",
            email: "lsw8681@naver.com"
        }
    ];
    
    const [totalInfo, setTotalInfo]=useState(test);

    return (
        <div>
            <LoginForm
            totalInfo={totalInfo}
            />
        </div>
    )
}

export default Login;
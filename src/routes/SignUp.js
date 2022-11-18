import { useEffect, useState } from "react";
import styled from "styled-components";
import SignupFrom from "../components/SignUpForm";

const SignUpBox=styled.div`
    text-align:center
`


function SignUp() {
    return (
        <SignUpBox>
        <SignupFrom />
        </SignUpBox>
    )
}

export default SignUp;
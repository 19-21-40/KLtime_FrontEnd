import PropTypes from "prop-types";
import React, {useState, useContext} from "react";
import useInputs from "../hooks/useInputs";
import { useUserInfoDispatch,useUserInfoState } from '../context/UserInfoContext';
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../app-config";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import KLTimeLogo from "../image/KLTimeLogo.png"
import LoginBg from "../image/loginbg.jpg"

const Total = styled.div`

    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    // background: #000 url(${LoginBg}) no-repeat 0 0 !important;
    // background-image: url(${LoginBg});
    // background-position-x: 0px;
    // background-position-y: 0px;
    // background-size: 100% !important;
    // background-repeat-x: no-repeat;
    // background-repeat-y: no-repeat;
    // background-attachment: initial;
    // background-origin: initial;
    // background-clip: initial;
    // background-color: rgb(0, 0, 0);
`;

const Box = styled.div`

    width: 500px;
    height: 800px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);

    background-color: white;
}


`

const HeadLogo = styled.img`
    
`;

const Body = styled.div`
    
`;

const TotalInputContainer = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    margin-bottom: 15px;

    > input {
        height: 35px;
        padding: 5px 20px;

        border-radius: 25px;
        background: rgb(255,255,255);

        font-size:15px;
    }
`;

const TotalButtonContainer = styled.div`
    position: relative;

    width: 100%;

    display: flex;
`;

const LoginButton = styled.button`
    width: 90px;
    height: 50px;

    position: absolute;

    background-color: gray;

    padding: 6px;
    border-radius: 20px;
    border: none;

    color: white;
    font-size: 15px;
    font-weight: 800;

    cursor: pointer;
`

const FindButton = styled.button`
    width: 130px;
    height: 50px;
    padding: 6px;

    position: absolute;
    right: 0px;

    border-radius: 20px;
    border: none;

    background-color: gray;

    color: white;
    font-size: 15px;
    font-weight: 800;
    cursor: pointer;
`

function LoginFrom() {
    let navigate = useNavigate();
    const [{ number, password }, onChange, reset] = useInputs({
        number: '',
        password: '',
    });

    useEffect(()=>{
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
            if (accessToken && accessToken !== null) {
                navigate("/");
            }
    },[])

    
    
    const onClick = () => {
        axios.post(`${API_BASE_URL}/auth/sign_in`,{number:number,password:password})
        .then(res=>{
            localStorage.setItem("ACCESS_TOKEN",res.data.token)
            navigate("/");
        })
    }

    return(
    <>
        <Total>
            <Box>
                <HeadLogo src={KLTimeLogo}/>
                <Body>
                    <TotalInputContainer>
                        <InputContainer>
                            <input onChange={onChange} id="number" type="text" name="number" value={number} placeholder="학번을 입력하시오." />
                        </InputContainer>
                        <InputContainer>
                            <input  onChange={onChange} id="password" type="password" name="password" value={password} placeholder="비밀번호를 입력하시오." />
                        </InputContainer>
                    </TotalInputContainer>
                    <TotalButtonContainer>
                        <LoginButton onClick={onClick} >로그인</LoginButton>
                        <FindButton>비밀번호 찾기</FindButton>
                    </TotalButtonContainer>
                </Body>
            </Box>
        </Total>
    </>
    );
}

export default LoginFrom;
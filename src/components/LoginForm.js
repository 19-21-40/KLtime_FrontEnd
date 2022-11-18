import PropTypes from "prop-types";
import React, {useState, useContext} from "react";
import useInputs from "../hooks/useInputs";
import { useUserInfoDispatch,useUserInfoState } from '../context/UserInfoContext';
import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../app-config";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Input = styled.input`
    width: 300px;
    height: 50px;
    padding: 5px 20px;1-

    border-radius: 25px;
    background: rgb(255,255,255);

    font-size:20px;
`

const Button = styled.button`

    width: 100%;
    height: 50px;
    margin-top:50px;
    background: #8b0b02;
    
    padding: 6px;
    border-radius: 20px;

    color: #fff;
    font-size: 20px;
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
    <div>
        <div>
        <div>
            <label htmlFor="number">학번<br/></label>
            <Input onChange={onChange} id="number" type="text" name="number" value={number} placeholder="학번을 입력하시오." />
        </div>
        <div>
            <label htmlFor="password">비밀번호<br/></label>
            <Input  onChange={onChange} id="password" type="password" name="password" value={password} placeholder="비밀번호를 입력하시오." />
        </div>
        </div>
        <div>
        <Button onClick={onClick} >로그인</Button>
        <Button>비밀번호 찾기</Button>
        </div>
    </div>
    );
}

export default LoginFrom;
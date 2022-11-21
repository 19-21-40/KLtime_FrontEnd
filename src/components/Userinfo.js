import React, { useState, useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useUserInfoState } from "../context/UserInfoContext";
import useInputs from "../hooks/useInputs";


const Info_Box = styled.div`
    background-color:gray;
    display:flex;
`;



function UserInfo() {
  const user = useUserInfoState();
  const [{current_password,new_password,new_password_check},onChange,reset]=useInputs({
    current_password:'',
    new_password:'',
    new_password_check:''
  })

  const [equalPasswd,setEqualPassword]=useState(false);

  useEffect(()=>{
    console.log(new_password,new_password_check)
    if(new_password===new_password_check){
      setEqualPassword(true);
    }
  },[new_password,new_password_check])
  
  

  return (
    <div><h2>내 정보</h2>
      <Info_Box>
        <ul>{user.name}</ul>
        <ul>{user.number}</ul>
        <ul>{user.grade}학년</ul> 
        <ul>{user.email}</ul>
      </Info_Box>

      <div>
        <ul>
          <span>현재 비밀번호</span>
          <input id="current_password" name="current_password" value={current_password} type="password" onChange={onChange} />
        </ul>
        <ul>
          <span>새 비밀번호</span>
          <input id="new_password" name="new_password"value={new_password} type={"password"} onChange={onChange} />
        </ul>
        <ul>
          <span>새 비밀번호 확인</span>
          <input id="new_password_check" name="new_password_check" value={new_password_check} type={"password"}  onChange={onChange}/>
          {equalPasswd?"V":""}
        </ul>
        <hr />
        <ul>
          <span>단과대학</span>
          <select value="." name="collage">
            <option value={"null"}>선택</option>
            <option value={"소프트웨어융합대학"}>소프트웨어융합대학</option>
            <option value={"전자정보공과대학"}>전자정보공과대학</option>
            <option value={"공과대학"}>공과대학</option>
          </select>
          <span>학부</span>
          <select defaultValue={user.department} value={user.department} name="department">
            <option value={"null"}>선택</option>
            <option value={"소프트웨어학부"}>소프트웨어학부</option>
            <option value={"정보융합학부"}>정보융합학부</option>
            <option value={"컴퓨터정보공학부"}>컴퓨터정보공학부</option>
          </select>
        </ul>
      </div>
      <ul>
          <span>단과대학</span>
          <select value="." name="collage">
            <option value={"null"}>선택</option>
            <option value={"소프트웨어융합대학"}>소프트웨어융합대학</option>
            <option value={"전자정보공과대학"}>전자정보공과대학</option>
            <option value={"공과대학"}>공과대학</option>
          </select>
          </ul><hr/>

          <button>저장</button>
          <button>취소</button>
          <button>회원탈퇴</button>
    </div>
  )

}

export default UserInfo;
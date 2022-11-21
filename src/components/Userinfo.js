import React, { useState, useContext } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useUserInfoState } from "../context/UserInfoContext";
import useInputs from "../hooks/useInputs";

const P_Button = styled.button`
  position: absolute;

  top:40px;
  right:40px;

  background-color:transparent;
  border:none;
  font-size:30px;

  cursor: pointer;
  z-index:3;
`;

const TotalContainer = styled.div`

  width: 1150px;
  height: 850px;

  display: flex;
  justify-content: center;
  align-items: center;


  border: 1px solid #D9D9D9;
  border-radius: 10px;

  background-color: white;
  z-index:2;
`;

const Content = styled.div`
  width: 800px;
`

const Head = styled.div`
  height: 80px;
  display: flex;
  justify-content:center;

  font-size: 50px;
  font-weight: 800;

  margin-bottom: 30px;

  
`;

const Info_Box = styled.div`
  display:flex;
  background-color: #F5F5F5;

  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const InfoEditBox = styled.div`
  margin-top: 15px;
`

const SectionAndInput = styled.div`
  display: flex;
  height: 50px;

  align-items:center;
`

const Section = styled.div`
  width: 130px;
  margin-right: 10px;
  margin-left: 20px;

  font-weight: 600;
`

const Input = styled.input`
  height: 30px;
`

const Select = styled.select`
  width: 170px;
  height: 30px;

  margin-right: 15px;
`

const Option = styled.option`

`

const Button = styled.button`
  
  width: 100px;
  height: 45px;
  font-size: 18px;

  background: #B81D24;
  border-radius: 20px;
  border: none;

  color: white;

  margin-left: 10px;
  margin-right: 10px;

  cursor: pointer;
  z-index:3;
`

const ButtonContainer = styled.div`
  position: relative;


  display: flex;
  justify-content: center;
  margin-top: 45px;
`

const Hr = styled.hr`
  border: 1px solid lightgray;
`


function UserInfo({setEdit}) {
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
  <>
    
    <TotalContainer>
      <Content>
        <Head>내 정보 변경</Head>
        <Info_Box>
          <ul>{user.name}</ul>
          <ul>{user.number}</ul>
          <ul>{user.grade}학년</ul> 
          <ul>{user.email}</ul>
        </Info_Box>
        <InfoEditBox>
          <SectionAndInput>
            <Section>현재 비밀번호</Section>
            <Input id="current_password" name="current_password" value={current_password} type="password" onChange={onChange} />
          </SectionAndInput>
          <SectionAndInput>
            <Section>새 비밀번호</Section>
            <Input id="new_password" name="new_password"value={new_password} type={"password"} onChange={onChange} />
          </SectionAndInput>
          <SectionAndInput>
            <Section>새 비밀번호 확인</Section>
            <Input id="new_password_check" name="new_password_check" value={new_password_check} type={"password"}  onChange={onChange}/>
            {equalPasswd?"V":""}
          </SectionAndInput>
          <Hr />
            <SectionAndInput>
              <Section>주전공</Section>
              <Select value="." name="collage">
                <Option value={"null"}>선택</Option>
                <Option value={"소프트웨어융합대학"}>소프트웨어융합대학</Option>
                <Option value={"전자정보공과대학"}>전자정보공과대학</Option>
                <Option value={"공과대학"}>공과대학</Option>
              </Select>
              <Select value="." name="collage">
                <Option value={"null"}>선택</Option>
                <Option value={"소프트웨어학부"}>소프트웨어학부</Option>
                <Option value={"컴퓨터정보공학부"}>컴퓨터정보공학부</Option>
                <Option value={"정보융합학부"}>정보융합학부</Option>
              </Select>
            </SectionAndInput>
            <SectionAndInput>
            <Section>다전공</Section>
              <Select defaultValue={user.department} value={user.department} name="department">
                <Option value={"null"}>선택</Option>
                <Option value={"부전공"}>부전공</Option>
                <Option value={"복수전공"}>복수전공</Option>
                <Option value={"연계전공"}>연계전공</Option>
                <Option value={"심화전공"}>심화전공</Option>
              </Select>
              <Select value="." name="collage">
                <Option value={"null"}>선택</Option>
                <Option value={"소프트웨어융합대학"}>소프트웨어융합대학</Option>
                <Option value={"전자정보공과대학"}>전자정보공과대학</Option>
                <Option value={"공과대학"}>공과대학</Option>
              </Select>
              <Select value="." name="collage">
                <Option value={"null"}>선택</Option>
                <Option value={"소프트웨어학부"}>소프트웨어학부</Option>
                <Option value={"컴퓨터정보공학부"}>컴퓨터정보공학부</Option>
                <Option value={"정보융합학부"}>정보융합학부</Option>
              </Select>
            </SectionAndInput>
        </InfoEditBox>
        <Hr/>
        <ButtonContainer>
            <Button>저장</Button>
            <Button onClick={() => setEdit(false)}>회원탈퇴</Button>
          </ButtonContainer>
      </Content>
      <P_Button onClick={() => setEdit(false)} >X</P_Button>
    </TotalContainer>
  </>
  )

}

export default UserInfo;
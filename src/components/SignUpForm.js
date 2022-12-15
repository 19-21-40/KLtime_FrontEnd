import axios from "axios";
import React, {useState, useContext, useCallback, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../app-config";
import useInputs from "../hooks/useInputs";
import styled from "styled-components";
import KLTimeLogo from "../image/KLTimeLogo.png"

const Head_line = styled.div`
    
    display:flex;
    justify-content:center;

    position: absolute;
    width: 100vw;
    height: 121px;
    left: 0px;
    top: 0px;

    background: #8b0b02;
`;

const Body_line = styled.div`
    display: flex;

    top:162px;
    position: relative;
    width: 100vw;
    height: 100vh;
    
    justify-content:center;

    z-index: 1;
`;

const Component_Box = styled.div`
    display: flex;
    // flex-direction: column;

    position: relative;
    width: 1600px;
    height: 1100px;

    background: #FFFFFF;

    border: 1px solid #D9D9D9;
    border-radius: 10px;

    
`;

const Logo_Image = styled.img`
    box-sizing: border-box;

    position: absolute;
    left: 50px;
    top: 13px;

    /* 학점-숫자 */

    cursor: pointer;
    border: none;
`;

const Privacy_info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    // align-items: flex-start;

    position: absolute;
    width: 600px;
    height: 580px;
    left: 140px;
    top: 269px;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
`;

const Department_info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    position: absolute;
    width: 600px;
    height: 580px;
    left: 870px;
    top: 269px;
    border: 1px solid #D9D9D9;
    border-radius: 10px;
`;

const SectionAndInput = styled.div`
  display: flex;
  flex-direction: column;
  // width:100%;
  // height: 50px;
  // align-items: flex-start;
  // align-items:center;
`

const Section = styled.div`
  width: 130px;
  margin-right: 10px;
  margin-left: 20px;

  font-weight: 600;

  font-size:22px;
`

const Input = styled.input`
  height: 46px;
  width:80%;
  border-radius:6px;
  border:2px solid ${props=>props.borderColor||"lightgray"};

  &:focus {outline: none;} 
`
const Email_Input_Box = styled.div`
  display:flex;
  div{
    font-size: 40px;
  }
`;

const Email_Input = styled.input`
  height: 46px;
  width:50%;
  border-radius:6px;
  border:2px solid ${props=>props.borderColor||"lightgray"};

  &:focus {outline: none;} 
`

const Select = styled.select`
  font-family:"BMJUA";
  width: 500px;
  height: 45px;
  border-radius:6px;
  margin-right: 15px;
  border:2px solid lightgray; 
`

const D_Select = styled.select`
  font-family:"BMJUA";
  width: 230px;
  height: 45px;
  border-radius:6px;
  margin-right: 15px;
  border:2px solid lightgray; 
`

const D_Info_Container = styled.div`
  display:flex;
`;

const Option = styled.option`

`
const Assert=styled.span`
font-size: 13px;
margin-left: 15px;
color: red;
`

const Left_Container = styled.div`

`;

const Right_Container = styled.div`

`;

const Info_1 = styled.div`
  position: absolute;
  left: 145px;
  top: 180px;
  span{
    font-size: 40px;
  }
  strong{
    font-size: 40px;
  }
`;

const Sign_Up_Btn = styled.button`
  position: absolute;
  left: 700px;
  top: 940px;

  width: 218px;
  height: 50px;
  background-color: #B81D24;
  border: none;
  color: white;
  border-radius:20px;

  font-size: 20px;
  cursor: pointer;
`;

function SignupFrom() {
  const navigate=useNavigate();
  const [{ department_num, std_name, password, password_check, std_email, grade, semester}, onChange, reset] = useInputs({
    department_num: '',
    std_name:'',
    password: '',
    password_check: '',
    std_email: '',
    grade: '',
    semester: '',
  });

const [collegeName, SetCollegeName] = useState("선택");
const [departmentList, setDepartmentList] = useState([]);
const [department, setDepartment] = useState("선택");

useEffect(() => {
  if(collegeName === "선택"){
      setDepartmentList([]);
  }else if(collegeName === "소프트웨어융합대학"){
      setDepartmentList(["소프트웨어학부", "컴퓨터정보공학부", "정보융합학부"]);
  }else if(collegeName === "전자정보공과대학"){
      setDepartmentList(["전자공학과", "전자통신공학과", "전기공학과", "전자융합공학과", "전자재료공학과", "로봇학부"]);
  }else if(collegeName === "공과대학"){
      setDepartmentList(["건축공학과", "환경공학과", "화학공학과", "건축학과"]);
  }else if(collegeName === "자연과학대학"){
      setDepartmentList(["수학과", "화학과", "전자바이오물리학과", "스포츠융합과학과", "정보콘텐츠학과"]);
  }else if(collegeName === "인문사회과학대학"){
      setDepartmentList(["국어국문학과","영어산업학과","미디어커뮤니케이션학부", "산업심리학과", "동북아문화산업학부"]);
  }else if(collegeName === "정책법학대학"){
      setDepartmentList(["행정학과", "법학부", "국제학부", "자산관리학과"]);
  }else if(collegeName === "경영대학"){
      setDepartmentList(["경영학부", "국제통상학부"]);
  }
}, [collegeName]);

const [equalPasswd, setEqualPassword] = useState(false);

  useEffect(() => {

    if (password.length>8&&password_check.length>8&&password == password_check) {
        setEqualPassword(true);

    } else {
      setEqualPassword(false);
    }
  }, [password, password_check])

const onClick = () => {
  if(password == password_check){
    axios.post(`${API_BASE_URL}/auth/sign_up`,{
      number: parseInt(department_num),
      name:std_name,
      password: password,
      email: std_email!=''?std_email+"@kw.ac.kr":null,
      departmentName: department,
      grade:parseInt(grade),
    }).then(res=>{
      if(res.status==200){
        navigate("/Login")
      }else{
        //error
      } 
    })

  }
  reset();
};

return (
  <>
  <Head_line>
  <Logo_Image src={KLTimeLogo} onClick={() => window.location.href = "/"} />
  </Head_line>
  <Body_line>
    <Component_Box>
      <Left_Container>
        <Info_1><span>회원가입 </span><span> {'>'} </span><strong> 개인 정보 입력</strong></Info_1>
      <Privacy_info>
          <h1>개인 정보</h1>
      <SectionAndInput>
          <Section>학번</Section>
          <Input id="department_num" name="department_num" value={department_num} type="text" onChange={onChange}/>
          {department_num.length>10&&department_num!=''&&<Assert>학번은 10글자 입니다.</Assert>}
      </SectionAndInput>
      <SectionAndInput>
          <Section>비밀번호</Section>
          <Input id="password" name="password" value={password} type={"password"} onChange={onChange} borderColor={equalPasswd?"green":password==''?null:"red"} />
          {password.length<8&&password!=''&&<Assert>비밀번호는 최소 8글자 입니다.</Assert>}
      </SectionAndInput>
      <SectionAndInput>
          <Section>비밀번호 확인</Section>
          <Input id="password_check" name="password_check" value={password_check} type={"password"} onChange={onChange} borderColor={equalPasswd?"green":password_check==''?null:"red"}/>
          {password_check.length<8&&password_check!=''&&<Assert>비밀번호는 최소 8글자 입니다.</Assert>}
      </SectionAndInput>
      <SectionAndInput>
          <Section>이름</Section>
          <Input id="std_name" name="std_name" value={std_name} type="text" onChange={onChange}/>
      </SectionAndInput>
      <SectionAndInput>
          <Section>이메일</Section>
          <Email_Input_Box><Email_Input id="std_email" name="std_email" value={std_email} type="text" onChange={onChange}/><div>@kw.ac.kr</div></Email_Input_Box>
      </SectionAndInput>
      </Privacy_info>
      </Left_Container>
      <Right_Container>
      <Department_info>
        <h1>학과 정보</h1>
      <SectionAndInput>
      <Section>단과 대학</Section>
          <Select value={collegeName} name="college" onChange={e => SetCollegeName(e.target.value)}>
              <Option value={"선택"}>선택</Option>
              <Option value={"소프트웨어융합대학"}>소프트웨어융합대학</Option>
              <Option value={"전자정보공과대학"}>전자정보공과대학</Option>
              <Option value={"공과대학"}>공과대학</Option>
              <Option value={"자연과학대학"}>자연과학대학</Option>
              <Option value={"인문사회과학대학"}>인문사회과학대학</Option>
              <Option value={"정책법학대학"}>정책법학대학</Option>
              <Option value={"경영대학"}>경영대학</Option>
            </Select>
          </SectionAndInput>
          <SectionAndInput>
          <Section>학부</Section>
          <Select value={department} name="department" onChange={e => setDepartment(e.target.value)}>
            <Option value={"선택"}>선택</Option>
            {
              departmentList.map(__department => <option value={__department}>{__department}</option> )
            }      
          </Select>
          
          </SectionAndInput>
          <D_Info_Container>
          <SectionAndInput>
          <Section>학년</Section>
          <D_Select id="grade" name="grade" value={grade} onChange={onChange} >
            <Option value={"null"}>선택</Option>
            <Option value={1}>1학년</Option>
            <Option value={2}>2학년</Option>
            <Option value={3}>3학년</Option>
            <Option value={4}>4학년</Option>
          </D_Select>
          </SectionAndInput>
          <SectionAndInput>
          <Section>학기</Section>
          <D_Select id="semester" name="semester" value={semester} onChange={onChange}>
            <Option value={"null"}>선택</Option>
            <Option value={"1학기"}>1학기</Option>
            <Option value={"여름학기"}>여름학기</Option>
            <Option value={"2학기"}>2학기</Option>
            <Option value={"겨울학기"}>겨울학기</Option>
          </D_Select>
          </SectionAndInput>
          </D_Info_Container>
          <SectionAndInput>
          <Section>다전공</Section>
          <D_Select value="." name="department">
          <Option value={"null"}>선택</Option>
          <Option value={"부전공"}>부전공</Option>
          <Option value={"복수전공"}>복수전공</Option>
          <Option value={"연계전공"}>연계전공</Option>
          <Option value={"심화전공"}>심화전공</Option>
          </D_Select>
          </SectionAndInput>
          <SectionAndInput>
          <Section>세부 다전공 학부</Section>
          <Select value="." name="department">
          <Option value={"null"}>선택</Option>
          </Select>
      </SectionAndInput>
      </Department_info>
    </Right_Container>
      <Sign_Up_Btn onClick={onClick}>가입하기</Sign_Up_Btn>
    </Component_Box>
    </Body_line>
    </>
);
}
//비어있을떄 가입 안되게
export default React.memo(SignupFrom);

import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";


const Total_Container = styled.div`

`;

const Info_line = styled.div`

`;

const Pw_line = styled.div`

`;

const Department_line = styled.div`

`;

const Button_line = styled.div`

`;

const Text_box = styled.div`

`;

const Edit_Btn = styled.button`

`;

const Confirm_Btn = styled.button`

`;

const Close_Btn = styled.button`

`;

const Input = styled.input`

`;

const Label = styled.label`

`;

function Edit_info({}){

    return(
        <Total_Container>
            <Close_Btn>X</Close_Btn>
            <Info_line>
                <Text_box><h1>학번</h1> <h2>2021203022</h2></Text_box>
                <Text_box><h1>이메일</h1> <h2>sour_jam0220@naver.com</h2></Text_box>
            </Info_line>
            <Pw_line>
                <Label htmlFor="curPw">현재 비밀번호<br /></Label>
                <Input onChange={onChange} id="curPw" type="text" name="curPw" value={curPw} placeholder="현재 비밀번호" />
                <Label htmlFor="newPw">새 비밀번호<br /></Label>
                <Input onChange={onChange} id="newPw" type="text" name="newPw" value={newPw} placeholder="새 비밀번호" />
                <Label htmlFor="checkPw">비밀번호 확인<br /></Label>
                <Input onChange={onChange} id="checkPw" type="text" name="newPw" value={checkPw} placeholder="새 비밀번호 확인" />
            </Pw_line>
            <Department_line>

            </Department_line>
            <Button_line>
                <Edit_Btn>수정하기</Edit_Btn>
                <Confirm_Btn>확인</Confirm_Btn>
            </Button_line>
        </Total_Container>
    );
}

export default Edit_info;
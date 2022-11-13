import { useEffect, useState } from "react";
import styled from "styled-components";
import Klas from "./Klas";

const Small_info_Container = styled.div`
    display: flex;
    flex-direction: column;
    weight: 100px;
    height: 100px;
`;

const ModifyButton = styled.div`
position: absolute;
right: 5%;
top: 25%;
width : 145px;
height: 45px;
line-height : 45px; // 텍스트 수직가운데 정렬
text-align:center;

/* 이미지,버튼박스 색상 */

background: #D9D9D9;
border-radius: 20px;
`;

const KlasButton = styled.div`
position: absolute;
right: 15%;
top: 25%;
width : 145px;
height: 45px;
line-height : 45px; // 텍스트 수직가운데 정렬
text-align:center;



/* 이미지,버튼박스 색상 */

background: #D9D9D9;
border-radius: 20px;
`

const Student_info = styled.ul`
    display: flex;
    list-style: none;
    position: absolute;
    right: 25%;
    top: 15%;
    font-weight: 900;
    font-size: 23px;
`;



const Info_list = styled.span`
    margin: 30px;
`;




function Small_info( {name, std_num} ){

    const [Edit, setEdit] = useState(false);//계정정보 수정
    const [klas, setKlas] = useState(false);//Klas 연동하기



    const showEdit = () => {
        setEdit(true);    
    };

    const showKlas = () => {
        setKlas(true);    
    };


    return(
        <Small_info_Container>
            <Student_info>
                <li><Info_list>학번: {std_num}</Info_list></li>
                <li><Info_list>이름: {name}</Info_list></li>
            </Student_info>
            <KlasButton onClick={ () =>  {
                showKlas()
            }} >KLAS 연동하기</KlasButton>
            <ModifyButton onClick={ () =>  {
                showEdit()
            }} >계정정보 수정하기</ModifyButton>
            <div>{klas ? <Klas/> : <></>}</div>
        </Small_info_Container>
    );
}

export default Small_info;
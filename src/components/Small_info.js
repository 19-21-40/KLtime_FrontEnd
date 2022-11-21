import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Klas from "./Klas";
import EditButton from "../image/Edit.png"

const Small_info_Container = styled.div`
    display: flex;
    justify-content: center;

    background-color: transparent;
    align-items: center;
    weight: 100px;
    height: 100px;
`;
const LogoutButton = styled.button`
    position: absolute;
    right: 5%;
    top: 30%;
    width : 100px;
    height: 45px;
    
    text-align:center;
    font-size: 20px;
    font-weight: 600;
    /* 이미지,버튼박스 색상 */

    color: white;
    border: none;
    background-color: transparent;
    border-radius: 20px;

    cursor: pointer;
`;

const ModifyButton = styled.img`
    position: relative;
    top: 45%;
    right: 10px;
    line-height : 45px; // 텍스트 수직가운데 정렬
    text-align:center;

    height: 25px;
    width: 25px;

    /* 이미지,버튼박스 색상 */

    border-radius: 20px;

    cursor: pointer;
`;

const KlasButton = styled.div`
    position: absolute;
    right: 13%;
    top: 30%;
    width : 145px;
    height: 45px;
    line-height : 45px; // 텍스트 수직가운데 정렬
    text-align:center;

    font-size: 20px;
    font-weight: 600;
    color: white;

    /* 이미지,버튼박스 색상 */
    background-color: transparent;

    border-radius: 20px;

    cursor: pointer;
    `

const Student_info = styled.ul`
    display: flex;
    height: 100%;
    list-style: none;
    position: absolute;
    right: 25%;


    line-height: 133px;
    font-weight: 900;
    font-size: 23px;
    color:white;
`;

const Info_list = styled.span`
    margin-right: 10px;
`;



function Small_info( {name, number, klas, setKlas} ){
    const navigate=useNavigate()

    const [Edit, setEdit] = useState(false);//계정정보 수정

    const showEdit = () => {
        setEdit(true);    
    };

    const showKlas = () => {
        setKlas(true);    
    };

    const onClick=()=>{
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/Login")
    }

    return(
        <Small_info_Container>
            <Student_info>
                <ModifyButton src={EditButton} onClick={ () =>  {
                    showEdit()
                }} />
                <li><Info_list>{name} </Info_list></li>  
                <li><Info_list>({number})</Info_list></li>
            </Student_info>
            <LogoutButton onClick={onClick}>로그아웃</LogoutButton>
            
            <KlasButton onClick={ () =>  {
                showKlas()
            }} >KLAS 연동하기</KlasButton>      
        </Small_info_Container>
    );
}

export default Small_info;
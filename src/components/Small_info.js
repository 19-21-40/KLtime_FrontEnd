import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Klas from "./Klas";
import EditButton from "../image/Edit.png"

const Small_info_Container = styled.div`

    position: relative;
    top: 10%;
    left: 65%;

    display: flex;
    justify-content: center;

    background-color: transparent;
    align-items: center;
    weight: 100px;
    height: 100px;
`;
const LogoutButton = styled.div`
    position: relative;
    right: 13%;
    width : 100px;
    height: 45px;
    line-height : 45px;
    
    text-align:center;
    font-size: 20px;
    // font-weight: 600;
    /* 이미지,버튼박스 색상 */

    color: white;
    border: none;
    background-color: transparent;
    border-radius: 20px;

    cursor: pointer;
`;

const ModifyButton = styled.img`
    position: relative;
    top: 8px;

    right: 10px;
    line-height : 45px; // 텍스트 수직가운데 정렬
    text-align:center;

    height: 25px;
    width: 25px;

    /* 이미지,버튼박스 색상 */

    border-radius: 20px;

    
`;

const KlasButton = styled.div`
    position: relative;
    right: 13%;
    width : 145px;
    height: 45px;
    line-height : 45px; // 텍스트 수직가운데 정렬
    text-align:center;

    font-size: 20px;
    // font-weight: 600;
    color: white;

    /* 이미지,버튼박스 색상 */
    background-color: transparent;

    border-radius: 20px;

    cursor: pointer;
    `

const Student_info = styled.div`
    display: flex;
    
    height: 45px;
    list-style: none;
    position: relative;
    
    right: 25%;

    line-height: 45px;
    font-size: 20px;
    color:white;

    cursor: pointer;
`;

const Info_list = styled.span`
    margin-right: 10px;
`;



function Small_info( {name, number, setEdit, setKlas} ){
    const navigate=useNavigate()

    

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
            <Student_info  onClick={ () =>  {
                    showEdit()
                }}>
                <ModifyButton src={EditButton} />
                <div><Info_list>{name} </Info_list></div>  
                <div><Info_list>({number})</Info_list></div>
            </Student_info>
            <LogoutButton onClick={onClick}>로그아웃</LogoutButton>
            
            <KlasButton onClick={ () =>  {
                showKlas()
            }} >KLAS 연동하기</KlasButton>      
        </Small_info_Container>
    );
}

export default Small_info;
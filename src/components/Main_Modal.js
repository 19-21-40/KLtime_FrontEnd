import { useState } from 'react';
import { useEffect, useRef } from 'react';
import styled from "styled-components";
import axios from "axios";

import MyPage from '../routes/MyPage';
import Klas_Peristalsis from './Klas_Peristalsis';
import { API_BASE_URL } from '../app-config';

/* 모달창을 화면 중앙. 최상단에 노출 */
const Background = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;

    position:fixed;
    top:0;
    left:0;
    z-index:1;

    width: 100vw;
    height: 100vh;

    background-color: lightgray;
    opacity: 0.7;
    
`;  

const Container = styled.div`
    display: flex;
    position: fixed;

    top:50%;
    left:50%;

    justify-content:center;
    align-items:center;
    z-index:2;

`;
const Big_box = styled.div`

    position : absolute;
    
    width: 1500px;
    height: 800px;
    background-color: rgb(255, 255, 255);

    border: 1px solid lightgray;
    
    z-index: 2;
    opacity: 1;

    overflow: auto;
`;

const Table_Container = styled.div`
    display: flex;
    flex-direction: column;

    margin-top:80px;

    justify-content:center;
    align-items:center;
`;


const Table = styled.table`

   width: 80%;
   height: 70%;
   border-collapse: collapse;
   
    margin-bottom : 100px;

    z-index:5;
`;

const Caption = styled.caption`
    padding: 40px;
    font-size: 40px;
`;

const Title = styled.thead`
`;

const TitleName = styled.th`
    border-bottom: 1px solid lightgray;
    text-aligh:center;
    padding:5px;
    background-color : gray;
    color: #fff;
    font-size: 20px;
`;

const Body = styled.tbody`
    text-align: center;
`;

const BodyName = styled.td`
    border-bottom: 1px solid lightgray;
    text-aligh:center;
    padding:15px;

    font-size: 20px;
`;

  /* 모달창 내부 X버튼 */
const Close = styled.button`
    
    position: absolute;
    bottom :350px;
    left: 700px;

    border: none;
    color : gray;
    background-color : transparent;
    font-size: 45px;
    
    cursor : pointer;

    z-index : 3;
    
`;

const Main_Modal = ( { closeModal, section } ) => {
//['사회와경제', Array(28)]
    const [lectureList, setLectureList] = useState(
        [[
            "전공", 
            [
                {

                    id: 1,
                    name: "디지털논리",
                    sectionDetail:"",
                    level: 2,
                    section: "전선",
                    credit: 3,
                    notes: ""
                },
                {
                    id: 2,
                    name: "법과생활",
                    sectionDetail:"",
                    level: 1,
                    section: "교선",
                    credit: 3,
                    notes: ""
                },
                {
                    id: 3,
                    name: "이산구조",
                    sectionDetail:"",
                    level: 2,
                    section: "전선",
                    credit: 3,
                    notes: ""
                },
                {
                    id: 4,
                    name: "고급프로그래밍",
                    sectionDetail:"",
                    level: 2,
                    section: "전선",
                    credit: 3,
                    notes: ""
                },
                {
                    id: 5,
                    name: "데이터베이스",
                    sectionDetail:"",
                    level: 3,
                    section: "전선",
                    credit: 3,
                    notes: ""
                },
                {
                    id: 6,
                    name: "리눅스활용실습",
                    sectionDetail:"",
                    level: 2,
                    section: "전필",
                    credit: 2,
                    notes: ""
                },
                {
                    id: 7,
                    name: "빅데이터언어",
                    sectionDetail:"",
                    level: 2,
                    section: "일선",
                    credit: 3,
                    notes: ""
                },
                {
                    id: 8,
                    name: "대학화학및실험1",
                    sectionDetail:"",
                    level: 1,
                    section: "기필",
                    credit: 3,
                    notes: ""
                },
            ]
        ]]
    );

    useEffect(()=> {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if(accessToken && accessToken !== null) {
        if(section=="total"){
            
        }else if(section == "main"){

        axios.get(`${API_BASE_URL}/api/mainLectureList`,  {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res=>{
                console.log(Object.entries(res.data.data));
                setLectureList(Object.entries(res.data.data));
            }
            
            );
            
        }else if(section == "sub"){




        }else if(section == "basic"){
            axios.get(`${API_BASE_URL}/api/basicLectureList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res=>{
                setLectureList(Object.entries(res.data.data));
            }
                
            );
        }else if(section == "math"){
            axios.get(`${API_BASE_URL}/api/mathLectureList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res=>{
                setLectureList(Object.entries(res.data.data));
            }
                
            );
        }else if(section == "basicScience"){
            axios.get(`${API_BASE_URL}/api/basicScienceLectureList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res=>{
                setLectureList(Object.entries(res.data.data));
            }
                
            );
        }else if(section == "essBal"){
            axios.get(`${API_BASE_URL}/api/essBalLectureList`, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res=>{
                setLectureList(Object.entries(res.data.data));
            }
                
            );
        }else if(section == "ess"){
            axios.get(`${API_BASE_URL}/api/essLectureList`,  {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken
                }, withCredentials: true,
            }).then(res=>{
                setLectureList(Object.entries(res.data.data));
            }
                
            );



        }else if(section == "bal"){
            axios.get(`${API_BASE_URL}/api/balLectureList`,  {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                }, withCredentials: true,
            }).then(res=>{
                setLectureList(Object.entries(res.data.data));
            }
                
            );



        }else{
            console.log("아무것도 안함");
        }
    }else{
        window.location.href="/Login"
    }
        
    }, [])

    

    const ref = useRef(null);


    return (
        <>
        <Background ref={ref}>
        </Background>
        <Container>
            <Close onClick={ e=> closeModal()}>
                x
            </Close>
            <Big_box>
                <Table_Container>
                {lectureList.map(([key,table]) => ( 
                <Table key={key}>
                    <Caption>{key}</Caption>
                    <Title>
                        <tr>
                            <TitleName>교과목명</TitleName>
                            <TitleName>구분</TitleName>
                            <TitleName>세부구분</TitleName>
                            <TitleName>난이도</TitleName>
                            <TitleName>학점</TitleName>
                        </tr>
                    </Title>
                    <Body>
                    {table.map((lecture) => (
                        <tr key={lecture.name}>
                            <BodyName>{lecture.name}</BodyName>
                            <BodyName>{lecture.section}</BodyName>
                            <BodyName>{lecture.sectionDetail}</BodyName>
                            <BodyName>{lecture.level}</BodyName>
                            <BodyName>{lecture.credit}</BodyName>
                        </tr>
                    ))}
                    </Body>
                </Table>))}
                </Table_Container>
            </Big_box>
            </Container>
        </>
    );

}

export default Main_Modal;
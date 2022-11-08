import { useEffect, useRef } from 'react';
import styled from "styled-components";
import MyPage from '../routes/MyPage';
import Klas_Peristalsis from './Klas_Peristalsis';

/* 모달창을 화면 중앙. 최상단에 노출 */
const Container = styled.div`
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
    
`;  

const Big_box = styled.div`

    position : relative;
    display: flex;
    width: 1500px;
    height: 800px;
    background-color: rgb(255, 255, 255);

    border: 1px solid lightgray;

    justify-content:center;
`;


const Table = styled.table`

   width: 80%;
   height: 70%;
   border-collapse: collapse;

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
`;

const BodyName = styled.td`
    border-bottom: 1px solid lightgray;
    text-aligh:center;
    padding:5px;

    font-size: 20px;
`;

  /* 모달창 내부 X버튼 */
const Close = styled.button`
    
    position: absolute;
    top : 3%;
    right : 5%;

    border: none;
    color : gray;
    background-color : white;
    font-size: 45px;
    
    cursor : pointer;
    
`;

const Main_Modal = ( { closeModal } ) => {

    const lecture_list = [
        {

            id: 1,
            lectureName: "디지털논리",
            professor: "김진우",
            level: 2,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: 2,
            lectureName: "법과생활",
            professor: "손명지",
            level: 1,
            section: "교선",
            credit: 3,
            notes: ""
        },
        {
            id: 3,
            lectureName: "이산구조",
            professor: "최민규",
            level: 2,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: 4,
            lectureName: "고급프로그래밍",
            professor: "이강훈",
            level: 2,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: 5,
            lectureName: "데이터베이스",
            professor: "문승현",
            level: 3,
            section: "전선",
            credit: 3,
            notes: ""
        },
        {
            id: 6,
            lectureName: "리눅스활용실습",
            professor: "박병준",
            level: 2,
            section: "전필",
            credit: 2,
            notes: ""
        },
        {
            id: 7,
            lectureName: "빅데이터언어",
            professor: "임동혁",
            level: 2,
            section: "일선",
            credit: 3,
            notes: ""
        },
        {
            id: 8,
            lectureName: "대학화학및실험1",
            professor: "양재규",
            level: 1,
            section: "기필",
            credit: 3,
            notes: ""
        },
    ]

    

    const ref = useRef(null);


    return (
        <Container ref={ref}>
            <Big_box>
                <Table>
                    <Caption>어떤 SECTION?</Caption>
                    <Title>
                        <tr>
                            <TitleName>교과목명</TitleName>
                            <TitleName>교수명</TitleName>
                            <TitleName>구분</TitleName>
                            <TitleName>난이도</TitleName>
                            <TitleName>학점</TitleName>
                        </tr>
                    </Title>
                    <Body>
                    {lecture_list.map((lecture) => (
                        <tr key={lecture.lectureName}>
                            <BodyName >{lecture.lectureName}</BodyName>
                            <BodyName>{lecture.professor}</BodyName>
                            <BodyName>{lecture.section}</BodyName>
                            <BodyName>{lecture.level}</BodyName>
                            <BodyName>{lecture.credit}</BodyName>
                        </tr>
                    ))}
                    </Body>
                </Table>
                <Close onClick={ e=> closeModal()}>
                x
                </Close>
            </Big_box>
        </Container>
    );

}

export default Main_Modal;
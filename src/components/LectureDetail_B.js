import { style } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Xbutton from "../image/XButton.png"
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import { useUserTableState, useUserTableDispatch} from '../context/UserTableContext';

const Total_Container = styled.div`
    width: 750px;
    height: 950px;

    display: flex;
    flex-direction: column;
    
    position: relative;
    background: #FFFFFF;
    /* 학점그래프카드 그림자효과 */

    box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
`;

const Header_Container = styled.div`
    display: flex;

    height: 100px;
    
    position: relative;
    top: 5px;
    left: 50px;
`;

const XButton = styled.div`

    height: 20px;

    position: absolute;
    
    top: 60px;
    right: 90px;
    
    background-color: transparent;
    border: none;

    cursor: pointer;
    z-index:1;
`;

const Body_Container = styled.div`
    position: relative;
`;

const Lecture_Zone = styled.div`
    display: flex;
    flex-direction: column;

    width: 90%;
    height: 350px;
    
    position: relative;
    top: 50px;
    left: 40px;

    border: 0.3px solid #D9D9D9;
    
    /* 시간표박스 그림자 */
    box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.07);
    border-radius: 15px;
`

const Lecture_Info = styled.div`
    display: flex;
    flex-direction: column;    
    
    position: relative;
    top: 25px;
    left: 30px;

    height: 350px;
`;

const Detail_Text = styled.div`
    position: relative;
    display: flex;
    height: 40px;

    > h1 {
        padding: 0px;

        line-height: 100px;
        height: 100px;
        font-size: 50px;
        
    }

    > h2 {
        position: relative;
        top: 27px;

        margin-left: 10px;
        padding: 0px;

        line-height: 100px;
        height: 100px;
        color: gray;


    }

    > div {
        height: 40px;
        line-height: 40px;
    }

    #section {
        font-weight: 800;
        font-size: 20px;
        color: gray;

        margin-right: 10px;
    }

    #detail {
        font-weight: 800;
        font-size: 20px;

        margin-right: 10px;
    }
    
`;

const Recomend_Zone = styled.div`
    display: flex;

    width: 90%;
    height: 350px;

    position: relative;
    top: 100px;
    left: 50px;

`;

const Title = styled.div`
    width: 100%;
    font-size: 25px;

`;

const Body = styled.div`

    width: 100%;
    font-size: 20px;
    color: gray;

    margin-top: 15px;
    margin-bottom: 50px;
`;

const Lecture = styled.div`
    
    display: flex;
    width: 660px;

    margin-bottom: 7px;

    > div {
        width: 200px;
    }

    #section { 
        width: 38px;
        margin-right: 10px;
    }

    #credit { 
        width: 60px;
    }

    #level {
        width: 70px;
    }
`;


const Reco_Info = styled.div`

`;

function LectureDetail_B({
    top,
    left,
    backgroundColor,
    lecture,
    setOpenLectureDetail,
    setOpenDetail,
}) {
    const userTableDispatch = useUserTableDispatch(); //
    const userTableState = useUserTableState();

    const [recList1, setRecList1] = useState([]);
    const [recList2, setRecList2] = useState([]);

    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const Close = () => {
        setOpenLectureDetail(false);
        setOpenDetail(true);
    }

    useEffect( () => {
        if (accessToken && accessToken !== null) {
            axios.post(`${API_BASE_URL}/api/recommend/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/lectureList1/${lecture.id}`,null,{
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken,
                }, withCredentials: true,
            }).then(res=> {
                console.log(res.data);
                setRecList1(res.data.lectureList);
            }
            );

            axios.post(`${API_BASE_URL}/api/recommend/${userTableState.currentSet.year}/${userTableState.currentSet.semester}/lectureList2/${lecture.id}`,null,{
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Accept': '*/*',
                    'Authorization': "Bearer " + accessToken,
                }, withCredentials: true,
            }).then(res=> {
                console.log(res.data);
                setRecList2(res.data.lectureList);
            }
            );
        }
    }, [lecture])

    return (
        <Total_Container>
            <Header_Container>
                    <Detail_Text>
                        <h1>{lecture.lectureName}</h1> <h2>{lecture.id}</h2>
                    </Detail_Text>
                    <XButton onClick={Close}><img src={Xbutton} width={20}/></XButton>
            </Header_Container>
            <Body_Container>
                <Lecture_Zone>
                    <Lecture_Info>
                        <Detail_Text>
                            <div id="section">교수명</div> <div id="detail">{lecture.professor}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">전공/영역</div> <div id="detail">{lecture.department}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">강의시간</div>
                            {lecture.lectureTimes?.map((lectureTime, index) => <div id="detail" key={index}> {`${lectureTime.day}:${lectureTime.startTime}~${lectureTime.endTime}`}</div>)}
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">구분</div> <div id="detail">{lecture.section}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">난이도</div> <div id="detail">{lecture.level}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">학점</div> <div id="detail">{lecture.credit}</div>
                        </Detail_Text>
                        <Detail_Text>
                            <div id="section">세부사항 : </div> <div id="detail">{lecture.notes}</div>
                        </Detail_Text>
                    </Lecture_Info>
                </Lecture_Zone>
                <Recomend_Zone>
                    <Reco_Info>
                        <Title>이 과목을 들은 학생들이 가장 많이 담은 과목</Title>
                        <Body>
                            {recList1?.map( (lecture) => 
                            <Lecture key={lecture.id + lecture.lectureName}>
                                <div id="number">{lecture.id}</div>
                                <div id="lectureName">{lecture.lectureName}</div>
                                <div id="section">{lecture.section}</div>
                                <div id="credit">{lecture.credit}학점</div>
                                <div id="level">난이도 {lecture.level}</div>
                            </Lecture>)
                            }
                        </Body>
                        <Title>이 과목을 들은 소프트웨어학부 2학년이 가장 많이 담은 과목</Title>
                        <Body>
                        {recList2?.map( (lecture) => 
                            <Lecture key={lecture.id + lecture.lectureName}>
                                <div id="number">{lecture.id}</div>
                                <div id="lectureName">{lecture.lectureName}</div>
                                <div id="section">{lecture.section}</div>
                                <div id="credit">{lecture.credit}학점</div>
                                <div id="level">난이도 {lecture.level}</div>
                            </Lecture>)
                            }
                        </Body>
                    </Reco_Info>
                </Recomend_Zone>
            </Body_Container>
        </Total_Container>
    )
}

export default LectureDetail_B